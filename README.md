![screenshot](./assets/gitImage/gitImage.png)

# Proyecto: API para Red Social de Enlaces Personales - Backend

Este proyecto es la API backend de una aplicación web donde cada usuario puede crear y personalizar su propia página, añadiendo enlaces a sus redes sociales, sitios web personales o cualquier otro enlace que desee compartir. El backend gestiona la autenticación, la base de datos y la lógica de negocio de la aplicación.

## Características

- **Autenticación de usuarios**: Gestión segura de registros e inicio de sesión.
- **CRUD de enlaces**: Los usuarios pueden crear, leer, actualizar y eliminar sus enlaces.
- **Gestión de perfiles**: API para la gestión de los perfiles de usuario y sus configuraciones.
- **Base de datos segura**: Almacenamiento de datos de manera eficiente y segura.

## Tecnologías utilizadas

- **Node.js**: Plataforma de ejecución para el servidor.
- **Express**: Framework para la creación de la API RESTful.
- **JWT**: Para la autenticación y gestión de sesiones.
- **SQLite con Turso**: Base de datos ligera y eficiente para el almacenamiento de datos.

## Estado del proyecto
Este proyecto está actualmente en desarrollo. Se están implementando nuevas características y corrigiendo errores.

## Notas
Existen aplicaciones similares ya en el mercado, como Linktree, que ofrecen funcionalidades parecidas. Este proyecto es un ejercicio educativo y no tiene fines comerciales.

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/pabloconejos/mylinks_back.git
2. **Navega al directorio del proyecto:**
    ```bash
    cd mylinks_back
3. **Instala las dependencias:**
    ```bash
    npm install
4. **Configura las variables de entorno en config.js:**
    ```bash
    export const {
      _PORT = 3000,
      _SALT_ROUNDS = 10,
      _SECRET_JWT_KEY = '', // JWT KEY
      _AUTHTOKEN = '', // TURSO AUTHTOKEM
      _URI = '' // DATABASE URI
    } = process.env
    
5. **Ejecuta el servidor en modo de desarrollo:**
   ```bash
   npm run dev

6. **Construlle la base de datos**
   ```sql
   CREATE TABLE
     users (
       id TEXT PRIMARY KEY,
       username TEXT UNIQUE NOT NULL,
       mail TEXT UNIQUE NOT NULL,
       password TEXT NOT NULL,
       creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );

   CREATE TABLE
     linkspage (
       id TEXT PRIMARY KEY,
       user_id TEXT UNIQUE NOT NULL,
       title TEXT NOT NULL,
       description TEXT,
       likes NUMBER DEFAULT 0,
       background_emoji TEXT,
       background_color TEXT DEFAULT '#ffffff',
       background_html_id INTEGER,
       bg_mode INTEGER DEFAULT 2,
       FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
       FOREIGN KEY (bg_mode) REFERENCES bg_modes (id),
       FOREIGN KEY (background_html_id) REFERENCES html_bg (id)
     );
   
   CREATE TABLE links (
       id TEXT PRIMARY KEY,
       user_id TEXT NOT NULL,
       page_id TEXT NOT NULL,
       url TEXT NOT NULL,
       title TEXT NOT NULL,
       description TEXT,
       image_id INTEGER,
       creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (page_id) REFERENCES linkspage (id) ON DELETE CASCADE,
       FOREIGN KEY (image_id) REFERENCES links_images (id)
   );
   
   CREATE TABLE
     links_images (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT,
       url TEXT
     );
   
   INSERT INTO
     links_images (name, url)
   VALUES
     (
       'facebbok',
       'https://my-links-bucket.s3.eu-north-1.amazonaws.com/links-images/facebook_logo.png'
     ),
     (
       'github',
       'https://my-links-bucket.s3.eu-north-1.amazonaws.com/links-images/github_logo.png'
     ),
     (
       'instagram',
       'https://my-links-bucket.s3.eu-north-1.amazonaws.com/links-images/ig_logo.png'
     ),
     (
       'whatsapp',
       'https://my-links-bucket.s3.eu-north-1.amazonaws.com/links-images/whatsapp_logo.png'
     ),
     (
       'youtube',
       'https://my-links-bucket.s3.eu-north-1.amazonaws.com/links-images/yt_logo.png'
     );
   
   
   CREATE TABLE
     html_bg (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       css_real_bg TEXT,
       css_viewer_bg
     );
   
   INSERT INTO
     html_bg (css_real_bg, css_viewer_bg)
   VALUES
     (
       'absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]',
       'absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'
     ),
     (
       'absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]',
       'absolute inset-0 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]'
     ),
     (
       'absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]',
       'absolute top-0 h-full w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'
     ),
     (
       'absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]',
       'absolute top-0 h-full w-full rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]'
     );
   
   CREATE TABLE
     bg_modes (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT);
   
   INSERT INTO
     bg_modes (type)
   VALUES
     ("color"),
     ("css”);
   
   ALTER TABLE linkspage
   ADD COLUMN mainColor TEXT DEFAULT '#fffff';
   
   ALTER TABLE linkspage
   ADD COLUMN secondaryColor TEXT DEFAULT '#fffff';

## Cómo Colaborar

1. **Clona el Repositorio**

   Clona el repositorio del backend usando los siguientes comandos:

   ```bash
   git clone https://github.com/pabloconejos/mylinks_back.git
   
2. **Instala las Dependencias**

    Navega a la carpeta del backend e instala las dependencias necesarias con:
  
    ```bash
    cd mylinks_bakcend
    npm install

3. **Configura el Fronted**

    Asegúrate de seguir las instrucciones específicas del frontend para su configuración, como la creación de variables de entorno o la configuración de la base de datos.
    ```bash
    https://github.com/pabloconejos/mylinks

## Contribuye con Cambios

Para contribuir al proyecto, sigue estos pasos:

1. **Crea una rama para tus cambios:**

   ```bash
   git checkout -b mi-rama
   
2. **Realiza tus modificaciones y haz commit:**

    ```bash
    git commit -am 'Descripción de los cambios'
3. **Envía tus cambios a GitHub:**

    ```bash
    git push origin mi-rama
    
4. **Abre un pull request para revisar tus cambios.**
