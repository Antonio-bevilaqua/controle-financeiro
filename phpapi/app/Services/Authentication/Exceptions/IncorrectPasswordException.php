<?php

namespace App\Services\Authentication\Exceptions;

use App\Http\Responses\Exceptions\ErrorJsonResponse;

class IncorrectPasswordException extends ErrorJsonResponse
{
    public function __construct()
    {
        parent::__construct(["incorrect_password" => "Senha incorreta!"], 400);
    }
}
