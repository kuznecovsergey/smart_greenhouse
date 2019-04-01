#Список команд

## Первые шаги
Выполнить следующие действия:
* открыть консоль в папке проекта.
* установить pip3, если он изначально не установлен:
	sudo apt install python3-pip
* установить требуемые библиотеки для запуска проекта:
	python3 -m pip install -r requirements.txt

## Работа с базой данных 
Для запуска проекта необходмо выполнить следующие действия:
* установить postgresql: 
	sudo apt-get install postgresql
* выполнить команду: 
	sudo -i -u postgres
* запустить клиент psql:
	psql
* создать пользователя vlad:
	CREATE ROLE vlad LOGIN PASSWORD 'vlad';
* создать базу данных maindb:
	CREATE DATABASE maindb WITH OWNER = vlad;
* посмотреть список баз данных (если интересно):
	\l
* для выхода из режима просмотра нажать:
	q
* подключиться к созданной базе данных:
	\connect maindb
* посмотреть список баз данных (если интересно):
	\dt
* открыть новый терминал в папке проекта.

* выполнить команды из раздела "Создание таблиц в базе данных".
* не закрывать терминал!

## Создание таблиц в базе данных
В открытом терминале выполнить команды:
* зафиксировать первоначальное состояние базы данных (выполняется один раз):
	python manage.py db init
* выполнить миграцию бд:
	python manage.py db migrate
* примененить изменения:
	python manage.py db upgrade
## Запуск проекта
* выполнить команду:
	python3 main.py
* зайти в браузере по адресу:
	http://127.0.0.1:5000/
* вернуться в терминал из раздела "Работа с базой данных".
* посмотреть содержимое таблицы measurement:
	select * from measurement;

# НЕ ВЫПОЛНЯТЬ последующие пункты!
## Работа с виртуальным окружением (Windows):

Создание виртуального окружения: py -3 -m venv venv
Активация виртуального окружения: venv\Scripts\activate
Создание файла с требуемыми библиотеками: pip freeze > requirements.txt
Установка библиотек по файлу: pip install -r requirements.txt

## Запуск сервера flask (Windows): 
p
set FLASK_APP=имя_файла
flask run

