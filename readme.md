# My Project

## Description
This is an app to consume information of seismological events from the USGS API.

## Installation
1. Clone the repository.
    To start back-end you need to have Ruby, Rails and SQlite3 installed.
    To start front-end you need to have Node.js >= 18.17.0 installed.
2. Go to back-end folder. 
3. Run `bundle i` to install all gems.
4. Run `rails db:create` to create the database.
5. Run `rails db:migrate` to create the tables.
6. Run `rake obtain_seismological_data:get_data` to get the data from the USGS API.
8. Go to front-end folder.
9. Run `npm i` to install all dependencies.
10. Create a .env file with the following content:
    ```NEXT_PUBLIC_DB_URL=http://localhost:YOUR-DB-PORT```
    or use the default ```http://localhost:3000```

## Usage
To run the project, execute the following command:
```rails s``` in the back-end folder and ```npm run dev``` in the front-end folder.


# Mi Proyecto

## Descripción
Esta es una aplicación para consumir información de eventos sismológicos de la API de USGS.

## Instalación
1. Clonar el repositorio.
    Para iniciar el back-end necesitas tener Ruby, Rails y SQlite3 instalados.
    Para iniciar el front-end necesitas tener Node.js >= 18.17.0 instalado.
2. Ir a la carpeta del back-end.
3. Ejecutar `bundle i` para instalar todas las gemas.
4. Ejecutar `rails db:create` para crear la base de datos.
5. Ejecutar `rails db:migrate` para crear las tablas.
6. Ejecutar `rake obtain_seismological_data:get_data` para obtener los datos de la API de USGS.
8. Ir a la carpeta del front-end.
9. Ejecutar `npm i` para instalar todas las dependencias.
10. Crear un archivo .env con el siguiente contenido:
    ```NEXT_PUBLIC_DB_URL=http://localhost:YOUR-DB-PORT
    o usa el valor por defecto ```http://localhost:3000```

## Uso
Para ejecutar el proyecto, ejecuta el siguiente comando:
```rails s``` en la carpeta del back-end y ```npm run dev``` en la carpeta del front-end.
```
