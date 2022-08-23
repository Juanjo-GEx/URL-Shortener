# Acortador de URLs ![Directus](https://img.shields.io/badge/directus-%2364f.svg?style=for-the-badge&logo=directus&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

Creación de una aplicación de pruebas para acortar URLs. 


## Requisitos

- Se usará **Directus** como gestor de contenidos para almacenar los datos. 
- Se usará la API Rest de Directus como sistema de conexión.
- La solicitud para acortar la URL de entrada se realizará mediante **Postman**.
- Al realizar la petición:
    - Se almacenará la URL original
    - Se creará y almacenará la nueva URL acortada (*7 caracteres*) en el registro anteriormente creado
    - Se hará la redirección de la nueva URL a la URL original

## Primero pasos

### Instalación de Directus

Instalar con npm:

```console
npm init directus-project <nombre del directorio de la api>
```

Si da error de instalación instalar el módulo que falta:

```console
npm i @napi-rs/snappy-win32-x64-msvc
```

Durante el proceso de instalación seleccionar la base de datos deseada y las credenciales de administración.

Lanzar la aplicación:

```console
cd <ruta del directorio de la api>
npx directus start
```

Servidor lanzado en: http://localhost:8055

#### Instalación de extensiones

Instalar con npm:

```console
npm init <nombre de la extensión>
```

Se solicitará el tipo de extensión que desearemos crear. Para nuestro proyecto usaremos una extensión de tipo hook.

```console
? Choose the extensión type hook
? Choose a name for the extensión url-shortener
? Choose the language to use javascript
```

Una vez finalizada la instalación se nos habrá creado una carpeta con el nombre indicado. Para empezar a implementar nuestra extensión:

```console
cd <nombre de la extensión>
npm run dev
```

Para llevar nuestra extensión a producción
```console
npm run build
```

**NOTA:** Para que Directus ejecute el código generado, se deberá copiar la carpeta creada y todo su contenido y pegarla en la carpeta hooks del proyecto.

## Casos de uso

1. [**CU-01**] Creación de un nuevo registro en la tabla de la base de datos a través de una petición vía API Rest.
2. [**CU-02**] Creación de un string aleatorio de 7 caracteres para usarlo como URL acortada.
3. [**CU-03**] Actualización del registro creado anteriormente con la nueva URL.
4. [**CU-04**] Solicitud 301 de redirección, con la url acortada

### [CU-01] - Solicitud API Rest 

Solicitud a la API Rest de Directus mediante el método POST usando **Postman**.

Endpoint

```console
http://localhost:8055/items/<nombre de la coleccion>
```

Body en JSON

```console
{"URL": "https://..."}
```

