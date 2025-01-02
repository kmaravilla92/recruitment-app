<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $step = $this->route('step');

        $rules = [
            '1' => [
                'first_name' => 'required',
                'middle_name' => 'required',
                'last_name' => 'required',
                'tin_number' => 'required',
                'sss_number' => 'required',
                'hdmf_number' => 'required',
                'philhealth_number' => 'required',
                'license_sbr_number' => 'required',
                'lesp_expiry_date' => 'required',
            ],
            '2' => [
                'first_name' => 'required',
            ],
        ];

        return $rules[$step];
    }

    public function attributes(): array
    {
        $step = $this->route('step');
        $step_rules = $this->rules();
        $attributes = [];
        foreach ($step_rules as $key => $rules) {
            $new_key = str_replace($step . '.', '', $key);
            $attributes[$new_key] = $new_key;
        }
        return $attributes;
    }

    public function messages(): array
    {
        return [
            'required' => 'This field is required.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $input = $this->input($this->route('step'));
        $this->replace($input);
    }

    protected function applyStep(int $step = 1, $step_rules = []): array
    {
        $new_step_rules = [];
        foreach ($step_rules as $key => $rules) {
            $new_step_rules[$step . '.' . $key] = $rules;
        }
        return $new_step_rules;
    }
}
