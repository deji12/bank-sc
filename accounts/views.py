from django.contrib import messages
from django.contrib.auth import get_user_model, login, logout, authenticate
from django.contrib.auth.views import LoginView
from django.shortcuts import HttpResponseRedirect
from django.urls import reverse_lazy
from django.views.generic import TemplateView, RedirectView

from .forms import UserRegistrationForm, UserAddressForm, UserBankAccount
from transactions.models import Transaction

from django.shortcuts import render, redirect
from .models import UserAddress, User
from django.contrib.auth.decorators import login_required


User = get_user_model()


class UserRegistrationView(TemplateView):
    model = User
    form_class = UserRegistrationForm
    template_name = 'accounts/open_account.html'

    def dispatch(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            return HttpResponseRedirect(
                reverse_lazy('accounts:home')
            )
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        registration_form = UserRegistrationForm(self.request.POST)
        address_form = UserAddressForm(self.request.POST, self.request.FILES)

        if registration_form.is_valid() and address_form.is_valid():
            user = registration_form.save()
            address = address_form.save(commit=False)
            address.user = user
            # address.image = self.request.POST['image']
            address.save()

            login(self.request, user)
            messages.success(
                self.request,
                (
                    f'Thank You For Creating A Bank Account. '
                    f'Your Account Number is {user.account.account_no}. '
                )
            )
            return HttpResponseRedirect(
                reverse_lazy('transactions:deposit_money')
            )

        return self.render_to_response(
            self.get_context_data(
                registration_form=registration_form,
                address_form=address_form
            )
        )

    def get_context_data(self, **kwargs):
        if 'registration_form' not in kwargs:
            kwargs['registration_form'] = UserRegistrationForm()
        if 'address_form' not in kwargs:
            kwargs['address_form'] = UserAddressForm()

        return super().get_context_data(**kwargs)


class UserLoginView(LoginView):
    template_name='accounts/user_login.html'
    redirect_authenticated_user = True

def LoginView(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        authenticate_user = authenticate(email=email, password=password)
        if authenticate_user is not None:
            login(request, authenticate_user)
            return redirect('accounts:home')
        else:
            messages.error(request, 'Invalid email or password')
            return redirect('accounts:login')

    return render(request, 'new/auth-login.html')


class LogoutView(RedirectView):
    pattern_name = 'home'

    def get_redirect_url(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            logout(self.request)
        return super().get_redirect_url(*args, **kwargs)

def LogOutView(request):
    logout(request)
    return redirect('coapp-login')

@login_required
def ProfileView(request):

    user_address = UserAddress.objects.get(user=request.user)

    get_user_bank_account = UserBankAccount.objects.get(user=request.user)

     # credit card
    credit_numbers = []
    for i in get_user_bank_account.visa_card_number:
        credit_numbers.append(i)


    context = {
        'address': user_address,
        'first': credit_numbers[0:4],
        'second': credit_numbers[4:8],
        'third': credit_numbers[8:12],
        'last': credit_numbers[12:16],
        'account': get_user_bank_account
    }
    
    return render(request, 'new/customer_account.html', context)

@login_required
def HomePage(request):


    user_address = UserAddress.objects.get(user=request.user)
    get_user_bank_account = UserBankAccount.objects.get(user=request.user)
    get_history = Transaction.objects.filter(account=get_user_bank_account)

    # credit card
    credit_numbers = []
    for i in get_user_bank_account.visa_card_number:
        credit_numbers.append(i)

    context = {
        'account': get_user_bank_account,
        'history': get_history,
        'first': credit_numbers[0:4],
        'second': credit_numbers[4:8],
        'third': credit_numbers[8:12],
        'last': credit_numbers[12:16],
        'address': user_address,
    }
    return render(request, 'new/index.html', context)