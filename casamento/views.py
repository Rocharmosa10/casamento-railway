from django.conf import settings
import json
import os
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from .forms import CasamentoForm

def casamento(request):
    sucesso = False
    form = CasamentoForm(request.POST or None)
    
    if request.method == 'POST' and form.is_valid():
        nome = form.cleaned_data['nome']
        email = form.cleaned_data['email']
        telefone = form.cleaned_data['telefone']
        mensagem = form.cleaned_data['mensagem']
        
        assunto = f"Nova mensagem de {nome}"
        corpo = f"""
        Nome: {nome}
        E-mail: {email}
        Telefone: {telefone}
        
        Mensagem:
        {mensagem}
        """
        
        send_mail(
            assunto,
            corpo,
            settings.EMAIL_HOST_USER,        # remetente
            [settings.DEFAULT_FROM_EMAIL],       # destinatário
            fail_silently=False,
        )
        sucesso = True
        form = CasamentoForm()  # Limpa o formulário após o envio
        
    return render(request, 'casamento.html',{
        'form': form,
        'sucesso': sucesso
    })

@csrf_exempt
def finalizar_presente(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nome = data.get("nome")
        valor = data.get("valor")
        recado = data.get("recado")

        assunto = f"Novo presente: {nome}"
        mensagem = f"""
        Presente: {nome}
        Valor: R$ {valor}
        Recado: {recado}
        """
        send_mail(assunto, mensagem, "ro.charmosa10@gmail.com", ["ro.charmosa10@gmail.com"])

        return JsonResponse({"status": "ok"})
    return JsonResponse({"erro": "método inválido"}, status=400)
