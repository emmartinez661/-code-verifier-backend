# -code-verifier-backend
Node Express project - backend

##Dependencias instaladas 

#dotenv
El desarrollo con multiples variables de entorno (produccion o desarollo) se vuelve dificil de mantener, por lo tanto es mejor configurar en un solo lugar como un archivo central para toda la aplicacion para eso es la libreria <<dotenv>> el cual permite leer estas variables desde un archivo .<<.env>> para luego cargar las variables de entorno en la varible <<process.env>>

#express
es el framework mas popular de node que entre otras librerias nos proporciona escritura de manejadores de peticiones con distintos verbos HTTP en diferentes urls, integraciones con motores de renderizacion de vistas, entre otras bondades

#typescript
Typescript es un lenguaje creado por microsoft con la intencion de resolver algunos de los problemas que tiene javascript sobre su estructura de programacion, añadiendo mas robustez, facilidad, incluso poder combinar con react, vue, angular, por ejemplo la principal caracteristica es el tipado estatico

#concurrently
es una libreria de desarrollo que permite entre otras cosas ejecutar distintos comandos y scripts al mismo tiempo, asi evitar el tener que abrir una terminal y realizar distintos procesos en cada una 

#EsLint
es una herramienta enfocada en el proceso para limpiar codigo javascript tanto en el servidor como en el navegador 

#Jest
es una libreria creada por Facebook para probar cualquier libreria sobre todo react y Native    

#nodemon 
es una utilidad de linea de comandos que vigila el sistema de archivos y reinicia automaticamente el proceso luego de cada cambio

#Serve 
es un servidor que se puede ejecutar en red para pruebas, sirve para    mostrar los contenidos del directorio y cambiar subcarpetas y compartir sitios estaticos

#supertest
pruebas de HTTP

#webpack
es una paquete de modulos que permite agrupar archivos javascript para usarlos en el navegador, crear paquetes o fragmentosque se cargan de forma asincrona en tiempo de ejecucion 

##scripts

"build": "npx tsc", vamos a generar el typescript el va a buscar el archivo tsconfig.jso y a traves del archivo index.ts va a generar su propio archivo index.js 

"start": "node dist/index.js ", va a ser para ejecutar el codigo transpilado que se ha generado a partir del typescript 

 "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js"

<<npx tsc --watch\>> esto va a servir para que cada vez que se haga algun cambio automaticamente vaya transpilando  y <<nodemon -q dist/index.js>> para que ejecute el index.js que se va a generar en la carpeta dist que configuramos al typescript para que ejecutara 

>>"serve:coverage": "npm run test && cd coverage/lcov-report && npx serve">>
el cual ejecutara el test, luego entrara en la carpeta coverage y luuego ejecutara el servidor para mostrar el reporte 

##variables de entorno que se crearon en el .env
creamos el puerto 8000 