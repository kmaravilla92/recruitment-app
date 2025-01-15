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

        $address_rules = [
            'house_number',
            'street',
            'barangay',
            'city',
            'province',
            'region',
        ];

        $educational_background_rules = [
            'educational_status',
            'school',
            'period_covered',
            'degree_course',
        ];

        $emergency_contact_rules = [
            'name',
            'address',
            'relation',
            'contact_number',
        ];

        $default_human_info_rules = [
            'full_name',
            'birthday',
        ];

        $default_working_human_info_rules = [
            ...$default_human_info_rules,
            ...['occupation',],
        ];

        $default_non_working_human_info_rules = [
            ...$default_human_info_rules,
            ...['contact_number',],
        ];

        $parent_rules = $default_working_human_info_rules;

        $sibling_rules = $default_non_working_human_info_rules;

        $spouse_rules = $default_working_human_info_rules;

        $child_rules = $default_non_working_human_info_rules;

        $job_rules = [
            'company',
            'employment_period',
            'reason_for_leaving',
            'position',
        ];

        $training_rules = [
            'trainings_seminars',
            'duration',
            'total_hours',
            'venue',
            'facilitator',
        ];

        $character_reference_rules = [
            'full_name',
            'occupation',
            'company',
            'contact_number',
        ];

        $rules_groups = [
            // Identification
            1 => [
                'first_name',
                'middle_name',
                'last_name',
                'tin_number',
                'sss_number',
                'hdmf_number',
                'philhealth_number',
                'license_sbr_number',
                'lesp_expiry_date',
            ],
            // Personal Data
            2 => [
                'contact_number',
                'email_address',
                'date_of_birth',
                'place_of_birth',
                'height',
                'weight',
                'gender',
                'religion',
                'fully_vaccinated',
                'citizenship',
                'blood_type',
                'hair_color',
                'driver_license_number',
                'distinguishing_mark',
            ],
            // Present Address
            3 => $address_rules,
            // Home Address
            4 => $address_rules,
            // Provincial Address
            5 => $address_rules,
            // Uniform Detail
            6 => [
                'shoe_size',
                'waistline',
                'polo_shirt_size',
                'pershing_cap_size',
                'type_a_uniform_size',
            ],
            // Educational Background
            7 => [
                'primary' => $educational_background_rules,
                'secondary' => $educational_background_rules,
                'vocational' => $educational_background_rules,
                'tertiary' => $educational_background_rules,
            ],
            // Emergency Contacts
            8 => $emergency_contact_rules,
            9 => [
                'father_detail' => $parent_rules,
                'mother_detail' => $parent_rules,
            ],
            10 => $sibling_rules,
            // // Spouse Information
            11 => [
                'spouse_detail' => $spouse_rules
            ],
            // // Children Information
            12 => $child_rules,
            // // Job Experiences
            13 => $job_rules,
            // // Trainings
            14 => $training_rules,
            15 => $character_reference_rules,
        ];

        // Add default required to all
        foreach ($rules_groups as $rules_step => $rules) {
            if (in_array($rules_step, [7, 9, 11])) {
                foreach ($rules as $group_key => $group_rules) {
                    foreach ($group_rules as $j => $field_key) {
                        $rules_groups[$rules_step][$group_key . '.' . $field_key] = 'required';
                        unset($rules_groups[$rules_step][$group_key]);
                    }
                }
            } else if (in_array($rules_step, [8, 10, 12, 13, 14, 15])) {
                foreach ($this->input() as $i => $values) {
                    foreach ($rules as $j => $field_key) {
                        $rules_groups[$rules_step][$i . '.' . $field_key] = 'required';
                        unset($rules_groups[$rules_step][$j]);
                    }
                }
            } else {
                foreach ($rules as $i => $field_key) {
                    $rules_groups[$rules_step][$field_key] = 'required';
                    unset($rules_groups[$rules_step][$i]);
                }
            }
        }

        foreach ($rules_groups[$step] as $field => $rules) {
            if (str_contains($field, 'email')) {
                $rules_groups[$step][$field] .= '|email';
            }
        }

        // dd($this->input(), $rules_groups[$step]);

        return $rules_groups[$step];
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
        $step = $this->route('step');
        if (in_array($step, [3, 4, 5, 6, 7, 8, 10, 12, 13, 14, 15])) {
            $map = [
                3 => 'present_address',
                4 => 'home_address',
                5 => 'provincial_address',
                6 => 'uniform_detail',
                7 => 'educational_background_list',
                8 => 'emergency_contact_list',
                10 => 'sibling_detail_list',
                12 => 'child_detail_list',
                13 => 'job_experience_list',
                14 => 'training_detail_list',
                15 => 'character_reference_list',
            ];
            $this->replace($this->input($step . '.' . $map[$step]));
        } else {
            $this->replace($this->input($step));
        }
        // dd($this->input());
    }

    protected function passedValidation(): void
    {
        $step = $this->route('step');
        if (in_array($step, [3, 4, 5, 6, 7, 8, 10, 12, 13, 14, 15])) {
            $map = [
                3 => 'present_address',
                4 => 'home_address',
                5 => 'provincial_address',
                6 => 'uniform_detail',
                7 => 'educational_background_list',
                8 => 'emergency_contact_list',
                10 => 'sibling_detail_list',
                12 => 'child_detail_list',
                13 => 'job_experience_list',
                14 => 'training_detail_list',
                15 => 'character_reference_list',
            ];
            $this->replace([$map[$step] => $this->input()]);
        }
        // dd($this->input());
    }
}
