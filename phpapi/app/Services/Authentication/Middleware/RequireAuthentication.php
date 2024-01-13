<?php

namespace App\Services\Authentication\Middleware;

use App\Services\Authentication\TokenAuthentication;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireAuthentication
{
    protected TokenAuthentication $tokenAuthentication;

    public function __construct(TokenAuthentication $tokenAuthentication)
    {
        $this->tokenAuthentication = $tokenAuthentication;
    }

    public function handle(Request $request, Closure $next): Response
    {
        $this->tokenAuthentication->fromRequest($request);

        return $next($request);
    }
}
