# Generated by Django 4.2.6 on 2023-10-18 06:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0006_alter_product_category"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="customer",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="customer_orders",
                to="main.customer",
            ),
        ),
        migrations.AlterField(
            model_name="orderitems",
            name="product",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="main.product"
            ),
        ),
    ]
