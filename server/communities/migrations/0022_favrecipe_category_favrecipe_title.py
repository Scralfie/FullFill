# Generated by Django 4.0.5 on 2022-06-08 21:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0021_favrecipe_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='favrecipe',
            name='category',
            field=models.CharField(default='1', editable=False, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='favrecipe',
            name='title',
            field=models.CharField(default='1', editable=False, max_length=100),
            preserve_default=False,
        ),
    ]
