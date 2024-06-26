from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Category, Publisher, Product, Order, OrderItem, Review, ContactForm


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "first_name", "last_name"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True)
    publisher = serializers.CharField(source='publisher.name')
    publisher_id = serializers.PrimaryKeyRelatedField(queryset=Publisher.objects.all(), source='publisher', write_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'stock_quantity', 'category_id', 'category', 'publisher_id', 'publisher', 'release_date', 'min_players', 'max_players', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'order_date', 'total_amount', 'address', 'postal_code', 'city', 'items']
        read_only_fields = ['order_date', 'total_amount', 'customer']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        request = self.context.get('request')
        if not request or not hasattr(request, 'user'):
            raise serializers.ValidationError('User must be authenticated to create an order.')

        customer = request.user
        order = Order.objects.create(customer=customer, **validated_data)
        total_amount = 0

        # List to hold order items for bulk create
        order_items = []

        # Check product availability and prepare order items
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']

            # Check stock quantity
            if product.stock_quantity < quantity:
                raise serializers.ValidationError(f"Niewystarczająca ilość produktu w magazynie {product.title}")

            # Update product stock
            product.stock_quantity -= quantity
            product.save()

            order_items.append(OrderItem(
                order=order,
                product=product,
                quantity=quantity,
                price=product.price
            ))

            total_amount += quantity * product.price

        # Bulk create order items
        OrderItem.objects.bulk_create(order_items)

        order.total_amount = total_amount
        order.save()

        return order
    
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'product', 'user', 'rating', 'comment', 'review_date']
        read_only_fields = ['user', 'review_date']

    def create(self, validated_data):
        review = Review.objects.create(**validated_data)
        return review

class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactForm
        fields = '__all__'

