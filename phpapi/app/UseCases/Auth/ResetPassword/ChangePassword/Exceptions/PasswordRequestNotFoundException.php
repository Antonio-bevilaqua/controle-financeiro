<?php

namespace App\UseCases\Auth\ResetPassword\ChangePassword\Exceptions;

use App\Http\Responses\Exceptions\ErrorJsonResponse;

class PasswordRequestNotFoundException extends ErrorJsonResponse
{
    public function __construct()
    {
        parent::__construct([
            'Pedido de recuperação de senha não encontrado!'
        ]);
    }
}
