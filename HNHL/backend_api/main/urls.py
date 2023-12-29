# Importing necessary modules from Django
from django.urls import path
from . import views
from rest_framework import routers

# Creating a default router for the API views
router = routers.DefaultRouter()

# Registering API views for the 'address' and 'productrating' endpoints
router.register("address", views.CustomerAddressViewSet)
router.register("productrating", views.ProductRatingViewSet)

# Defining URL patterns for various API endpoints
urlpatterns = [ 
    # Vendor URL patterns
    path("vendors/", views.VendorList.as_view()),
    path("vendor/login/", views.vendor_login, name="vendor_login"),
    path("vendor/register/", views.vendor_register, name="vendor_register"),
    path("vendor/<int:pk>/dashboard/", views.vendor_dashboard),
    path("vendor-products/<int:vendor_id>", views.VendorProductList.as_view()),
    path("vendor/<int:pk>/", views.VendorDetail.as_view()),
    path("vendor-change-password/<int:vendor_id>", views.vendor_change_password),
    path("vendor/<int:pk>/orderitems/", views.VendorOrderItemList.as_view()),
    path("vendor/<int:pk>/customers/", views.VendorCustomerList.as_view()),
    path("vendor/<int:pk>/daily-report/", views.VendorDailyReport.as_view()),
    path(
        "vendor/<int:vendor_id>/orderitem/<int:pk>/",
        views.VendorOrderItemDetails.as_view(),
        name="vendor-orderitem-details",
    ),
    path(
        "vendor/<int:vendor_id>/orders/",
        views.OrderCustomerList.as_view(),
        name="vendor-customer-order-list",
    ),
    path(
        "vendor/<int:vendor_id>/customer/<int:customer_id>/orderitems/<int:order_id>/",
        views.VendorCustomerOrderItemList.as_view(),
        name="vendor-customer-orderitem-list",
    ),
    
    # Product URL patterns
    path("products/", views.ProductList.as_view()),
    path("products/<str:tag>", views.TagProductList.as_view()),
    path("product/<int:pk>/", views.ProductDetail.as_view()),
    path("related-products/<int:pk>/", views.RelatedProductList.as_view()),
    path("product-imgs/", views.ProductImgsList.as_view()),
    path("product-imgs/<int:product_id>", views.ProductImgsDetail.as_view()),
    path("product-img/<int:pk>/", views.ProductImgDetail.as_view()),
    
    # Categories URL patterns
    path("categories/", views.CategoryList.as_view()),
    path("category/<int:pk>/", views.CategoryDetail.as_view()),
    
    # Customer URL patterns
    path("customers/", views.CustomerList.as_view()),
    path("customer/<int:pk>/", views.CustomerDetail.as_view()),
    path(
        "customer/dashboard/<int:pk>/",
        views.customer_dashboard,
        name="customer_dashboard",
    ),
    path("user/<int:pk>/", views.UserDetail.as_view()),
    path("customer/login/", views.customer_login, name="customer_login"),
    path("customer/register/", views.customer_register, name="customer_register"),
    path("customer-change-password/<int:customer_id>", views.customer_change_password),
    
    # Order URL patterns
    path("orders/", views.OrderList.as_view()),
    path("order/<int:pk>/", views.OrderDetail.as_view()),
    path(
        "delete-customer-orders/<int:customer_id>/",
        views.delete_customer_orders,
        name="delete_customer_orders",
    ),
    path(
        "delete-customer-order/<int:order_id>/",
        views.delete_customer_order,
        name="delete_customer_order",
    ),
    path("order-modify/<int:pk>/", views.OrderItemModify.as_view()),
    path("orderitems/", views.OrderItemList.as_view()),
    path("customer/<int:pk>/orderitems/", views.CustomerOrderItemList.as_view()),
    path(
        "update-order-status/<int:order_id>",
        views.update_order_status,
        name="update_order_status",
    ),
    
    # Wishlist URL patterns
    path("wishlist/", views.WishList.as_view()),
    path("check-in-wishlist/", views.check_in_wishlist, name="check_in_wishlist"),
    path(
        "remove-from-wishlist/", views.remove_from_wishlist, name="remove_from_wishlist"
    ),
    path("customer/<int:pk>/wishitems/", views.CustomerWishItemList.as_view()),
    
    # Address URL patterns
    path("customer/<int:pk>/address-list/", views.CustomerAddressList.as_view()),
    path(
        "mark-default-address/<int:pk>/",
        views.mark_default_address,
        name="mark_default_address",
    ),
]

# Adding router URLs to the urlpatterns list
urlpatterns += router.urls
