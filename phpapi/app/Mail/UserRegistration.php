<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserRegistration extends Mailable
{
    use Queueable, SerializesModels;

    public string $token;
    public string $link;
    public string $name;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string $name, string $token)
    {
        $this->token = $token;
        $this->name = $name;
        $this->link = env('FRONTEND_URL', '') . "/ativar-conta?token=" . $this->token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): static
    {
        return $this->from(env("MAIL_FROM_ADDRESS", "noreply@localhost.com"), 'Controle Financeiro')
            ->subject("Ativação de Conta")
            ->view('mail.new-account');
    }
}
