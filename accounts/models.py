from decimal import Decimal

from django.contrib.auth.models import AbstractUser
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator,
)
from django.db import models

from .constants import GENDER_CHOICE
from .managers import UserManager
import ccard


class User(AbstractUser):
    username = models.CharField(unique=True,max_length=150,null=True, blank=True)
    email = models.EmailField(unique=True, null=False, blank=False)
    account_type = models.CharField(max_length=225, null=True, blank=True)

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return str(self.username)

    @property
    def balance(self):
        if hasattr(self, 'account'):
            return self.account.balance
        return 0


class BankAccountType(models.Model):
    name = models.CharField(max_length=128)
    maximum_withdrawal_amount = models.DecimalField(
        decimal_places=2,
        max_digits=12
    )
    annual_interest_rate = models.DecimalField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        decimal_places=2,
        max_digits=5,
        help_text='Interest rate from 0 - 100'
    )
    interest_calculation_per_year = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(12)],
        help_text='The number of times interest will be calculated per year'
    )

    def __str__(self):
        return self.name

    def calculate_interest(self, principal):
        """
        Calculate interest for each account type.

        This uses a basic interest calculation formula
        """
        p = principal
        r = self.annual_interest_rate
        n = Decimal(self.interest_calculation_per_year)

        # Basic Future Value formula to calculate interest
        interest = (p * (1 + ((r/100) / n))) - p

        return round(interest, 2)


class UserBankAccount(models.Model):
    user = models.ForeignKey(
        User,
        related_name='account',
        on_delete=models.CASCADE,
    )
    account_type = models.ForeignKey(
        BankAccountType,
        related_name='accounts',
        on_delete=models.CASCADE,
        null=True, blank=True
    )
    visa_card_number = models.CharField(max_length=225, null=True, blank=True, default=ccard.visa())
    virtual_card_number = models.CharField(max_length=225, default=ccard.visa(), null=True, blank=True)
    master_card_number = models.CharField(max_length=225, default=ccard.mastercard(), null=True, blank=True)
    account_no = models.PositiveIntegerField(unique=True, null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICE)
    birth_date = models.DateField(null=True, blank=True)
    balance = models.DecimalField(
        default=0,
        max_digits=12,
        decimal_places=2,
        null=True, blank=True
    )
    savings_balance = models.DecimalField(
        default=0,
        max_digits=12,
        decimal_places=2,
        null=True, blank=True
    )
    interest_start_date = models.DateField(
        null=True, blank=True,
        help_text=(
            'The month number that interest calculation will start from'
        )
    )
    initial_deposit_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return str(self.user)
    
    def return_saving_40_percent(self):

        return round((Decimal(0.4) * self.savings_balance), 2)
    
    def return_saving_20_percent(self):

        return round((Decimal(0.2) * self.savings_balance), 2)
    
    def return_saving_10_percent(self):

        return round((Decimal(0.1) * self.savings_balance), 2)
    
    def return_balance_55_percent(self):

        return round((Decimal(0.55) * self.balance), 2)
    
    def return_balance_15_percent(self):

        return round((Decimal(0.15) * self.balance), 2)
    
    def return_balance_10_percent(self):

        return round((Decimal(0.1) * self.balance), 2)
    
    def return_balance_5_percent(self):

        return round((Decimal(0.05) * self.balance), 2)

    def get_interest_calculation_months(self):
        """
        List of month numbers for which the interest will be calculated

        returns [2, 4, 6, 8, 10, 12] for every 2 months interval
        """
        interval = int(
            12 / self.account_type.interest_calculation_per_year
        )
        start = self.interest_start_date.month
        return [i for i in range(start, 13, interval)]


class UserAddress(models.Model):
    user = models.ForeignKey(
        User,
        related_name='address',
        on_delete=models.CASCADE,
    )
    image = models.FileField(upload_to='profiles', blank=True, null=True)
    street_address = models.CharField(max_length=512)
    city = models.CharField(max_length=256)
    postal_code = models.PositiveIntegerField()
    country = models.CharField(max_length=256)
    country_of_citizenship = models.CharField(max_length=225, null=True, blank=True)
    phone = models.CharField(max_length=225, null=True, blank=True)
    state_province_region = models.CharField(max_length=225, null=True, blank=True)
    document_id_number = models.CharField(max_length=225, null=True, blank=True)
    document = models.FileField(upload_to='docs/', null=True, blank=True)
    account_currency_usd = models.BooleanField(default=False)
    account_currency_eur = models.BooleanField(default=False)
    account_currency_gpb = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user)
