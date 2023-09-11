from django.urls import path

from .views import (DepositMoneyView, WithdrawMoneyView, 
                    TransactionRepostView, AddTransaction, 
                    TransactionInvoices, SuccessfulTransaction,
                    DepositView, WithdrawView, TransferView, ReceiveTransaction)

app_name = 'transactions'



urlpatterns = [
    path("deposit/", DepositMoneyView.as_view(), name="deposit_money"),
    path("report/", TransactionRepostView.as_view(), name="transaction_report"),
    path("withdraw/", WithdrawMoneyView.as_view(), name="withdraw_money"),
    path("add-transaction/", AddTransaction, name="add_transaction"),
    path("transaction-invoices/<str:pk>/", TransactionInvoices, name="invoice"),
    path("success/<str:pk>/", SuccessfulTransaction, name="transaction_success"),
    path('deposit-histroy/', DepositView, name="deposit_histroy"),
    path('withdraw-histroy/', WithdrawView, name="withdraw_histroy"),
    path('transaction-histroy/', TransferView, name="transfer_histroy"),
    path('receive-transaction/', ReceiveTransaction, name="received_transaction"),
]
