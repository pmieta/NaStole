from django.contrib import admin
from .models import Category, Publisher, Product, Order, OrderItem, Review, ContactForm

admin.site.register(Category)
admin.site.register(Publisher)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Review)
admin.site.register(ContactForm)