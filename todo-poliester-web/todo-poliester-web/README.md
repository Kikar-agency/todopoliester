# Todo Poliéster · sitio web

Sitio de Todo Poliéster (confección textil a medida, Córdoba). Es HTML, CSS y JavaScript sin dependencias ni paso de compilación.

## Estructura

```
index.html          página única (cabecera, contenedor de vistas, pie)
assets/styles.css   estilos
assets/app.js       datos (rubros, productos, telas, trabajos), rutas y vistas
assets/img/         imágenes
```

Las secciones se navegan por hash (`#inicio`, `#productos`, `#cat-exterior`, `#p-futon`, `#a-medida`, `#trabajos`, `#empresas`, `#nosotros`, `#contacto`), así que funciona en cualquier hosting estático sin configurar rutas.

## Ver en local

Abrir `index.html` en el navegador, o levantar un servidor:

```
npx serve .
```

## Publicar en GitHub Pages

1. Crear el repositorio y subir esta carpeta tal cual.
2. En el repositorio: Settings → Pages → Source: "Deploy from a branch", rama `main`, carpeta `/ (root)`.
3. Para el dominio propio: en Settings → Pages → Custom domain cargar el dominio (por ejemplo `todopoliester.com.ar`). GitHub crea el archivo `CNAME`.
4. En NIC Argentina / el DNS del dominio, apuntar a GitHub Pages:
   - Registros A del dominio raíz: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - CNAME de `www` → `<usuario>.github.io`
5. Activar "Enforce HTTPS" cuando esté disponible.

## Cambios frecuentes

- **Temporada y paleta:** al principio de `assets/app.js`, en `CONFIG`.
- **WhatsApp:** constante `WA` en `assets/app.js` (formato `549` + código de área + número).
- **Productos y rubros:** arrays `CATS` y `PRODS` en `assets/app.js`. Cada producto apunta a imágenes por nombre (`imgs: ['futon']` → `assets/img/futon.jpg`). Si no tiene imagen, se muestra "Foto pendiente".
- **Trabajos:** array `TRABAJOS`.
- **Locales y horarios:** vista `V.contacto`, pie de `index.html` y barra superior.

## Pendiente de contenido

- Logo original en buena calidad (hoy `assets/img/logo.png` es un recorte).
- Fotos propias de trabajos y de telas (las actuales son de muestra).
- Fotos de cortinas, toldos y media sombra.
- Listado final de sucursales.

---
Web por Kikar Agency.
