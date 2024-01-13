<?php

namespace App\UseCases\Auth\ResetPassword\ChangePassword;

class ChangePasswordDTO
{
    public string $resetToken;
    public string $newPassword;
}
