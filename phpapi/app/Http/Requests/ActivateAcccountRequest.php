<?php

namespace App\Http\Requests;

class ActivateAcccountRequest extends JsonValidationRequest
{
    public function rules(): array
    {
        return [
            'token' => 'required|string|exists:users,email_verification_token',
        ];
    }
}
