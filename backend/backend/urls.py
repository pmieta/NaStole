from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from api.views import CreateUserView, UserViewSet, ProductViewSet, CategoryViewSet, PublisherViewSet, OrderViewSet, ReviewViewSet, ContactFormViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Initialize the router and register viewsets
router = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'publishers', PublisherViewSet, basename='publisher')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'contact_forms', ContactFormViewSet, basename='contact_form')

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls)),  # Include router URLs under the 'api/' path
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)