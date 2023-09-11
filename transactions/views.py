from dateutil.relativedelta import relativedelta
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.utils import timezone
from django.views.generic import CreateView, ListView

from transactions.constants import DEPOSIT, WITHDRAWAL
from transactions.forms import (
    DepositForm,
    TransactionDateRangeForm,
    WithdrawForm,
)
from transactions.models import Transaction
from .models import Transaction
from accounts.models import UserBankAccount, UserAddress
from django.contrib.auth.decorators import login_required

class TransactionRepostView(LoginRequiredMixin, ListView):
    template_name = 'transactions/transaction_report.html'
    model = Transaction
    form_data = {}

    def get(self, request, *args, **kwargs):
        form = TransactionDateRangeForm(request.GET or None)
        if form.is_valid():
            self.form_data = form.cleaned_data

        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        queryset = super().get_queryset().filter(
            account=self.request.user.account
        )

        daterange = self.form_data.get("daterange")

        if daterange:
            queryset = queryset.filter(timestamp__date__range=daterange)

        return queryset.distinct()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            'account': self.request.user.account,
            'form': TransactionDateRangeForm(self.request.GET or None)
        })

        return context


class TransactionCreateMixin(LoginRequiredMixin, CreateView):
    template_name = 'transactions/transaction_form.html'
    model = Transaction
    title = ''
    # success_url = reverse_lazy('transactions:transaction_report')
    success_url = reverse_lazy('accounts:home')

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs.update({
            'account': self.request.user.account
        })
        return kwargs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            'title': self.title
        })

        return context


class DepositMoneyView(TransactionCreateMixin):
    form_class = DepositForm
    title = 'Deposit Money to Your Account'

    def get_initial(self):
        initial = {'transaction_type': DEPOSIT}
        return initial

    def form_valid(self, form):
        amount = form.cleaned_data.get('amount')
        account = self.request.user.account

        if not account.initial_deposit_date:
            now = timezone.now()
            next_interest_month = int(
                12 / account.account_type.interest_calculation_per_year
            )
            account.initial_deposit_date = now
            account.interest_start_date = (
                now + relativedelta(
                    months=+next_interest_month
                )
            )

        account.balance += amount
        account.save(
            update_fields=[
                'initial_deposit_date',
                'balance',
                'interest_start_date'
            ]
        )

        messages.success(
            self.request,
            f'{amount}$ was deposited to your account successfully'
        )

        return super().form_valid(form)


class WithdrawMoneyView(TransactionCreateMixin):
    form_class = WithdrawForm
    title = 'Withdraw Money from Your Account'

    def get_initial(self):
        initial = {'transaction_type': WITHDRAWAL}
        return initial

    def form_valid(self, form):
        amount = form.cleaned_data.get('amount')

        self.request.user.account.balance -= form.cleaned_data.get('amount')
        self.request.user.account.save(update_fields=['balance'])

        messages.success(
            self.request,
            f'Successfully withdrawn {amount}$ from your account'
        )

        return super().form_valid(form)

@login_required
def AddTransaction(request):
    user_address = UserAddress.objects.get(user=request.user)
    if request.method == "POST":
        account_holder_name = request.POST.get('account_holder_name')
        amount = request.POST.get('amount')
        account_number = request.POST.get('account_number')
        routing_number = request.POST.get('routing_number')

        get_user_bank_account = UserBankAccount.objects.get(user=request.user)
        new_balance = get_user_bank_account.balance - int(amount)

        new_transaction = Transaction(
            recipient_name = account_holder_name,
            account = get_user_bank_account,
            amount = int(amount),
            routing_number = routing_number,
            recipient = account_number,
            transaction_type = 4,
            balance_after_transaction = new_balance,
        )

        get_user_bank_account.balance = new_balance
        get_user_bank_account.save()

        new_transaction.save()

        return render(request, 'new/success.html', {"pk": new_transaction.pk, 'address': user_address,})


    return render(request, 'new/send.html', {'address': user_address})

@login_required
def SuccessfulTransaction(request, pk):
    user_address = UserAddress.objects.get(user=request.user)
    return render(request, 'new/success.html', {"pk": pk, 'address': user_address,})

@login_required
def TransactionInvoices(request, pk):
    user_address = UserAddress.objects.get(user=request.user)
    get_transaction_by_id = Transaction.objects.get(pk=pk)
    return render(request, 'new/invoice.html', {"transaction": get_transaction_by_id, 'address': user_address,})


@login_required
def DepositView(request):

    user_address = UserAddress.objects.get(user=request.user)
    get_user_bank_account = UserBankAccount.objects.get(user=request.user)
    get_history = Transaction.objects.filter(account=get_user_bank_account, transaction_type=1)

    return render(request, 'new/deposits.html', {'deposits': get_history, 'address': user_address,})

@login_required
def WithdrawView(request):

    user_address = UserAddress.objects.get(user=request.user)
    get_user_bank_account = UserBankAccount.objects.get(user=request.user)
    get_history = Transaction.objects.filter(account=get_user_bank_account, transaction_type=2)

    return render(request, 'new/transfers.html', {'withdraw': get_history, 'with': True, 'address': user_address,})

@login_required
def TransferView(request):

    user_address = UserAddress.objects.get(user=request.user)
    get_user_bank_account = UserBankAccount.objects.get(user=request.user)
    get_history = Transaction.objects.filter(account=get_user_bank_account, transaction_type=4)

    return render(request, 'new/transfers.html', {'transfers': get_history, 'address': user_address})

@login_required
def ReceiveTransaction(request):
    get_user_bank_account = UserBankAccount.objects.get(user=request.user)
    user_address = UserAddress.objects.get(user=request.user)
    return render(request, 'new/receive.html', {'account': get_user_bank_account, 'address': user_address})