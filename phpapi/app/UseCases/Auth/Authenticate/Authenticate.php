<?php

namespace App\UseCases\Auth\Authenticate;

use App\Services\Authentication\Authentication;

class Authenticate
{
    public function execute(AuthenticateDTO $authenticateDTO): array
    {
        $authenticationService = new Authentication();
        return [
            'token' => $authenticationService->authenticate(
                $authenticateDTO->username,
                $authenticateDTO->password
            ),
            'user' => $authenticationService->getUser()
        ];
    }
}
