<?php

namespace App\Services\Authentication\Requests;

use App\Http\Requests\JsonValidationRequest;
use Illuminate\Validation\Rules\Password;

class AuthenticationRequest extends JsonValidationRequest
{
    public function rules(): array
    {
        return [
            'username' => "required|alpha_num:ascii",
            'password' => ["required", Password::min(8)],
        ];
    }
}
