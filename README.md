# Acortador de URLs ![Directus](https://img.shields.io/badge/directus-%2364f.svg?style=for-the-badge&logo=directus&logoColor=white) 

Creación de una aplicación de pruebas para acortar URLs. 


## Requisitos

- Se usará **Directus** como gestor de contenidos para almacenar los datos. 
- Se usará la API Rest de Directus como sistema de conexión.
- La solicitud para acortar la URL de entrada se realizará mediante **Postman**.
- Al realizar la petición:
    - Se almacenará la URL original
    - Se creará y almacenará la nueva URL acortada (*7 caracteres*) en el registro anteriormente creado
    - Se hará la redirección de la nueva URL a la URL original