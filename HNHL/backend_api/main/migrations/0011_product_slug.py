# Generated by Django 4.2.6 on 2023-11-10 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_productrating'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='slug',
            field=models.CharField(max_length=300, null=True, unique=True),
        ),
    ]
