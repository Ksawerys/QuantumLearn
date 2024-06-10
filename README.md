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
Algunos servicios que usan api podrán dar fallo ya que requieren una clave especial o requieren una recarga de dinero

### Ejecución de Migraciones y Seeders
Para ejecutar las migaciones en el back usa el comando:
    npx sequelize-cli db:migrate
Para ejecutar los seeders en el back usa el comando:
    npx sequelize-cli db:seed:all
