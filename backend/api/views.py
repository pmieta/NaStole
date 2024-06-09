from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer, CategorySerializer, PublisherSerializer, ProductSerializer, OrderSerializer, OrderItemSerializer, ReviewSerializer
from .serializers import ContactFormSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Category, Publisher, Product, Order, OrderItem, Review, ContactForm
from rest_framework import viewsets, permissions
from rest_framework.decorators import action

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserViewSet(viewsets.ModelViewSet):   
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(id=user.id)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class PublisherViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer
    permission_classes = [AllowAny]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def newest(self, request):
        amount = int(request.query_params.get('amount', 4))
        if amount <= 0:
            return Response({"error": "Amount must be greater than zero"}, status=400)
        
        products = Product.objects.all().order_by('-release_date')[:amount]
        serializer = self.get_serializer(products, many=True, context={'request': request})
        return Response(serializer.data)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_orders(self, request):
        # Filter orders by the logged-in user
        orders = Order.objects.filter(customer=request.user)
        serializer = self.get_serializer(orders, many=True)
        return Response(serializer.data)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes=[IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ContactFormViewSet(viewsets.ModelViewSet):
    queryset = ContactForm.objects.all()
    serializer_class = ContactFormSerializer
    permission_classes = [AllowAny]
