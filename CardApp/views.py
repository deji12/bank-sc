from django.shortcuts import render
from accounts.models import User, UserBankAccount
from transactions.models import Transaction
from accounts.models import UserAddress

def CardView(request):

    get_user_bank_account = UserBankAccount.objects.get(user=request.user)

    get_history = Transaction.objects.filter(account=get_user_bank_account)

    # credit card
    credit_numbers = []
    for i in get_user_bank_account.visa_card_number:
        credit_numbers.append(i)

    # virtual card
    virtual_numbers = []
    for i in get_user_bank_account.virtual_card_number:
        virtual_numbers.append(i)

    # master card
    master_numbers = []
    for i in get_user_bank_account.master_card_number:
        master_numbers.append(i)

    user_address = UserAddress.objects.get(user=request.user)

    context = {
        'first': credit_numbers[0:4],
        'second': credit_numbers[4:8],
        'third': credit_numbers[8:12],
        'last': credit_numbers[12:16],
        'vir1': virtual_numbers[0:4],
        'vir2': virtual_numbers[4:8],
        'vir3': virtual_numbers[8:12],
        'vir4': virtual_numbers[12:16],
        'mas1': master_numbers[0:4],
        'mas2': master_numbers[4:8],
        'mas3': master_numbers[8:12],
        'mas4': master_numbers[12:16],
        'account': get_user_bank_account,
        'histroy': get_history,
        'address': user_address,
    }

    return render(request, 'new/cards.html',context)