<?php

namespace App\Services\Authentication\Exceptions;

use App\Http\Responses\Exceptions\ErrorJsonResponse;

class NotAuthenticatedException extends ErrorJsonResponse
{
    public function __construct()
    {
        parent::__construct(["not_authenticated" => "Não autenticado!"], 403);
    }
}
