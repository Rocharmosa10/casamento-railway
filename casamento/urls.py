from django.urls import path
from . import views  # Importa o arquivo views.py corretamente


urlpatterns = [
    path('', views.casamento, name="casamento"), # Página principal
    path('finalizar_presente/', views.finalizar_presente, name='finalizar_presente'),
]