from django.urls import path
from . import views

urlpatterns = [
    path('', views.CardView, name='card'),
]