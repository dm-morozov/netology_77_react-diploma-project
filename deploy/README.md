# Bosa Noga API на VPS

Frontend остаётся на GitHub Pages; API доступен по `https://bosa-api.mu56.ru/api`.

На сервере проект находится в `/srv/projects/bosa-noga`. Это отдельный Compose-проект, не связанный с контейнерами других сайтов. Node.js 24, контейнер без root, read-only файловая система, лимит памяти 128 МБ. Порт `127.0.0.1:18082` доступен только локально; публичный доступ — через HTTPS Nginx. Случайные задержки и ошибки выключены.

## Запуск и проверка

```sh
docker compose -f deploy/compose.yml config --quiet
docker compose -f deploy/compose.yml up -d --build
docker compose -f deploy/compose.yml ps
docker compose -f deploy/compose.yml exec api node --test src/server.test.mjs
curl -f https://bosa-api.mu56.ru/api/categories
```

DNS A-запись поддомена указывает на VPS. HTTP-конфигурация `bosa-http.conf` сохраняет ACME webroot `/var/lib/letsencrypt`; сертификат получен Certbot с автоматическим обновлением. `bosa-https.conf` проксирует только `/api/`, ограничивает размер запросов и их частоту. Конфигурацию проверять `nginx -t` перед reload. Другие виртуальные хосты не изменять.

## Frontend

`.env.production` задаёт новый API URL. Push в `main` запускает существующий GitHub Actions workflow с lint, сборкой и публикацией Pages.

## Откат

Для переключения frontend обратно на старый Render API восстановить в `.env.production` адрес `https://netology-77-react-diploma-project.onrender.com/api` и повторно опубликовать Pages. Старый Render-сервис при переносе не удалён. До настройки нового виртуального хоста сохранена копия Nginx в `/srv/projects/bosa-noga/backups/20261013-predeploy/nginx.tar.gz`. Не восстанавливать весь архив поверх текущих конфигураций других сайтов: откатывать только изменения Bosa.

Это демонстрационный API: каталог в JSON, заказ не сохраняется и не доставляется продавцу. Никаких ключей и персональных данных для запуска не требуется.
