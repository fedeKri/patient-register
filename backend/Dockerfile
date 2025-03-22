# Usa una imagen oficial de PHP con extensiones necesarias
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


RUN php artisan key:generate

# Crea el enlace simbólico
RUN php artisan storage:link

# Ajusta permisos
RUN chown -R www-data:www-data storage/ bootstrap/cache public


# Copia el entrypoint al contenedor
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expone el puerto 8000 por si usas "php artisan serve"
EXPOSE 8000

# Usa el script de entrypoint como comando por defecto
CMD ["docker-entrypoint.sh"]
