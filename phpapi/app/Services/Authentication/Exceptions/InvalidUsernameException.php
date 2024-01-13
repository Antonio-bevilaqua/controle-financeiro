<?php

namespace App\Services\Authentication\Exceptions;

use App\Http\Responses\Exceptions\ErrorJsonResponse;

class InvalidUsernameException extends ErrorJsonResponse
{
    public function __construct()
    {
        parent::__construct(["invalid_user" => "Usuário inválido"], 400);
    }
}
