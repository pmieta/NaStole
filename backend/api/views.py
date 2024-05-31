from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, PublisherSerializer, ProductSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Publisher, Product
# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreatePublisherView(generics.CreateAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class CreateProductView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)



