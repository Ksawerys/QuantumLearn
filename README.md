# QuantumLearn

## Dominio
http://quantumlearn.net
(Puede que de error ya que tiene un cupo maximo de una persona)

## Despliegue
### Aplicaciones necesarias
Para las carpetas QuantumLearn/Academic_Data_IA_Dispatcher y QuantumLearn/Academic_Data_IA_Performer hará falta crear una cuenta en Uipath e instalar Uipath Studio. En adición hará falta crear queue del Orchestrator especificada en el config de ambos procesos (carpetas). En adición haria falta elazar Uipath con tu cuenta de google y con una Api de OpenAI. 

### Instalación de dependencias
Para la instalación de dependencias en el proyecto, es necesario ejecutar el siguiente comando en la ruta QuantumLearn/BACK/

    npm install

### Configuración del entorno
Para ajustar el **entorno**, hay que configurar el archivo **.env.example**, se elimina '.example' quedando un archivo '.env'. Dentro se encuentran las **descripciones** de todas las **variables de entorno**.

### Ejecución de Migraciones y Seeders
Las migraciones y lo seeders, crean las tablas en la BBDD y las rellenan con datos de prueba.
Para ejecutar ambos script a la vez, ejecutar el comando

    npm run m
Para ejecutar solo las migrations

    npx sequelize-cli db:migrate

# Endpoints
## Explicación JWT
Todas las rutas protegidas, usando JWT, usan la KEY 'x-token' en el header con el valor del token.

The academic organizer that helps you improve.
| | | | | | | | | |
|-|-|-|-|-|-|-|-|-|
|info| |item| | | | | | |
|name|schema|name|item| | | | | |
| | | |name|request| |response| | |
| | | | |method|url|status|code|headers|
| | | | | | | | |Content-Type|
|QuantumLearn|https://schema.getpostman.com/json/collection/v2.1.0/collection.json|File|FileUpload|POST|http://localhost:9090/user/upload/1|OK|200|application/json; charset=utf-8|
| | | |getFile|GET|http://localhost:9090/user/file/1CW4b6t2yHC5dBvep7WOVrfW6MADDlDc_| | | |
| | |IA|GenerateText|GET|http://localhost:9090/openai/generate-text|OK|200|application/json; charset=utf-8|
| | | |EvaluateImage|GET|http://localhost:9090/openai/evaluate-image|OK|200|application/json; charset=utf-8|
| | |Auth|Login|POST|http://localhost:9090/user/login|OK|200|application/json; charset=utf-8|
