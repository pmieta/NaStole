# Generated by Django 5.0.6 on 2024-06-08 02:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_remove_address_floor_remove_customer_city_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='name',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
