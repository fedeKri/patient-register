# patient-register
Patient Registration
Proyecto compuesto por:

Backend (Laravel) en ./backend

Frontend (React) en ./frontend

Base de datos (PostgreSQL)

Orquestado con Docker Compose para un entorno de desarrollo rápido.

Requisitos
Docker

Docker Compose

Puertos libres: 5432 (PostgreSQL), 8000 (Laravel), 5173 (React)

Cómo levantar el entorno
Clona este repositorio:

bash
Copy
git clone <URL_DEL_REPOSITORIO>
cd patient-registration
Inicia los contenedores:

bash
Copy
docker-compose up --build
Se construirán las imágenes para el backend y el frontend.

Se iniciará la base de datos PostgreSQL.

Accede a la aplicación:

Backend (Laravel): http://localhost:8000

Frontend (React): http://localhost:5173

Notas
La base de datos se encuentra en el contenedor db, con las credenciales definidas en el docker-compose.yml.

Si necesitas reejecutar migraciones o seeds, entra al contenedor Laravel:

bash
Copy
docker exec -it laravel_app bash
php artisan migrate --seed
Si no ves las imágenes, asegúrate de usar la ruta /storage/... en tu navegador.

Para detener los contenedores y limpiar:

bash
Copy
docker-compose down
(agrega la opción -v para eliminar volúmenes y datos de la base de datos).
