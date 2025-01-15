<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            // Idenfitification
            $table->string('application_code')->nullable();
            $table->string('last_name')->nullable();
            $table->string('first_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('tin_number')->nullable();
            $table->string('sss_number')->nullable();
            $table->string('hdmf_number')->nullable();
            $table->string('philhealth_number')->nullable();
            $table->string('license_sbr_number')->nullable();
            $table->date('lesp_expiry_date')->nullable();

            // Personal Data
            $table->string('contact_number')->nullable();
            $table->string('email_address')->nullable();
            $table->string('date_of_birth')->nullable();
            $table->string('place_of_birth')->nullable();
            $table->string('height')->nullable();
            $table->string('weight')->nullable();
            $table->string('gender')->nullable();
            $table->string('religion')->nullable();
            $table->string('is_fully_vaccinated')->nullable();
            $table->string('citizenship')->nullable();
            $table->string('blood_type')->nullable();
            $table->string('hair_color')->nullable();
            $table->string('driver_license_number')->nullable();
            $table->string('distinguishing_mark')->nullable();

            // Present Address
            $table->json('present_address')->nullable();

            // Home Address
            $table->json('home_address')->nullable();

            // Provincial Address
            $table->json('provincial_address')->nullable();

            // Uniform Detail
            $table->json('uniform_detail')->nullable();

            // Educational Background List
            $table->json('educational_background_list')->nullable();

            // Emergency Contact
            $table->json('emergency_contact_list')->nullable();

            // Parents Background
            $table->json('father_detail')->nullable();
            $table->json('mother_detail')->nullable();
            
            // Sibling Detail List
            $table->json('sibling_detail_list')->nullable();

            // Spouse Background
            $table->json('spouse_detail')->nullable();

            // Children Background List
            $table->json('child_detail_list')->nullable();

            // Job Expirience List
            $table->json('job_experience_list')->nullable();

            // Training Seminar List
            $table->json('traning_detail_list')->nullable();

            // Character Reference List
            $table->json('character_reference_list')->nullable();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
