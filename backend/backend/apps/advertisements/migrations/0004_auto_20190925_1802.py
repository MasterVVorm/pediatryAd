# Generated by Django 2.1 on 2019-09-25 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('advertisements', '0003_auto_20190925_1452'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='advertisement',
            name='image_url',
        ),
        migrations.AddField(
            model_name='advertisement',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]
