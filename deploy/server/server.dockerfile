FROM python:3.6
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE=backend.settings.production
RUN mkdir /app
WORKDIR /app
COPY backend/requirements.txt /app/
RUN pip install -r requirements.txt
