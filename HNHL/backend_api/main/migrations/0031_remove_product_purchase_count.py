# Generated by Django 4.2.6 on 2023-12-18 23:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0030_product_purchase_count'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='purchase_count',
        ),
    ]
