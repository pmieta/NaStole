from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Publisher, Product


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    
class PublisherSerializer(serializers.ModelSerializer):
    products = serializers.StringRelatedField(many=True)

    class Meta:
        model = Publisher
        fields = ["id", "name", "products"]

class ProductSerializer(serializers.ModelSerializer):
    publisher = serializers.StringRelatedField(many=False)

    class Meta:
        model = Product
        fields = ["title", "description", "price", "stock_quantity", "release_date", "min_players", "max_players", "publisher"]