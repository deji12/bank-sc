from django.shortcuts import render, redirect
from accounts.models import *
from django.contrib.auth import login
from .auth import authenticate
from django.http import HttpResponse
from django.contrib import messages

def Register(request):

    if request.user.is_authenticated:
        return redirect('accounts:home')

    if request.method == 'POST':
        first_name = request.POST.get('name')
        surname = request.POST.get('surname')
        country = request.POST.get('country')
        dob = request.POST.get('dateOfBirth')
        country_of_residence = request.POST.get('countryOfResidence')
        country_of_citizenship = request.POST.get('countryCitizenship')
        address = request.POST.get('address')
        phone = request.POST.get('phone')
        city = request.POST.get('city')
        mobile_phone = request.POST.get('mobilePhone')
        state_province_region = request.POST.get('stateProvinceRegion') # split by /
        email = request.POST.get('email')
        zip_code = request.POST.get('zipCode')
        id_number = request.POST.get('idNumber')
        document = request.FILES.get('chosenDocument')
        login_name = request.POST.get('preferredLoginName')
        account_currency_usd = request.POST.get('accountCurrencyUsd')
        account_currency_eur = request.POST.get('accountCurrencyEur')
        account_currency_gpb = request.POST.get('accountCurrencyGpb')
        account_type = request.POST.get('account_type')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm-password')

        new_user = User.objects.create_user(
            username = login_name, 
            email = email,
            first_name = first_name,
            last_name = surname,
            account_type = account_type,
            password=password
        )
        
        new_user.save()

        new_user_address = UserAddress(
            user = new_user,
            street_address = address,
            city = city,
            postal_code = zip_code,
            country = country_of_residence,
            country_of_citizenship = country_of_citizenship,
            phone = phone,
            state_province_region = state_province_region,
            document_id_number = id_number,
            document = document,
            # image = document
        )

        if account_currency_usd == 'on':
            new_user_address.account_currency_usd = True
        if account_currency_eur == 'on':
            new_user_address.account_currency_eur = True
        if account_currency_gpb == 'on':
            new_user_address.account_currency_gpb = True
        new_user_address.save()

        new_user_bank_account = UserBankAccount(user=new_user, birth_date=dob)
        new_user_bank_account.save()

        return redirect('register-success')

    return render(request, 'CoApp/open_account.html')

def Login(request):
    if request.user.is_authenticated:
        return redirect('accounts:home')
    if request.method == 'POST':

        email = request.POST.get('email')
        password = request.POST.get('password')

        authenticate_user = authenticate(email=email, password=password)
        if authenticate_user is not None:
            login(request, authenticate_user)

            if 'next' in request.POST:
                return redirect(request.POST['next'])
            else:
                return redirect('accounts:home')
        else:
            messages.error(request, 'You have provided invalid login credentials')
            return redirect('coapp-login')

    return render(request, 'CoApp/log_in.html')

def RegisterSuccess(request):

    return render(request, 'CoApp/success.html')

def HomePage(request):

    return render(request, 'CoApp/index.html')

def AboutUs(request):

    return render(request, 'CoApp/about_us.html')

def PrivateBanking(request):

    return render(request, 'CoApp/private_banking.html')

def CommercialBanking(request):

    return render(request, 'CoApp/commercial_banking.html')

def Cards(request):

    return render(request, 'CoApp/cards.html')

def DigitalAssetsBanking(request):

    return render(request, 'CoApp/digital_assets_banking.html')

def TradeFinance(request):

    return render(request, 'CoApp/trade_finance.html')

def Faq(request):

    return render(request, 'CoApp/faq.html')

def Contact(request):

    return render(request, 'CoApp/contact.html')

def LegalInformation(request):

    return render(request, 'CoApp/legal_information.html')