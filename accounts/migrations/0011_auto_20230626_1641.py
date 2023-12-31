# Generated by Django 3.2.7 on 2023-06-26 16:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_auto_20230626_1621'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userbankaccount',
            name='master_card_number',
            field=models.CharField(blank=True, default=5368542635135110, max_length=225, null=True),
        ),
        migrations.AlterField(
            model_name='userbankaccount',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='account', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='userbankaccount',
            name='virtual_card_number',
            field=models.CharField(blank=True, default=4485048694418356, max_length=225, null=True),
        ),
    ]
