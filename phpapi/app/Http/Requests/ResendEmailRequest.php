<?php

namespace App\Http\Requests;

class ResendEmailRequest extends JsonValidationRequest
{
    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:users,email',
        ];
    }
}
