
FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql zip

COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html


COPY . /var/www/html


RUN composer install


RUN if [ ! -f .env ]; then cp .env.example .env; fi
RUN php artisan key:generate


RUN php artisan storage:link


RUN chown -R www-data:www-data storage/ bootstrap/cache public


COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh


EXPOSE 8000


CMD ["docker-entrypoint.sh"]
