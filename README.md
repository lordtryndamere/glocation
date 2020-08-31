# APP GEOLOCATION
## Instalacion de dependencias 

Use el gestor de paquetes npm que se installa al descargar NodeJS [https://nodejs.org/es/]
y ejecute el siguiente  comando 

```bash
npm install 
```
Hay una dependencia con la que funciona la aplicación llamada "@hapi/joi" por favor validar que se encuentre en su versión "^15.0.3"  en caso de tener
algún inconveniente con dicha dependencia ejecutar el siguiente comando:

```bash
npm uninstall --save @hapi/joi
npm install --save @hapi/joi@15.0.3
```


## Uso de la aplicacion

Para correr la aplicación una vez instaladas las dependencias ejecute el siguiente  comando 
 

```bash

npm start
```





## Recomendaciones
crear archivo ".env" con dos variables en caso de querer cambiar la api_key de google o la llave del token : 

TOKEN_SECRET = almacena la llave secreta del token.

API_KEY =  se usa para el consumo de la api de google de geocoding.