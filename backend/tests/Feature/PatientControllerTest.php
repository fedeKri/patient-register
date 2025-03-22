<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Patient;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Notification;
use App\Notifications\PatientRegisteredNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PatientControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function creates_patient_and_sends_notification()
    {
        
        Notification::fake();

        
        $fakeFile = UploadedFile::fake()->image('document.jpg');

        
        $response = $this->postJson('/api/patients', [
            'full_name' => 'Test User',
            'email' => 'testuser@gmail.com',
            'phone_country_code' => '+1',
            'phone_number' => '12345678',
            'document_photo' => $fakeFile,
        ]);

        
        $response->assertStatus(201);

        
        $this->assertDatabaseHas('patients', [
            'full_name' => 'Test User',
            'email' => 'testuser@gmail.com',
        ]);

        $patient = Patient::where('email', 'testuser@gmail.com')->firstOrFail();

        
        Notification::assertSentTo(
            $patient,
            PatientRegisteredNotification::class
        );
    }
}
