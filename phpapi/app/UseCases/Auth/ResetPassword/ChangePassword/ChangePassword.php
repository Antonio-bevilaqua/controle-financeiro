<?php

namespace App\UseCases\Auth\ResetPassword\ChangePassword;

use App\Models\User;
use App\UseCases\Auth\ResetPassword\ChangePassword\Exceptions\PasswordRequestNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ChangePassword
{
    public function execute(ChangePasswordDTO $changePasswordDTO): User
    {
        $resetRequest = DB::table('password_reset_tokens')
            ->where(
                'token',
                $changePasswordDTO->resetToken
            )->first();

        if (!$resetRequest) {
            throw new PasswordRequestNotFoundException();
        }

        $user = User::where('email', $resetRequest->email)->first();
        if (!$user) {
            throw new PasswordRequestNotFoundException();
        }

        $user->password = Hash::make($changePasswordDTO->newPassword);
        $user->save();

        return $user;
    }
}
