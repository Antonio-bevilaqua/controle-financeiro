<?php

namespace App\UseCases\Auth\ResetPassword\ResetPasswordRequest;

use App\Jobs\SendEmailJob;
use App\Mail\PasswordRecovery;
use App\Models\User;
use App\UseCases\Auth\ActivateAccount\Exceptions\UserNotFoundException;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ResetPasswordRequest
{
    public function execute(ResetPasswordRequestDTO $dto): void
    {
        $user = User::where('email', $dto->email)->first();
        if (!$user) {
            throw new UserNotFoundException();
        }

        $token = Str::uuid();
        DB::table('password_reset_tokens')
            ->where('email', $dto->email)
            ->delete();


        DB::table('password_reset_tokens')->insert([
            'email' => $user->email,
            'token' => $token,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        SendEmailJob::dispatch(
            new PasswordRecovery($user->name, $token),
            $user->email
        );
    }
}
