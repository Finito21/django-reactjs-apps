from django.urls import path
from . import views
from rest_framework import routers

router=routers.DefaultRouter()
router.register('address',views.CustomerAddressViewSet)
router.register('productrating',views.ProductRatingViewSet)

urlpatterns= [

    # Verdor URLS
    path('vendors/', views.VendorList.as_view()),
    path('vendor/<int:pk>/', views.VendorDetail.as_view()),
    path('vendor/login/', views.vendor_login,name='vendor_login'),
    path('vendor/register/', views.vendor_register,name='vendor_register'),
    path('vendor/<int:pk>/orderitems/', views.VendorOrderItemList.as_view()),
    path('vendor/<int:pk>/customers/', views.VendorCustomerList.as_view()),


    # Product URLS
    path('products/', views.ProductList.as_view()),
    path('products/<str:tag>', views.TagProductList.as_view()),
    path('product/<int:pk>/', views.ProductDetail.as_view()),
    path('related-products/<int:pk>/', views.RelatedProductList.as_view()),
    path('product-imgs/', views.ProductImgsList.as_view()),
    path('product-imgs/<int:product_id>', views.ProductImgsDetail.as_view()),
    path('product-img/<int:pk>/', views.ProductImgDetail.as_view()),
    

    # Categories URLS
    path('categories/', views.CategoryList.as_view()),
    path('category/<int:pk>/', views.CategoryDetail.as_view()),

    # Customer URLS
    path('customers/', views.CustomerList.as_view()),
    path('customer/<int:pk>/', views.CustomerDetail.as_view()),
    path('user/<int:pk>/', views.UserDetail.as_view()),
    path('customer/login/', views.customer_login,name='customer_login'),
    path('customer/register/', views.customer_register,name='customer_register'),

    # Order URLS
    path('orders/', views.OrderList.as_view()),
    path('order/<int:pk>/', views.OrderDetail.as_view()),
    path('order-modify/<int:pk>/', views.OrderModify.as_view()),
    path('orderitems/', views.OrderItemList.as_view()),
    path('customer/<int:pk>/orderitems/', views.CustomerOrderItemList.as_view()),
    path('update-order-status/<int:order_id>', views.update_order_status,name='update_order_status'),

    # Wishlist
    path('wishlist/', views.WishList.as_view()),
    path('check-in-wishlist/', views.check_in_wishlist,name='check_in_wishlist'),
    path('remove-from-wishlist/', views.remove_from_wishlist,name='remove_from_wishlist'),
    path('customer/<int:pk>/wishitems/', views.CustomerWishItemList.as_view()),
    path('customer/<int:pk>/address-list/', views.CustomerAddressList.as_view()),
    path('mark-default-address/<int:pk>/', views.mark_default_address,name='mark_default_address'),
    path('customer/dashboard/<int:pk>/', views.customer_dashboard,name='customer_dashboard'),


]
urlpatterns+=router.urls