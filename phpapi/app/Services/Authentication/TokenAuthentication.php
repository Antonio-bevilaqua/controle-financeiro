<?php

namespace App\Services\Authentication;

use App\Models\User;
use App\Services\Authentication\Exceptions\NotAuthenticatedException;
use Illuminate\Http\Request;

class TokenAuthentication
{
    private ?User $user;
    private ?string $token;

    public function __construct()
    {
        $this->user = null;
        $this->token = null;
    }

    public function fromRequest(Request $request): User
    {
        if (!$request->hasHeader('Authorization')) {
            throw new NotAuthenticatedException();
        }


        return $this->getUserFromToken($request->bearerToken());
    }

    public function getUserFromToken(string $jwtToken): User
    {
        $userData = TokenManager::decode($jwtToken);
        if (!isset($userData->id)) {
            throw new NotAuthenticatedException();
        }

        $user = User::find($userData->id);
        if (!$user) {
            throw new NotAuthenticatedException();
        }

        $this->token = $jwtToken;
        $this->user = $user;
        return $user;
    }

    public function user(): ?User
    {
        return $this->user;
    }

    public function token(): ?string
    {
        return $this->token;
    }
}
