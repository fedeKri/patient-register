<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue; // si quieres encolarlo
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PatientRegisteredNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct()
    {
        
    }

    public function via($notifiable)
    {
        
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        
        return (new MailMessage)
            ->subject('Patient Registered')
            ->line('Hello, your registration was successful!')
            ->action('Go to App', url('/'))
            ->line('Thank you for using our application!');
    }

    // Next: channel SMS
    public function toSms($notifiable)
    {
        
    }
}

