# Generated by Django 4.2.6 on 2023-11-22 05:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0028_vendor_mobile_vendor_profile_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='publish_status',
            field=models.BooleanField(default=False),
        ),
    ]