# Generated by Django 4.2.6 on 2023-12-18 23:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0031_remove_product_purchase_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='productcategory',
            name='category_img',
            field=models.ImageField(null=True, upload_to='category_imgs/'),
        ),
    ]
