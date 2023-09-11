from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.Register, name='coapp-register'),
    path('register/success/', views.RegisterSuccess, name='register-success'),
    path('', views.HomePage, name='coapp-home'),
    path('about-us/', views.AboutUs, name='coapp-about-us'),
    path('private-banking/', views.PrivateBanking, name='coapp-private-banking'),
    path('commercial-banking/', views.CommercialBanking, name='coapp-commercial-banking'),
    path('cards-/', views.Cards, name='coapp-cards'),
    path('digital-assets-banking/', views.DigitalAssetsBanking, name='coapp-digital-assets-banking'),
    path('trade-finance/', views.TradeFinance, name='coapp-trade-finance'),
    path('frequently-asked-questions/', views.Faq, name='coapp-faq'),
    path('contact/', views.Contact, name='coapp-contact'),
    path('login/', views.Login, name='coapp-login'),
    path('legal-information/', views.LegalInformation, name='coapp-legal-information'),
]