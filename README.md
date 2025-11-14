# Добро рядом — запуск проекта

Проект работает в окружении MAM / \$mol и живёт внутри монорепозитория `mam` по пути `bog/dobro`. Ниже варианты запуска: локально и через Docker/Docker Compose.

## 1. Локальный запуск

### 1.1. Предусловия

- Node.js `>= 18.0.0`
- npm

### 1.2. Установка зависимостей (общая)

Если репозиторий ещё не клонирован:

```bash
git clone https://github.com/hyoo-ru/mam.git
cd mam
```

Установить зависимости один раз в корне:

```bash
npm install
```

### 1.3. Локальный запуск без клонирования `mam`

Если у вас уже есть эта папка проекта с `package.json` (например, вы скачали её архивом и находитесь в её корне):

```bash
npm install
npm exec mam .
```

После запуска откройте в браузере:

```text
http://localhost:9080/bog/dobro/app/-/test.html
```

### 1.4. Локальный запуск после клонирования репозитория `mam`

Если вы клонируете полный репозиторий `mam`:

```bash
git clone https://github.com/hyoo-ru/mam.git
cd mam
npm install
npm start
```

После этого приложение **Добро рядом** также будет доступно по адресу:

```text
http://localhost:9080/bog/dobro/app/-/test.html
```

## 2. Запуск через Docker Compose (рекомендуется)

### 2.1. Сборка и запуск

Из папки проекта `bog/dobro`:

```bash
cd bog/dobro
docker compose up --build
```

или (для старых версий Docker):

```bash
docker-compose up --build
```

Compose использует:

- `bog/dobro/docker-compose.yml`
- `bog/dobro/Dockerfile` для сборки сервиса `dobro`

После запуска приложение доступно по адресу:

```text
http://localhost:9080/bog/dobro/app/-/test.html
```

Остановить:

```bash
docker compose down
```

## 3. Запуск через «чистый» Docker

### 3.1. Сборка Docker-образа

Из корня репозитория `mam` (где лежит `package.json`):

```bash
docker build -f bog/dobro/Dockerfile -t dobro .
```

Это:

- берёт официальный образ `node:20-alpine`
- копирует `package.json` и ставит зависимости (`npm install`)
- копирует исходники репозитория внутрь контейнера
- настраивает команду по умолчанию: `npm exec mam .`

### 3.2. Запуск контейнера

```bash
docker run --rm -p 9080:9080 dobro
```

После старта контейнера приложение будет доступно по тому же адресу:

```text
http://localhost:9080/bog/dobro/app/-/test.html
```

Контейнер можно остановить сочетанием `Ctrl+C` в терминале.

### 3.3. Пример запуска в одну команду

```bash
docker build -f bog/dobro/Dockerfile -t dobro . \
  && docker run --rm -p 9080:9080 dobro
```

## 4. Краткое резюме требований

Также см. файл `bog/dobro/Requierments.txt`:

- Node.js `>= 18.0.0`
- npm
- npm-пакет `mam` (подтягивается через `npm install` из `package.json`)
- Docker (опционально, для контейнерного запуска)
