# Generated by Django 4.2.6 on 2023-11-14 22:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_alter_customer_mobile'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitems',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='orderitems',
            name='qty',
            field=models.IntegerField(default=1),
        ),
    ]