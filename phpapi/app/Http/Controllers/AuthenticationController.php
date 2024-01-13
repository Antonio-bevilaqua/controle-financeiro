<?php

namespace App\Http\Controllers;

use App\Http\Responses\ResponseGenerator;
use App\Services\Authentication\Exceptions\IncorrectPasswordException;
use App\Services\Authentication\Exceptions\InvalidUsernameException;
use App\Services\Authentication\Requests\AuthenticationRequest;
use App\UseCases\Auth\Authenticate\Authenticate;
use App\UseCases\Auth\Authenticate\AuthenticateDTO;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class AuthenticationController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function authenticate(AuthenticationRequest $request, Authenticate $useCase): JsonResponse
    {
        $userName = $request->username ?? null;
        $password = $request->password ?? null;

        if (!$userName) {
            throw new InvalidUsernameException();
        }

        if (!$password) {
            throw new IncorrectPasswordException();
        }

        $dto = new AuthenticateDTO();
        $dto->username = $userName;
        $dto->password = $password;
        $data = $useCase->execute($dto);

        return ResponseGenerator::make([
            'user' => $data['user'],
            'token' => $data['token']
        ]);
    }
}
