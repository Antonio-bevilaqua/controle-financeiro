<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class QueueListener extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workers:listener';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Roda o artisan eternamente';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        set_time_limit(0);

        while (true) {
            $this->call("queue:work");
            sleep(20);
        }
    }
}
