@component('mail::message')
# ¡Hola, {{ $patient->full_name }}!

Tu registro se completó exitosamente.

@component('mail::button', ['url' => 'https://example.com'])
Ver Detalles
@endcomponent

¡Gracias por registrarte!

Saludos,<br>
{{ config('app.name') }}
@endcomponent