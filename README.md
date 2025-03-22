# Patient Registration

Project composed of:

- **Backend** (Laravel) at `./backend`
- **Frontend** (React) at `./frontend`
- **Database** (PostgreSQL)

Orchestrated with **Docker Compose** for rapid development setup.

## Requirements

- Docker
- Docker Compose
- Available ports: `5432` (PostgreSQL), `8000` (Laravel), `5173` (React)

## Getting Started

**Clone this repository:**

```bash
git clone <REPOSITORY_URL>
cd patient-registration
```

**Start the containers:**

```bash
docker-compose up --build
```

- Images for backend and frontend will be built.
- PostgreSQL database will be started.

## Access the Application

- **Backend (Laravel):** [http://localhost:8000](http://localhost:8000)
- **Frontend (React):** [http://localhost:5173](http://localhost:5173)

## Notes

- The database is located in the `db` container, with credentials defined in `docker-compose.yml`.

- To rerun migrations or seeds, enter the Laravel container:

```bash
docker exec -it laravel_app bash
php artisan migrate --seed
```

- If images are not visible, ensure you're using the `/storage/...` path in your browser.

## Stopping and Cleaning Up Containers

```bash
docker-compose down
```

> Add the `-v` option to remove volumes and database data:

```bash
docker-compose down -v
