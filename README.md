# **Proyecto - Clontube (Clon de Youtube)**

## Desarrolladores:
  * Junior Lara

## Enfoque
Este proyecto consta de realizar un replica de la plataforma de streaming Youtube con algunas de sus funcionalidades básicas. Sin embargo, a esta versión se le incluirá un sistema de registro/login antes de poder realizar reprodución de videos.

## Proyecto

### Frontend

Se desarrollará con Vite + ReactJS + TS usando despliegue de GithubPages.

>[!NOTE]
> Para el despliegue en GitHub
> 
> * Instalar gh-pages
> ```sh
> npm install --save-dev gh-pages
> ```
> * Agrega la propiedad base con el nombre de tu repo en `vite.configs.ts`:
> ````python
> import { defineConfig } from 'vite'
> import react from '@vitejs/plugin-react'
> 
> export default defineConfig({
>   base: '/Clontube/', // <-- nombre exacto de tu repo
>   plugins: [react()],
> })
> ````
> * Agrega los script para uso personal
> ````javascript
> // ...existing code...
> "scripts": {
>   // ...existing code...
>   "predeploy": "npm run build",
>   "deploy": "gh-pages -d dist"
> },
> // ...existing code...
> ````
> * Haz el primer build and deploy
> ```sh
> npm run build
> npm run deploy
> ```
> * Configurar permisos de workflows
> <img width="971" height="299" alt="image" src="https://github.com/user-attachments/assets/d9a57965-c16e-4955-8a53-f9c3343e648c" />
>
> * Configurar el workflow para despliegue automatico. Ver [deploy-frontend.yml](https://github.com/JMLTUnderCode/Clontube/blob/main/.github/workflows/deploy-frontend.yml)
> 
> * Usar la rama gh-pages en GitHub Pages
> <img width="978" height="532" alt="image" src="https://github.com/user-attachments/assets/b3121e23-4b35-4816-bc8a-8d9831e835b0" />

> [!IMPORTANT]
> Siguiendo los pasos de la nota anterior se estaria automatizando el proceso de despliegue en github page por cada commit realizado a la rama `main`. Esto a pesar de tener el despliegue bajo la rama `gh-pages`, gracias al `deploy-frontend.yml` que realiza el proceso de push a la rama `gh-pages` del contenido generado por le build (carpeta `dist`).

### Backend

Se desarrollará en Django. En particular para la API se usará Django Rest Framework.
El despliegue será gracias al servicio web gratuito que proporciona Render.

### Base de datos

Se usará una base de datos Postgressql gratuita proporcionara por Render en su versión gratuita.
