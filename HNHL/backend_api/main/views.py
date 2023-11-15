from . import serializers
from rest_framework import generics, permissions, pagination, viewsets
from . import models

from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


# Create your views here.
class VendorList(generics.ListCreateAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorSerializer
    # permission_classes = [permissions.IsAuthenticated]

class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorDetailSerializer
    # permission_classes = [permissions.IsAuthenticated]

class ProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        if 'category' in self.request.GET:
            category_id = self.request.GET['category']
            category = models.ProductCategory.objects.get(id=category_id)
            qs = qs.filter(category=category)
        return qs
    
class TagProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        tag = self.kwargs['tag']
        qs = qs.filter(tags__icontains=tag)
        return qs
    
class RelatedProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        product_id = self.kwargs['pk']
        product = models.Product.objects.get(id=product_id)
        qs = qs.filter(category=product.category).exclude(id=product_id)
        return qs

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductDetailSerializer

class CustomerList(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer
    # permission_classes = [permissions.IsAuthenticated]

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerDetailSerializer
    # permission_classes = [permissions.IsAuthenticated]

@csrf_exempt
def customer_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)

        if user:
            customer=models.Customer.objects.get(user=user)
            msg = {
                'bool': True,
                'user': user.username,
                'id':customer.id,
            }
        else:
            msg = {
                'bool': False,
                'msg': 'Invalid Username/Password'
            }

        return JsonResponse(msg)
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@csrf_exempt
def customer_register(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        mobile = request.POST.get('mobile')
        password = request.POST.get('password')
        try:
            user = User.objects.create(
                first_name=first_name,
                last_name=last_name,
                username=username,
                email=email,
                password=password,
            )

            if user:
                try:
                    customer=models.Customer.objects.create(user=user,mobile=mobile)
                    msg = {
                        'bool': True,
                        'user': user.id,
                        'customer':customer.id,
                        'msg':'Thank you for your registration. You can login now.'
                    }
                except IntegrityError:
                    msg={
                        'bool': False,
                        'msg': 'Mobile already exist!!!'
                    }
            else:
                msg = {
                    'bool': False,
                    'msg': 'Ooops... Something went wrong!!!'
                }
        except IntegrityError:
            msg={
                'bool': False,
                'msg': 'Username already exist!!!'
            }
        return JsonResponse(msg)
    else:
        return JsonResponse({'error': 'Invalid request method'})

class OrderList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer

    def post(self,request, *args,**kwargs):
        print(request.POST)
        return super().post(request, *args,**kwargs)

    
class OrderItemList(generics.ListCreateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def post(self,request, *args,**kwargs):
        print(request.POST)
        return super().post(request, *args,**kwargs)


class OrderDetail(generics.ListAPIView):
    serializer_class = serializers.OrderDetailSerializer

    def get_queryset(self):
        order_id = self.kwargs['pk']
        order = models.Order.objects.get(id=order_id)
        order_items = models.OrderItems.objects.filter(order=order)
        return order_items

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

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategoryDetailSerializer
    # permission_classes = [permissions.IsAuthenticated]
