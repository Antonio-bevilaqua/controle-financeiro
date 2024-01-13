<?php

namespace App\UseCases\Auth\ActivateAccount\Exceptions;

use App\Http\Responses\Exceptions\ErrorJsonResponse;

class UserAlreadyValidatedException extends ErrorJsonResponse
{
    public function __construct()
    {
        parent::__construct(["Este código já foi validado!"]);
    }
}
