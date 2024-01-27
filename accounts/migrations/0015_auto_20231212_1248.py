# Generated by Django 3.2.7 on 2023-12-12 12:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0014_auto_20231210_1748'),
    ]

    operations = [
        migrations.RenameField(
            model_name='useraddress',
            old_name='addtess_2',
            new_name='address_2',
        ),
        migrations.AlterField(
            model_name='userbankaccount',
            name='master_card_number',
            field=models.CharField(blank=True, default=5447889276989858, max_length=225, null=True),
        ),
        migrations.AlterField(
            model_name='userbankaccount',
            name='virtual_card_number',
            field=models.CharField(blank=True, default=4024007199823690, max_length=225, null=True),
        ),
        migrations.AlterField(
            model_name='userbankaccount',
            name='visa_card_number',
            field=models.CharField(blank=True, default=4556916813644553, max_length=225, null=True),
        ),
    ]
