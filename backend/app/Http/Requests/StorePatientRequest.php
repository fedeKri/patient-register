<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StorePatientRequest extends FormRequest
{
    public function authorize()
    {
        return true; // or your authorization logic
    }

    public function rules()
    {
        return [
            'full_name' => ['required','regex:/^[a-zA-Z\s]+$/'],
            'email' => ['required','email','unique:patients,email','regex:/@gmail\.com$/'],
            'phone_country_code' => ['required'],
            'phone_number' => ['required','numeric'],
            'document_photo' => ['required','file','mimes:jpg','max:2048']
        ];
    }

    public function messages()
    {
        return [
            'full_name.required' => 'The full name is required.',
            'full_name.regex' => 'The full name may only contain letters and spaces.',

            'email.required' => 'The email field is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'This email already exists.',
            'email.regex' => 'The email must end with @gmail.com.',

            'phone_country_code.required' => 'The phone country code is required.',
            'phone_number.required' => 'The phone number is required.',
            'phone_number.numeric' => 'The phone number must be numeric.',

            'document_photo.required' => 'The document photo is required.',
            'document_photo.file' => 'You must upload a valid file.',
            'document_photo.mimes' => 'The document must have a .jpg extension.',
            'document_photo.max' => 'The document cannot exceed 2MB.',
        ];
    }

    /**
     * Override the failedValidation method to return JSON instead of HTML/redirection.
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422)
        );
    }
}
