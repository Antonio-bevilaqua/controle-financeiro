<?php

namespace App\UseCases\Auth\CreateAccount;

class CreateAccountDTO
{
    public string $name;
    public string $username;
    public string $email;
    public string $password;
}
