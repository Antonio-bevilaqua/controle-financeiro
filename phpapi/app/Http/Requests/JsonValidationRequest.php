<?php

namespace App\Http\Requests;

use App\Http\Responses\Exceptions\ErrorJsonResponse;
use Illuminate\Contracts\Validation\ValidatesWhenResolved;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

abstract class JsonValidationRequest extends Request implements ValidatesWhenResolved
{
    public function authorize(): bool
    {
        return true;
    }

    abstract public function rules(): array;

    public function all($keys = null): array
    {
        if (empty($keys)) {
            return parent::json()->all();
        }

        return collect(parent::json()->all())->only($keys)->toArray();
    }


    public function validateResolved(): void
    {
        $validator = Validator::make($this->all(), $this->rules());

        if ($validator->fails()) {
            throw new ErrorJsonResponse(
                $validator->errors()->toArray(),
                400
            );
        }
    }

}
