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

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'stock_quantity', 'category_id', 'category', 'publisher_id', 'publisher', 'release_date', 'min_players', 'max_players', 'image']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'order_date', 'total_amount', 'address', 'postal_code', 'city',  'items']
        read_only_fields = ['order_date', 'total_amount', 'customer']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        request = self.context.get('request')
        if not request or not hasattr(request, 'user'):
            raise serializers.ValidationError('User must be authenticated to create an order.')

        customer = request.user
        order = Order.objects.create(customer=customer, **validated_data)
        total_amount = 0

        for item_data in items_data:
            item_data['order'] = order
            product = item_data['product']
            item_data['price'] = product.price
            total_amount += item_data['quantity'] * product.price
            OrderItem.objects.create(**item_data)

        order.total_amount = total_amount
        order.save()

        return order
    
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactForm
        fields = '__all__'
