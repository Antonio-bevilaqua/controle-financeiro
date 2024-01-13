<?php

namespace App\Services\Authentication\Requests;

use App\Http\Requests\JsonValidationRequest;

class ResetPasswordRequest extends JsonValidationRequest
{

    public function rules(): array
    {
        return [
            'email' => 'required|exists:users,email'
        ];
    }
}
