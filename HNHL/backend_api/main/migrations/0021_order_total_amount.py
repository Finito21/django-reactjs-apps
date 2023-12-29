# Generated by Django 4.2.6 on 2023-11-18 14:59

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0020_orderitems_eur_price_orderitems_usd_price"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="total_amount",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
