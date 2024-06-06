from django.contrib import admin
from .models import Category, Publisher, Product, Customer, Order, OrderItem, Review

admin.site.register(Category)
admin.site.register(Publisher)
admin.site.register(Product)
admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Review)