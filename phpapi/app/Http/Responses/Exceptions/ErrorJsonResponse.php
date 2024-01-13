<?php

namespace App\Http\Responses\Exceptions;

use App\Http\Responses\ResponseGenerator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ErrorJsonResponse extends HttpResponseException
{
    public function __construct(array $errors, int $status = 200)
    {
        parent::__construct(
            ResponseGenerator::make($errors, null, $status, "error")
        );
    }
}
