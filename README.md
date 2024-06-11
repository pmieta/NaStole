Instrukcj konfiguracji
Wymagania:
- Python
- Node.Js v16 lub wyżej

Utworzenie środowiska wirtualnego do instalacji wymaganych bibliotek
/NaStole$ python -m venv env
/NaStole/backend$ pip install -r "requirements.txt"
W pliku settings.py należy ustawić parametry DATABASE. 
/NaStole/backend$ python manage.py makemigrations
/NaStole/backend$ python manage.py migrate
/NaStole/front$ npm install

Uruchomienie backendu
/NaStole/backend$ python manage.py runserver
Uruchomienie frontendu
/NaStole/front$ npm run dev
