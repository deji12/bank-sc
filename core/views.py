from django.views.generic import TemplateView
from django.shortcuts import render, redirect
from accounts.models import *
from django.contrib.auth import login
from CoApp.auth import authenticate
from django.contrib import messages

def Login(request):

    if request.user.is_authenticated:
        return redirect('accounts:home')

    if request.method == 'POST':

        email = request.POST.get('email')
        password = request.POST.get('password')

        authenticate_user = authenticate(email=email, password=password)
        if authenticate_user is not None:
            if authenticate_user.is_active:
                login(request, authenticate_user)

                if 'next' in request.POST:
                    return redirect(request.POST['next'])
                else:
                    return redirect('accounts:home')
            else:
                messages.error(request, 'Your application is being reviewed. Wait 2-3 days then our specialists will contact you using the provided information')
                return redirect('core-login')
        else:
            messages.error(request, 'Invalid login credentials')
            return redirect('core-login')


    return render(request, 'new/auth-login.html')

def Register(request):

    if request.user.is_authenticated:
        return redirect('accounts:home')

    if request.method == 'POST':

        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        dob = request.POST.get('date_of_birth')
        city = request.POST.get('city')
        state = request.POST.get('state')
        zip_code = request.POST.get('zip_code')
        country = request.POST.get('country')
        address_1 = request.POST.get('address_line_1')
        address_2 = request.POST.get('address_line_2')
        mobile_phone = request.POST.get('phone_number')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        id_number = request.POST.get('id_number')
        document = request.FILES.get('chosenDocument')
        
        #check if email exists
        check_if_email_exists = User.objects.filter(email=email)
        if check_if_email_exists:

            context = {
                "first_name": first_name,
                "last_name": last_name,
                "date_of_birth": dob,
                "city": city,
                "state": state,
                "zip_code": zip_code,
                "country": country,
                "address_line_1": address_1,
                "address_line_2": address_2,
                "phone_number": mobile_phone,
                "email": email,
                "id_number": id_number,
            }

            messages.error(request, 'Email already in use. Try another')
            return render(request, 'home/register.html', context)
        

        new_user = User.objects.create_user(
            username = email, 
            email = email,
            first_name = first_name,
            last_name = last_name,
            # account_type = account_type,
            password=password,
            is_active = False
        )
        new_user.save()

        new_user_address = UserAddress(
            user = new_user,
            street_address = address_1,
            address_2 = address_2,
            city = city,
            postal_code = zip_code,
            country = country,
            # country_of_citizenship = country_of_citizenship,
            phone = mobile_phone,
            state_province_region = state,
            document_id_number = id_number,
            document = document,
            # image = document
        )

        new_user_address.save()

        new_user_bank_account = UserBankAccount(user=new_user, birth_date=dob)
        new_user_bank_account.save()

        return render(request, 'home/register.html', {"success": True})

    return render(request, 'home/register.html')

class HomeView(TemplateView):
    template_name = 'home/index.html'

class ProductsView(TemplateView):
    template_name = 'home/products.html'

class WhoAreWeView(TemplateView):
    template_name = 'home/who-we-are.html'

class FAQView(TemplateView):
    template_name = 'home/faq.html'

class SecCentralView(TemplateView):
    template_name = 'home/security-center.html'

class newsroomView(TemplateView):
    template_name = 'home/newsroom.html'

class MileageSavingView(TemplateView):
    template_name = 'home/mileage-savings-account.html'

class InterestSavingView(TemplateView):
    template_name = 'home/interest-savings-account.html'

class DisclosuresView(TemplateView):
    template_name = 'home/disclosures.html'

class CommonsScamsView(TemplateView):
    template_name = 'home/common-scams.html'


class CertficatesOfDepositView(TemplateView):
    template_name = 'home/certificates-of-deposit.html'


class BonusMilesView(TemplateView):
    template_name = 'home/bonus-miles-terms-and-conditions.html'