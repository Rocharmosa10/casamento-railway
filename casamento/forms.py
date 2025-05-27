from django import forms

class CasamentoForm(forms.Form):
    nome = forms.CharField(label='Nome', max_length=50)
    telefone = forms.CharField(label='Telefone', max_length=11)
    email = forms.EmailField(label='Email')
    mensagem = forms.CharField(label='Mensagem', widget=forms.Textarea, max_length=200)