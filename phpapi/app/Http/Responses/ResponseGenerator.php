<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;

class ResponseGenerator
{
    public static function make(?array $data = null, ?string $message = null, int $status = 200, string $type = "success"): JsonResponse
    {
        $payload = [
            'type' => $type
        ];
        if ($message !== null) $payload['message'] = $message;
        if ($data !== null) $payload['data'] = $data;
        return response()->json($payload, $status);
    }
}
