from django.db import models

from .constants import TRANSACTION_TYPE_CHOICES
from accounts.models import UserBankAccount
import uuid


class Transaction(models.Model):
    account = models.ForeignKey(
        UserBankAccount,
        related_name='transactions',
        on_delete=models.CASCADE,
    )
    amount = models.DecimalField(
        decimal_places=2,
        max_digits=12
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    recipient_name = models.CharField(max_length=225, null=True, blank=True)
    recipient = models.CharField(max_length=225, null=True, blank=True)
    routing_number = models.IntegerField(default=0
        )
    balance_after_transaction = models.DecimalField(
        decimal_places=2,
        max_digits=12
    )
    transaction_type = models.PositiveSmallIntegerField(
        choices=TRANSACTION_TYPE_CHOICES
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.account.account_no)

    # class Meta:
    #     ordering = ['timestamp']

    def __str__(self) -> str:
        return str(self.account.account_no)
