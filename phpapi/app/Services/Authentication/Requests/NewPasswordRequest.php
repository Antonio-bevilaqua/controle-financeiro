<?php

namespace App\Services\Authentication\Requests;

use App\Http\Requests\JsonValidationRequest;
use Illuminate\Validation\Rules\Password;

class NewPasswordRequest extends JsonValidationRequest
{

    public function rules(): array
    {
        return [
            'password' => ["required", "confirmed", Password::min(8)],
            'token' => ["required"]
        ];
    }
}
