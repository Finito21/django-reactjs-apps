from . import serializers
from rest_framework import generics, permissions, pagination, viewsets
from . import models

from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Count
from django.contrib.auth.hashers import make_password

from .pagination import CustomerPagination


# Create your views here.
class VendorList(generics.ListCreateAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorSerializer

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        qs = super().get_queryset().order_by("-id")
        if "fetch_limit" in self.request.GET:
            limit = int(self.request.GET["fetch_limit"])
            qs = qs[:limit]
        return qs


class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorDetailSerializer
    # permission_classes = [permissions.IsAuthenticated]


class VendorProductList(generics.ListAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs["vendor_id"]
        qs = qs.filter(vendor__id=vendor_id).order_by("id")
        return qs


@csrf_exempt
def vendor_register(request):
    if request.method == "POST":
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        username = request.POST.get("username")
        email = request.POST.get("email")
        mobile = request.POST.get("mobile")
        address = request.POST.get("address")
        password = request.POST.get("password")

        # Hash the password
        hashed_password = make_password(password)

        try:
            user = User.objects.create(
                first_name=first_name,
                last_name=last_name,
                username=username,
                email=email,
                password=hashed_password,  # Save the hashed password
            )
            if user:
                try:
                    vendor = models.Vendor.objects.create(
                        user=user,
                        mobile=mobile,
                        address=address,
                        profile_img="../media/vendor_imgs/logo.svg",
                    )
                    msg = {
                        "bool": True,
                        "user": user.id,
                        "vendor": vendor.id,
                        "msg": "Thank you for your registration. You can log in now.",
                    }
                except IntegrityError:
                    msg = {"bool": False, "msg": "Mobile already exists!!!"}
            else:
                msg = {"bool": False, "msg": "Ooops... Something went wrong!!!"}
        except IntegrityError:
            msg = {"bool": False, "msg": "Username already exists!!!"}
        return JsonResponse(msg)
    else:
        return JsonResponse({"error": "Invalid request method"})


@csrf_exempt
def vendor_change_password(request, vendor_id):
    password = request.POST.get("password")
    vendor = models.Vendor.objects.get(id=vendor_id)
    user = vendor.user
    user.password = make_password(password)
    user.save()
    msg = {"bool": True, "msg": "Password has been changed"}
    return JsonResponse(msg)


@csrf_exempt
def vendor_login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(username=username, password=password)

        if user:
            vendor = models.Vendor.objects.get(user=user)
            msg = {
                "bool": True,
                "user": user.username,
                "id": vendor.id,
            }
        else:
            msg = {"bool": False, "msg": "Invalid Username/Password"}

        return JsonResponse(msg)
    else:
        return JsonResponse({"error": "Invalid request method"})


class ProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset().order_by("-id")
        if "category" in self.request.GET:
            category = self.request.GET["category"]
            category = models.ProductCategory.objects.get(id=category)
            qs = qs.filter(category=category)
        if "fetch_limit" in self.request.GET:
            limit = int(self.request.GET["fetch_limit"])
            qs = qs[:limit]
        return qs


class TagProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        tag = self.kwargs["tag"]
        qs = qs.filter(tags__icontains=tag)
        return qs


class RelatedProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        product_id = self.kwargs["pk"]
        product = models.Product.objects.get(id=product_id)
        qs = qs.filter(category=product.category).exclude(id=product_id)
        return qs


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductDetailSerializer


class CustomerList(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer
    page_size = 100
    # permission_classes = [permissions.IsAuthenticated]


class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerDetailSerializer
    # permission_classes = [permissions.IsAuthenticated]


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


@csrf_exempt
def customer_login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(username=username, password=password)

        if user:
            customer = models.Customer.objects.get(user=user)
            msg = {
                "bool": True,
                "user": user.username,
                "id": customer.id,
            }
        else:
            msg = {"bool": False, "msg": "Invalid Username/Password"}

        return JsonResponse(msg)
    else:
        return JsonResponse({"error": "Invalid request method"})


@csrf_exempt
def customer_register(request):
    if request.method == "POST":
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        username = request.POST.get("username")
        email = request.POST.get("email")
        mobile = request.POST.get("mobile")
        password = request.POST.get("password")

        # Hash the password
        hashed_password = make_password(password)

        try:
            user = User.objects.create(
                first_name=first_name,
                last_name=last_name,
                username=username,
                email=email,
                password=hashed_password,  # Save the hashed password
            )

            if user:
                try:
                    customer = models.Customer.objects.create(user=user, mobile=mobile)
                    msg = {
                        "bool": True,
                        "user": user.id,
                        "customer": customer.id,
                        "msg": "Thank you for your registration. You can log in now.",
                    }
                except IntegrityError:
                    msg = {"bool": False, "msg": "Mobile already exists!!!"}
            else:
                msg = {"bool": False, "msg": "Oops... Something went wrong!!!"}
        except IntegrityError:
            msg = {"bool": False, "msg": "Username already exists!!!"}
        return JsonResponse(msg)
    else:
        return JsonResponse({"error": "Invalid request method"})


@csrf_exempt
def customer_change_password(request, customer_id):
    password = request.POST.get("password")
    customer = models.Customer.objects.get(id=customer_id)
    user = customer.user
    user.password = make_password(password)
    user.save()
    msg = {"bool": True, "msg": "Password has been changed"}
    return JsonResponse(msg)


class OrderList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer

    def post(self, request, *args, **kwargs):
        print(request.POST)
        return super().post(request, *args, **kwargs)


class OrderCustomerList(generics.ListCreateAPIView):
    serializer_class = serializers.OrderSerializer

    def get_queryset(self):
        # Get the vendor_id from the URL parameters
        vendor_id = self.kwargs["vendor_id"]

        # Filter orders that have at least one product from the specified vendor
        qs = models.Order.objects.filter(
            order_items__product__vendor__id=vendor_id
        ).distinct()

        return qs


class OrderItemList(generics.ListCreateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def post(self, request, *args, **kwargs):
        print(request.POST)
        return super().post(request, *args, **kwargs)


class CustomerOrderItemList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs["pk"]
        qs = qs.filter(order__customer__id=customer_id)
        if "fetch_limit" in self.request.GET:
            limit = int(self.request.GET["fetch_limit"])
            qs = qs[:limit]
        return qs
    
    


class VendorOrderItemList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs["pk"]
        qs = qs.filter(product__vendor__id=vendor_id)
        return qs


class VendorOrderItemDetails(generics.RetrieveAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer


class VendorCustomerList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer
    pagination_class = CustomerPagination
    

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs["pk"]
        qs = qs.filter(product__vendor__id=vendor_id)
        return qs


class VendorCustomerOrderItemList(generics.ListAPIView):
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        vendor_id = self.kwargs["vendor_id"]
        customer_id = self.kwargs["customer_id"]
        order_id = self.kwargs["order_id"]

        # Fetch and filter orders based on vendor, customer, and order IDs
        return models.OrderItems.objects.filter(
            order__id=order_id,
            product__vendor__id=vendor_id,
            order__customer__id=customer_id,
        )


class OrderDetail(generics.ListAPIView):
    serializer_class = serializers.OrderDetailSerializer

    def get_queryset(self):
        order_id = self.kwargs["pk"]
        order = models.Order.objects.get(id=order_id)
        order_items = models.OrderItems.objects.filter(order=order)
        return order_items


class OrderDelete(generics.RetrieveDestroyAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderDetailSerializer


class CustomerAddressViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CustomerAddressSerializer
    queryset = models.CustomerAddress.objects.all()


class ProductRatingViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProductRatingSerializer
    queryset = models.ProductRating.objects.all()


class CategoryList(generics.ListCreateAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategorySerializer

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        qs = super().get_queryset().order_by("-id")
        if "fetch_limit" in self.request.GET:
            limit = int(self.request.GET["fetch_limit"])
            qs = qs[:limit]
        return qs


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategoryDetailSerializer
    # permission_classes = [permissions.IsAuthenticated]


class OrderItemModify(generics.RetrieveUpdateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        delivery_status = request.data.get("delivery_status")

        if delivery_status:
            instance.delivery_status = delivery_status
            instance.save()

            serializer = self.get_serializer(instance)
            return Response(serializer.data)

        return Response(
            {"detail": "No valid data provided for update."},
            status=status.HTTP_400_BAD_REQUEST,
        )


@csrf_exempt
def update_order_status(request, order_id):
    if request.method == "POST":
        updateRes = models.Order.objects.filter(id=order_id).update(order_status=True)
        msg = {
            "bool": False,
        }
        if updateRes:
            msg = {
                "bool": True,
            }
    return JsonResponse(msg)


@csrf_exempt
def delete_customer_orders(request, customer_id):
    if request.method == "DELETE":
        orders = models.Order.objects.filter(customer__id=customer_id).delete()
        msg = {
            "bool": False,
        }
        if orders:
            msg = {
                "bool": True,
            }
    return JsonResponse(msg)


@csrf_exempt
def delete_customer_order(request, order_id):
    if request.method == "DELETE":
        orders = models.Order.objects.filter(id=order_id).delete()
        msg = {
            "bool": False,
        }
        if orders:
            msg = {
                "bool": True,
            }
    return JsonResponse(msg)


class WishList(generics.ListCreateAPIView):
    queryset = models.Wishlist.objects.all()
    serializer_class = serializers.WishlistSerializer


@csrf_exempt
def check_in_wishlist(request):
    if request.method == "POST":
        product_id = request.POST.get("product")
        customer_id = request.POST.get("customer")
        checkWishlist = models.Wishlist.objects.filter(
            product_id=product_id, customer_id=customer_id
        ).count()
        msg = {
            "bool": False,
        }
        if checkWishlist > 0:
            msg = {
                "bool": True,
            }
    return JsonResponse(msg)


class CustomerWishItemList(generics.ListAPIView):
    queryset = models.Wishlist.objects.all()
    serializer_class = serializers.WishlistSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs["pk"]
        qs = qs.filter(customer__id=customer_id)
        return qs


@csrf_exempt
def remove_from_wishlist(request):
    if request.method == "POST":
        wishlist_id = request.POST.get("wishlist_id")
        res = models.Wishlist.objects.filter(id=wishlist_id).delete()
        msg = {
            "bool": False,
        }
        if res:
            msg = {
                "bool": True,
            }
    return JsonResponse(msg)


class CustomerAddressList(generics.ListAPIView):
    queryset = models.CustomerAddress.objects.all()
    serializer_class = serializers.CustomerAddressSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs["pk"]
        qs = qs.filter(customer__id=customer_id).order_by("id")
        return qs


@csrf_exempt
def mark_default_address(request, pk):
    if request.method == "POST":
        address_id = request.POST.get("address_id")
        models.CustomerAddress.objects.filter(customer__id=pk).update(
            default_address=False
        )
        res = models.CustomerAddress.objects.filter(id=address_id).update(
            default_address=True
        )
        msg = {"bool": False}
        if res:
            msg = {"bool": True}
    return JsonResponse(msg)


def customer_dashboard(request, pk):
    customer_id = pk
    totalOrders = models.Order.objects.filter(customer__id=customer_id).count()
    totalWishList = models.Wishlist.objects.filter(customer__id=customer_id).count()
    totalAddress = models.CustomerAddress.objects.filter(
        customer__id=customer_id
    ).count()
    print(totalWishList)
    msg = {
        "totalOrders": totalOrders,
        "totalWishList": totalWishList,
        "totalAddress": totalAddress,
    }
    return JsonResponse(msg)


class ProductImgsList(generics.ListCreateAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer


class ProductImgsDetail(generics.ListCreateAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        product_id = self.kwargs["product_id"]
        qs = qs.filter(product__id=product_id)
        return qs


class ProductImgDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer


def vendor_dashboard(request, pk):
    vendor_id = pk
    totalProducts = models.Product.objects.filter(vendor__id=vendor_id).count()
    totalOrders = (
        models.OrderItems.objects.filter(product__vendor__id=vendor_id)
        .values("order__customer")
        .count()
    )

    # Zlicz unikalnych klientów
    totalCustomers = (
        models.OrderItems.objects.filter(product__vendor__id=vendor_id)
        .values("order__customer")
        .distinct()
        .count()
    )

    msg = {
        "totalProducts": totalProducts,
        "totalOrders": totalOrders,
        "totalCustomers": totalCustomers,
    }
    return JsonResponse(msg)


class VendorDailyReport(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrdersSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs["pk"]
        qs = qs.filter(product__vendor__id=vendor_id).annotate(Count("id"))
        return qs


class VendorOrderList(generics.ListAPIView):
    serializer_class = serializers.OrderSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs["pk"]
        qs = qs.filter(vendor__id=vendor_id)
        return qs
