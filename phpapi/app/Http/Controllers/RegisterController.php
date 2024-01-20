<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActivateAcccountRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResendEmailRequest;
use App\Http\Responses\ResponseGenerator;
use App\Jobs\SendEmailJob;
use App\Mail\UserRegistration;
use App\Models\User;
use App\UseCases\Auth\ActivateAccount\ActivateAccount;
use App\UseCases\Auth\ActivateAccount\ActivateAccountDTO;
use App\UseCases\Auth\ActivateAccount\Exceptions\UserNotFoundException;
use App\UseCases\Auth\CreateAccount\CreateAccount;
use App\UseCases\Auth\CreateAccount\CreateAccountDTO;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class RegisterController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function register(
        RegisterRequest  $request,
        CreateAccount    $useCase,
        CreateAccountDTO $dto,
    ): JsonResponse
    {
        $dto->name = $request->name ?? '';
        $dto->username = $request->username ?? '';
        $dto->email = $request->email ?? '';
        $dto->password = $request->password ?? '';

        $user = $useCase->execute($dto);

        return ResponseGenerator::make([
            'user' => $user
        ]);
    }

    public function activateAccount(
        ActivateAcccountRequest $request,
        ActivateAccount         $useCase,
        ActivateAccountDTO      $activateAccountDTO,
    ): JsonResponse
    {
        $activateAccountDTO->email_verification_token = $request->token ?? "";
        $useCase->execute($activateAccountDTO);
        return ResponseGenerator::make([
            'user' => $useCase->user,
        ], "Usuário ativado com sucesso!");
    }

    public function resendEmail(ResendEmailRequest $request): JsonResponse
    {
        $email = $request->email ?? '';

        $user = User::where('email', $email)->first();
        if (!$user) {
            throw new UserNotFoundException();
        }

        SendEmailJob::dispatch(
            new UserRegistration($user->name, $user->email_verification_token),
            $user->email
        );

        return ResponseGenerator::make([
            'user' => $user
        ]);
    }
}
