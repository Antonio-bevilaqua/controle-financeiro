<?php

namespace App\Providers;

use App\Services\Authentication\TokenAuthentication;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(TokenAuthentication::class, static function ($app) {
            return new TokenAuthentication();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
