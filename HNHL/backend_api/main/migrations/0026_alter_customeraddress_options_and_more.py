# Generated by Django 4.2.6 on 2023-11-18 22:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0025_alter_productcategory_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customeraddress',
            options={'verbose_name_plural': 'Customer Addresses'},
        ),
        migrations.AlterModelOptions(
            name='orderitems',
            options={'verbose_name_plural': 'Order Items'},
        ),
    ]
