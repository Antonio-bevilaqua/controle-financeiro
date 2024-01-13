<?php

namespace App\UseCases\Auth\ActivateAccount\Exceptions;

use App\Http\Responses\Exceptions\ErrorJsonResponse;

class UserNotFoundException extends ErrorJsonResponse
{
    public function __construct()
    {
        parent::__construct(["Usuário não encontrado com o código informado!"]);
    }
}

