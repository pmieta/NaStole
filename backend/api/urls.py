from django.urls import path
from . import views

urlpatterns = [
    path("publishers/", views.CreatePublisherView.as_view(), name="publisher-list"),
    path("products", views.CreateProductView.as_view(), name="product-list"),
]