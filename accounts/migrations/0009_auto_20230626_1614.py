# Generated by Django 3.2.7 on 2023-06-26 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_auto_20230626_1541'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(blank=True, max_length=150, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='userbankaccount',
            name='master_card_number',
            field=models.CharField(blank=True, default=5556534011699209, max_length=225, null=True),
        ),
        migrations.AlterField(
            model_name='userbankaccount',
            name='virtual_card_number',
            field=models.CharField(blank=True, default=4539791474982697, max_length=225, null=True),
        ),
    ]
