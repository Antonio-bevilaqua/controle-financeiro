<?php

namespace App\UseCases\Auth\CreateAccount;

use App\Jobs\SendEmailJob;
use App\Mail\UserRegistration;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CreateAccount
{
    public function execute(CreateAccountDTO $accountDTO): User
    {
        $verificationToken = Str::uuid();
        $user = User::create([
            'name' => $accountDTO->name,
            'username' => $accountDTO->username,
            'email' => $accountDTO->email,
            'password' => Hash::make($accountDTO->password),
            'email_verification_token' => $verificationToken
        ]);

        SendEmailJob::dispatch(
            new UserRegistration($user->name, $verificationToken),
            $user->email
        );

        return $user;
    }
}
