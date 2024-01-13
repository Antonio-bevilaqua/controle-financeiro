<?php

namespace App\UseCases\Auth\ActivateAccount;

use App\Models\User;
use App\UseCases\Auth\ActivateAccount\Exceptions\UserAlreadyValidatedException;
use App\UseCases\Auth\ActivateAccount\Exceptions\UserNotFoundException;
use Carbon\Carbon;

class ActivateAccount
{
    public function execute(ActivateAccountDTO $accountDTO): void
    {
        $user = User::where(
            'email_verification_token',
            $accountDTO->email_verification_token
        )->first();

        if (!$user) {
            throw new UserNotFoundException();
        }

        if ($user->email_verified_at !== null) {
            throw new UserAlreadyValidatedException();
        }

        $user->email_verified_at = Carbon::now()->format('Y-m-d H:i:s');
        $user->save();
    }
}
