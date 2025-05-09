# Generated by Django 5.0.10 on 2025-03-17 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('websites', '0002_rename_website_category_websiteverification_category_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='websiteverification',
            name='adchain_snippet',
            field=models.CharField(default='XXOOXLIWmYxYw406HjBqGdFQzccW92gv', max_length=32, unique=True),
        ),
        migrations.AlterField(
            model_name='websiteverification',
            name='earnings',
            field=models.PositiveBigIntegerField(default=0.0),
        ),
        migrations.AlterField(
            model_name='websiteverification',
            name='impressions',
            field=models.PositiveBigIntegerField(default=0.0),
        ),
    ]
