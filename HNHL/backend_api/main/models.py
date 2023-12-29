from django.db import models  # Importing the models module from Django
from django.contrib.auth.models import User  # Importing the User model from Django's authentication module
from django.db.models import Count  # Importing the Count aggregation function
import datetime  # Importing the datetime module

# Create your models here.

# Model representing vendors
class Vendor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # ForeignKey relationship with the User model
    mobile = models.PositiveBigIntegerField(unique=True, null=True)  # PositiveBigIntegerField for mobile with uniqueness constraint
    profile_img = models.ImageField(upload_to="vendor_imgs/", null=True)  # ImageField for profile images
    address = models.TextField(null=True)  # TextField for the vendor's address

    def __str__(self):
        return self.user.username  # String representation of the Vendor model

    # Property to show daily order chart for the vendor
    @property
    def show_chart_daily_orders(self):
        # Fetching daily orders
        orders = (
            OrderItems.objects.filter(product__vendor=self)
            .values("order__order_time__date")
            .annotate(Count("id"))
        )
        dateList = []
        countList = []
        dataSet = {}
        if orders:
            for order in orders:
                dateList.append(order["order__order_time__date"])
                countList.append(order["id__count"])
        print(dateList)
        dataSet = {"dates": dateList, "data": countList}
        return dataSet

    # Property to show monthly order chart for the vendor
    @property
    def show_chart_monthly_orders(self):
        # Fetching monthly orders
        orders = (
            OrderItems.objects.filter(product__vendor=self)
            .values("order__order_time__month")
            .annotate(Count("id"))
        )
        dateList = []
        countList = []
        dataSet = {}
        if orders:
            for order in orders:
                monthinteger = order["order__order_time__month"]
                month = datetime.date(1900, monthinteger, 1).strftime("%B")
                dateList.append(month)
                countList.append(order["id__count"])
        print(dateList)
        dataSet = {"dates": dateList, "data": countList}
        return dataSet

    # Property to show yearly order chart for the vendor
    @property
    def show_chart_yearly_orders(self):
        # Fetching yearly orders
        orders = (
            OrderItems.objects.filter(product__vendor=self)
            .values("order__order_time__year")
            .annotate(Count("id"))
        )
        dateList = []
        countList = []
        dataSet = {}
        if orders:
            for order in orders:
                dateList.append(order["order__order_time__year"])
                countList.append(order["id__count"])
        print(dateList)
        dataSet = {"dates": dateList, "data": countList}
        return dataSet

    # Property to get the total number of products for the vendor
    @property
    def total_products(self):
        product_count = Product.objects.filter(vendor=self).count()
        return product_count


# Model representing product categories
class ProductCategory(models.Model):
    title = models.CharField(max_length=200)  # CharField for the category title
    detail = models.TextField(null=True)  # TextField for additional details
    category_img = models.ImageField(upload_to="category_imgs/", null=True)  # ImageField for category images

    def __str__(self):
        return self.title  # String representation of the ProductCategory model

    class Meta:
        verbose_name_plural = "Product Categories"  # Custom plural name for the model

# Model representing products
class Product(models.Model):
    category = models.ForeignKey(
        ProductCategory,
        on_delete=models.SET_NULL,
        null=True,
        related_name="category_product",
    )
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    slug = models.CharField(max_length=300, unique=True, null=True)
    detail = models.TextField(null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    usd_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    eur_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tags = models.TextField(null=True)
    image = models.ImageField(upload_to="product_imgs/", null=True)
    publish_status = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def tag_list(self):
        if self.tags:
            tag_list = self.tags.split(",")
            return tag_list
        else:
            return []

# Model representing customers
class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mobile = models.PositiveBigIntegerField(unique=True)
    profile_img = models.ImageField(upload_to="customer_imgs/", null=True)

    def __str__(self):
        return self.user.username

# Model representing orders
class Order(models.Model):
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name="customer_orders"
    )
    order_time = models.DateTimeField(auto_now_add=True)
    order_status = models.BooleanField(default=False)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_usd_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_eur_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return "%s" % (self.order_time)

# Model representing order items with delivery status
class OrderItems(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="order_items"
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    usd_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    eur_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.product.title

    class Meta:
        verbose_name_plural = "Order Items"


class OrderItems(models.Model):
    DELIVERY_STATUS_CHOICES = [# Choices for delivery status
        ("processing", "Processing"),
        ("preparation", "Preparation"),
        ("sent", "Sent"),
        ("delivered", "Delivered"),
    ]

    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="order_items"
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    usd_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    eur_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    delivery_status = models.CharField(
        max_length=20, choices=DELIVERY_STATUS_CHOICES, default="processing"
    )

    def __str__(self):
        return self.product.title

    class Meta:
        verbose_name_plural = "Order Items"

# Model representing customer addresses
class CustomerAddress(models.Model):
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name="customer_addresses"
    )
    address = models.TextField()
    default_address = models.BooleanField(default=False)

    def __str__(self):
        return self.address

    class Meta:
        verbose_name_plural = "Customer Addresses"

# Model representing product ratings and reviews
class ProductRating(models.Model):
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name="rating_customers"
    )
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="product_ratings"
    )
    rating = models.IntegerField()
    reviews = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.rating} - {self.reviews}"

# Model representing product images
class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="product_imgs"
    )
    image = models.ImageField(upload_to="product_imgs/", null=True)

    def __str__(self):
        return self.image.url

# Model representing wishlist
class Wishlist(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Wish List"

    def __str__(self):
        return f"{self.product.title} - {self.customer.user.first_name}"
