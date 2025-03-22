#!/bin/bash
set -e


php artisan migrate --seed


php artisan queue:work --daemon &


exec php artisan serve --host=0.0.0.0 --port=8000