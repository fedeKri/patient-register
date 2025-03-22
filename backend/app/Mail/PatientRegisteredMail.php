<?php

namespace App\Mail;

use App\Models\Patient;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PatientRegisteredMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $patient;

    /**
     * Create a new message instance.
     */
    public function __construct(Patient $patient)
    {
        $this->patient = $patient;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        // Usamos la vista Markdown 'emails.patient-registered'
        // que contiene nuestra sintaxis de @component
        return $this->subject('Paciente registrado')
                    ->markdown('emails.patient-registered');
    }
}