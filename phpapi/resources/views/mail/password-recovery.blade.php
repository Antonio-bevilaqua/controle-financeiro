@extends('mail.template')

@section('heading')
    <h4 style="display:block;margin:auto;width:100%;text-align:center;">Recuperação de Conta</h4>
@endsection

@section('body')
    <div>
        <p>Olá, {{ $name }}.</p>
        <p>Você solicitou a recuperação da sua conta, para prosseguir clique no link a seguir: </p>
        <br />
        <a href="{{ $link }}" style="background: #7367f0 !important;
            border-color: #7367f0 !important;
            padding: 0.786rem 1.5rem;
            border-radius: 0.358rem;
            color: white;
            text-decoration: none;
            margin-bottom: 1rem !important;">Recuperar Conta</a>
        <br />
        <br />
        <span>E-mail gerado de forma automática, por gentileza, não o
                responda.<br/><b>Atenciosamente, Equipe Controle Financeiro.</b></span>
    </div>
@endsection
