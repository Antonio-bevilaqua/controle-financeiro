<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordRecovery extends Mailable
{
    use Queueable, SerializesModels;

    public string $token;
    public string $name;

    public string $link;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string $name, string $token)
    {
        $this->name = $name;
        $this->token = $token;
        $this->link = env('FRONTEND_URL', '') . "/recuperar-conta?token=" . $this->token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): static
    {
        return $this->from(env("MAIL_FROM_ADDRESS", "noreply@localhost.com"), 'Controle Financeiro')
            ->subject("Recuperação De Conta")
            ->view('mail.password-recovery');
    }
}
