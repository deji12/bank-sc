from django.views.generic import TemplateView


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