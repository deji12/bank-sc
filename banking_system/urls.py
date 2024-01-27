"""banking_system URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

from core.views import *


urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('register/', Register, name='core-register'),
    path('login/', Login, name='core-login'),
    path('products/', ProductsView.as_view(), name='products'),
    path('who-are-we/', WhoAreWeView.as_view(), name='who-are-we'),
    path('faq/', FAQView.as_view(), name='faq'),
    path('seccentral/', SecCentralView.as_view(), name='seccentral'),
    path('newsroom/', newsroomView.as_view(), name='newsroom'),
    path('mileage-saving/',MileageSavingView.as_view(), name='mileage-saving'),
    path('interest-saving/', InterestSavingView.as_view(), name='interest-saving'),
    path('disclosure/', DisclosuresView.as_view(), name='disclosure'),
    path('common-scams/', CommonsScamsView.as_view(), name='common-scams'),
    path('cod/', CertficatesOfDepositView.as_view(), name='cod'),
    path('bonus-miles/', BonusMilesView.as_view(), name='bonus-miles'),
    path('account/', include('accounts.urls', namespace='accounts')),
    path('admin/', admin.site.urls),
    path(
        'transactions/',
        include('transactions.urls', namespace='transactions'),
    ),
    path('cards/', include("CardApp.urls")),
    path('home/', include("HomeApp.urls")),
    path('coriolis/', include("CoApp.urls")),
]
