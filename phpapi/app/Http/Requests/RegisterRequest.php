<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;

class RegisterRequest extends JsonValidationRequest
{

    public function rules(): array
    {
        return [
            'name' => 'required',
            'username' => "required|alpha_num:ascii|unique:users,username",
            'email' => 'required|email|unique:users,email',
            'password' => [
                "required",
                "confirmed",
                Password::min(8)
            ]
        ];
    }
}
