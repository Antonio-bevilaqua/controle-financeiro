<?php

namespace App\Services\Authentication;

use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use stdClass;

class TokenManager
{
    public static function generate(User $user): string
    {
        return JWT::encode(
            [
                'id' => $user->id,
            ],
            env('JWT_KEY'),
            env('JWT_ALGO')
        );
    }

    public static function decode(string $token): stdClass
    {
        $key = new Key(
            env('JWT_KEY'),
            env('JWT_ALGO')
        );
        return JWT::decode(
            $token,
            $key
        );
    }
}
