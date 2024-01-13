<?php

namespace App\Http\Controllers;

use App\Http\Responses\ResponseGenerator;
use App\Services\Authentication\Requests\NewPasswordRequest;
use App\Services\Authentication\Requests\ResetPasswordRequest;
use App\UseCases\Auth\ActivateAccount\Exceptions\UserNotFoundException;
use App\UseCases\Auth\ResetPassword\ChangePassword\ChangePassword;
use App\UseCases\Auth\ResetPassword\ChangePassword\ChangePasswordDTO;
use App\UseCases\Auth\ResetPassword\ResetPasswordRequest\ResetPasswordRequest as ResetPasswordRequestUseCase;
use App\UseCases\Auth\ResetPassword\ResetPasswordRequest\ResetPasswordRequestDTO;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class ResetPasswordController
{
    public function request(
        ResetPasswordRequest        $request,
        ResetPasswordRequestUseCase $useCase,
        ResetPasswordRequestDTO     $dto,
    ): JsonResponse
    {
        $email = $request->email ?? null;

        if (!$email) {
            throw new UserNotFoundException();
        }

        $dto->email = $email;
        $useCase->execute($dto);

        return ResponseGenerator::make(
            null,
            "Uma solicitação para criação de nova senha foi enviada ao seu email."
        );
    }

    /**
     * @throws HttpResponseException
     */
    public function changePassword(
        NewPasswordRequest $request,
        ChangePassword     $useCase,
        ChangePasswordDTO  $dto,
    ): JsonResponse
    {
        $password = $request->password ?? null;
        $token = $request->token ?? null;

        if (!$password || !$token) {
            throw new HttpResponseException(
                response()->json("Ops... algo de errado ocorreu")
            );
        }

        $dto->newPassword = $password;
        $dto->resetToken = $token;
        $user = $useCase->execute($dto);

        return ResponseGenerator::make(
            [
                'usuario' => $user->toArray()
            ],
            "Senha alterada com sucesso."
        );
    }
}
