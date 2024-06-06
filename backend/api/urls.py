from django.urls import path
from .views import CategoryViewSet, PublisherViewSet, ProductViewSet, CustomerViewSet, OrderViewSet, OrderItemViewSet, ReviewViewSet
from .views import ContactFormViewSet
category_list = CategoryViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
category_detail = CategoryViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

publisher_list = PublisherViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
publisher_detail = PublisherViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

product_list = ProductViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
product_detail = ProductViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

customer_list = CustomerViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
customer_detail = CustomerViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

order_list = OrderViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
order_detail = OrderViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

order_item_list = OrderItemViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
order_item_detail = OrderItemViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

review_list = ReviewViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
review_detail = ReviewViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

contact_form_list = ContactFormViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
contact_form_detail = ContactFormViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('categories/', category_list, name='category-list'),
    path('categories/<int:pk>/', category_detail, name='category-detail'),
    path('publishers/', publisher_list, name='publisher-list'),
    path('publishers/<int:pk>/', publisher_detail, name='publisher-detail'),
    path('products/', product_list, name='product-list'),
    path('products/<int:pk>/', product_detail, name='product-detail'),
    path('customers/', customer_list, name='customer-list'),
    path('customers/<int:pk>/', customer_detail, name='customer-detail'),
    path('orders/', order_list, name='order-list'),
    path('orders/<int:pk>/', order_detail, name='order-detail'),
    path('order-items/', order_item_list, name='orderitem-list'),
    path('order-items/<int:pk>/', order_item_detail, name='orderitem-detail'),
    path('reviews/', review_list, name='review-list'),
    path('reviews/<int:pk>/', review_detail, name='review-detail'),
    path('contact_forms/', contact_form_list, name='contact-form-list'),
    path('contact_forms/<int:pk>/', contact_form_detail, name='contact-form-detail'),
]
