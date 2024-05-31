from django.db import models

# Create your models here.
class Publisher(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    stock_quantity = models.IntegerField(default=0)
    release_date = models.DateField()
    min_players = models.IntegerField(default=0)
    max_players = models.IntegerField(default=0)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE, related_name="products")

    def __str__(self):
        return self.title