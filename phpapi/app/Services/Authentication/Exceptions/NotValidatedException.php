<?php

namespace App\Services\Authentication\Exceptions;

use App\Http\Responses\Exceptions\ErrorJsonResponse;

class NotValidatedException extends ErrorJsonResponse
{
    public function __construct()
    {
        parent::__construct(["not_validated" => "Sua conta ainda não está confirmada, verifique seu email!"], 403);
    }
}
