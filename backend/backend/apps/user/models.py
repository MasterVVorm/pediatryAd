from django.db import models


class User(models.Model):
    login = models.CharField(max_length=254)
    password = models.CharField(max_length=254)
    token = models.CharField(max_length=500)
    token_creation_date = models.DateTimeField(
        auto_now=False, auto_now_add=False)

    def __str__(self):
        return self.login
        
