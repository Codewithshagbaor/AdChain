# Generated by Django 5.0.10 on 2025-04-26 16:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('websites', '0004_websiteverification_code_verified_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='websiteverification',
            name='adchain_snippet',
            field=models.CharField(default='AcQCuzRSnMHW1tkDcKONPIZ4q3nNTHd0', max_length=32, unique=True),
        ),
        migrations.CreateModel(
            name='AdUnit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ad_unit_id', models.CharField(max_length=255)),
                ('ad_unit_type', models.CharField(choices=[('BANNER', 'BANNER'), ('INTERSTITIAL', 'INTERSTITIAL'), ('NATIVE', 'NATIVE'), ('VIDEO', 'VIDEO'), ('POPUP', 'POPUP'), ('TEXT', 'TEXT'), ('LINK', 'LINK'), ('IMAGE', 'IMAGE'), ('HTML', 'HTML')], default='BANNER', max_length=20)),
                ('ad_unit_size', models.CharField(choices=[('LEADERBOARD', 'LEADERBOARD'), ('MEDIUM_RECTANGLE', 'MEDIUM_RECTANGLE'), ('LARGE_RECTANGLE', 'LARGE_RECTANGLE'), ('SKYSCRAPER', 'SKYSCRAPER'), ('HALF_PAGE_AD', 'HALF_PAGE_AD')], default='LEADERBOARD', max_length=20)),
                ('ad_unit_name', models.CharField(max_length=255)),
                ('ad_unit_code', models.TextField()),
                ('status', models.CharField(choices=[('PENDING', 'PENDING'), ('APPROVED', 'APPROVED'), ('REJECTED', 'REJECTED')], default='PENDING', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('website', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='websites.websiteverification')),
            ],
        ),
    ]
