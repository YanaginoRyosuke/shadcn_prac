up:
	docker compose up -d

build-up:
	docker compose up -d --build
	
django-install:
	docker compose run --rm app-back sh -c "django-admin startproject config ."
	docker compose run --rm app-back sh -c "python manage.py startapp app"

app-back:
	docker compose exec app-back bash

app-front:
	docker compose exec app-front bash

migrate:
	docker compose exec app-back python manage.py migrate

superuser:
	docker compose exec app-back python manage.py createsuperuser