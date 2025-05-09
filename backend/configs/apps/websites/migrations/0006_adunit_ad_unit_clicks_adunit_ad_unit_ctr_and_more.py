# Generated by Django 5.0.10 on 2025-04-26 17:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('websites', '0005_alter_websiteverification_adchain_snippet_adunit'),
    ]

    operations = [
        migrations.AddField(
            model_name='adunit',
            name='ad_unit_clicks',
            field=models.PositiveBigIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='adunit',
            name='ad_unit_ctr',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='adunit',
            name='ad_unit_impressions',
            field=models.PositiveBigIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='adunit',
            name='ad_unit_revenue',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='websiteverification',
            name='adchain_snippet',
            field=models.CharField(default='hmz3T5fMfRLq1DHrb04LiDmPxvsG7Yxu', max_length=32, unique=True),
        ),
    ]
