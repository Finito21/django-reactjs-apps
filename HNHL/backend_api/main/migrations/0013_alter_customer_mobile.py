# Generated by Django 4.2.6 on 2023-11-14 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_product_image_product_tags_productimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='mobile',
            field=models.PositiveBigIntegerField(unique=True),
        ),
    ]
