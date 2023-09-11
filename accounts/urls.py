from django.urls import path

from .views import UserRegistrationView, LogoutView, UserLoginView, ProfileView, LoginView, HomePage, LogOutView


app_name = 'accounts'

urlpatterns = [
    # path(
    #     "login/", UserLoginView.as_view(),
    #     name="user_login"
    # ),
    path(
        "logout/", LogOutView,
        name="user_logout"
    ),
    path(
        "register/", UserRegistrationView.as_view(),
        name="user_registration"
    ),

    path('profile/', ProfileView, name="profile"),
    path('login/', LoginView, name="login"),
    path('home/', HomePage, name="home"),
]
