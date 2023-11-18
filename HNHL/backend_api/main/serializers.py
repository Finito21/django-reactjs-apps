from rest_framework import serializers
from rest_framework.fields import empty
from . import models

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Vendor
        fields=['id','user','address']

    def __init__(self, *args, **kwargs):
        super(VendorSerializer,self).__init__(*args, **kwargs)
        #self.Meta.depth = 1


class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Vendor
        fields=['id','user','address']

    def __init__(self, *args, **kwargs):
        super(VendorDetailSerializer,self).__init__(*args, **kwargs)
        #self.Meta.depth = 1

class ProductListSerializer(serializers.ModelSerializer):
    product_ratings=serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model=models.Product
        fields=['id','category','vendor','title','slug','tag_list','detail','price','usd_price','eur_price','product_ratings','image']

    def __init__(self, *args, **kwargs):
        super(ProductListSerializer,self).__init__(*args, **kwargs)
        #self.Meta.depth = 1


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ProductImage
        fields=['id','product','image']

class ProductDetailSerializer(serializers.ModelSerializer):
    product_ratings=serializers.StringRelatedField(many=True, read_only=True)
    product_imgs=ProductImageSerializer(many=True, read_only=True)
    class Meta:
        many= True
        model=models.Product
        fields=['id','category','vendor','title','slug','tag_list','detail','price','usd_price','eur_price','product_ratings','product_imgs','image']

    def __init__(self, *args, **kwargs):
        super(ProductDetailSerializer,self).__init__(*args, **kwargs)
        #self.Meta.depth = 1

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Customer
        fields=['id','user','mobile']

    def __init__(self, *args, **kwargs):
        super(CustomerSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth = 1


class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Customer
        fields=['id','user','mobile']

    def __init__(self, *args, **kwargs):
        super(CustomerDetailSerializer ,self).__init__(*args, **kwargs)
        self.Meta.depth = 1

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Order
        fields=['id','customer','order_status','total_amount','total_usd_amount','total_eur_amount']

    # def __init__(self, *args, **kwargs):
    #     super(OrderSerializer,self).__init__(*args, **kwargs)
    #     self.Meta.depth = 1


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.OrderItems
        fields=['id','order','product']

    def __init__(self, *args, **kwargs):
        super(OrderDetailSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth = 1

class OrderItemSerializer(serializers.ModelSerializer):
    # order=OrderDetailSerializer()
    # product=ProductDetailSerializer()
    class Meta:
        model=models.OrderItems
        fields=['id','order','product','qty','price','usd_price','eur_price']

    def to_representation(self,instance):
        response=super().to_representation(instance) 
        response['order']=OrderSerializer(instance.order).data
        response['product']=ProductDetailSerializer(instance.product).data
        return response

class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.CustomerAddress
        fields=['id','customer','address','default_address']

    def __init__(self, *args, **kwargs):
        super(CustomerAddressSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth = 1

class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ProductRating
        fields=['id','customer','product','rating','reviews','add_time']

   # def __init__(self, *args, **kwargs):
   #     super(ProductRatingSerializer,self).__init__(*args, **kwargs)
   #     self.Meta.depth = 1

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ProductCategory
        fields=['id','title','detail']

    def __init__(self, *args, **kwargs):
        super(CategorySerializer,self).__init__(*args, **kwargs)
        #self.Meta.depth = 1


class CategoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ProductCategory
        fields=['id','title','detail']

    def __init__(self, *args, **kwargs):
        super(CategoryDetailSerializer,self).__init__(*args, **kwargs)
        #self.Meta.depth = 1

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Wishlist
        fields=['id','product','customer']

    def __init__(self, *args, **kwargs):
        super(WishlistSerializer,self).__init__(*args, **kwargs)
    def to_representation(self,instance):
        response=super().to_representation(instance) 
        response['customer']=CustomerSerializer(instance.customer).data
        response['product']=ProductDetailSerializer(instance.product).data
        return response