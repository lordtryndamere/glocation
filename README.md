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

## Configuracion base de datos 
En la carpeta dbConfig del proyecto se encuentra un fichero llamado db.config , en este archivo se escriben las credenciales de la base de datos a usar ejemplo .

```javascript
{
    HOST:"localhost",
    USER:"user",
    PASSWORD:"password",
    DB:"db",
    dialect:"mysql", 
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}
```

## Recomendaciones
crear archivo ".env" con dos variables en caso de querer cambiar la api_key de google o la llave del token : 

TOKEN_SECRET = almacena la llave secreta del token.

API_KEY =  se usa para el consumo de la api de google de geocoding.


## Uso de la aplicacion

Para correr la aplicación una vez instaladas las dependencias ejecute el siguiente  comando 
 

```bash

npm start
```

## Rutas


**CREAR USUARIO**
----
 Regresa un json con la información del usuario creado.

* **URL**

 API/user/

* **Method:**

  `POST`
  
*  **URL Params**

   none


* **Data Params**

        name 
        email
        contraseña
        direccion
        ciudad
        celular
        role  //SOLO HAY TRES ROLES "comprador" ,"admin_empresa" y "admin"

* **Success Response:**

  * **Code:** 200   
    **Content:** `{
    "id": 3,
    "name": "Kevin Armando",
    "email": "administrador@gmail.com",
    "contraseña": "$2a$10$RT9c9zBbojPO3ZNNiecu6uCf/eOZaC7LSV4IP9d9DFW6AwjOVHmWe",
    "celular": "3202203099",
    "direccion": "calle150a#95-30",
    "ciudad": "Bogota",
    "coordenadas": {
        "lat": 4.7474311,
        "lng": -74.0867677
    },
    "role": "admin",
    "updatedAt": "2020-08-30T18:55:24.514Z",
    "createdAt": "2020-08-30T18:55:24.514Z"
}`

  ERROR

  * **Code:** 401 ERRORDATA

    **Content:** `{ error : "invlid role" }`
 
**Obtener Usuario**
----
  Regresa un json con la información de un solo usuario.

* **URL**

  API/user/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 

     **Content:** `{
    "id": 3,
    "name": "Kevin Armando",
    "email": "administrador@gmail.com",
    "contraseña": "$2a$10$RT9c9zBbojPO3ZNNiecu6uCf/eOZaC7LSV4IP9d9DFW6AwjOVHmWe",
    "celular": "3202203099",
    "direccion": "calle150a#95-30",
    "ciudad": "Bogota",
    "coordenadas": {
        "lat": 4.7474311,
        "lng": -74.0867677
    },
    "role": "admin",
    "updatedAt": "2020-08-30T18:55:24.514Z",
    "createdAt": "2020-08-30T18:55:24.514Z"
}`
 
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 

    **Content:** `{ error : "User not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "Access denied." }`

**Logear usuario**
----
 Regresa un json con la información del usuario logeado y en los headers queda el token 'auth-token' que se debe pasar en todas las peticiones que se hagan a la API.. 

* **URL**

  API/user/login

* **Method:**

  `POST`
  
*  **URL Params**

     none

* **Data Params**

  email
  
  contraseña

* **Success Response:**

  * **Code:** 200 

    **Content:** `{
    "user": [
        {
            "id": 3,
            "name": "Test",
            "email": "administrador@gmail.com",
            "contraseña": "$2a$10$RT9c9zBbojPO3ZNNiecu6uCf/eOZaC7LSV4IP9d9DFW6AwjOVHmWe",
            "celular": 3202203099,
            "direccion": "test",
            "ciudad": "Bogota",
            "coordenadas": "{\"lat\":4.7474311,\"lng\":-74.0867677}",
            "role": "admin",
            "createdAt": "2020-08-30T18:55:24.000Z",
            "updatedAt": "2020-08-30T18:55:24.000Z"
        }
    ],
    "role": "admin"
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 

    **Content:** `{ error : "Email is not found " }` `{ error : "Password is invalidad." }`

 


**Obtener usuarios**
----
  regresa un json con todos los usuarios.

* **URL**

  API/user/

* **Method:**

  `GET`
  
*  **URL Params**
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 

    **Content:** `    {
        "id": 2,
        "name": "test",
        "email": "test@gmail.com",
        "contraseña": "$2a$10$KBu/Z2Wb7pWnKoMpIB9oFuOWObjW23yBgldkSNVH1pOPW1zWL5PIS",
        "celular": 3205151620,
        "direccion": "calle150a#95-30",
        "ciudad": "Bogota",
        "coordenadas": "{\"lat\":4.7474311,\"lng\":-74.0867677}",
        "role": "comprador",
        "createdAt": "2020-08-30T04:26:37.000Z",
        "updatedAt": "2020-08-30T04:26:37.000Z",
        "Empresas": [
            {
                "id": 2,
                "name": "TEST",
                "nit": 11111111,
                "celular": 3202203099,
                "createdAt": "2020-08-30T19:56:10.000Z",
                "updatedAt": "2020-08-30T19:56:10.000Z",
                "UserId": 2
            }
        ]
    },
    {
        "id": 3,
        "name": "test",
        "email": "administrador@gmail.com",
        "contraseña": "$2a$10$RT9c9zBbojPO3ZNNiecu6uCf/eOZaC7LSV4IP9d9DFW6AwjOVHmWe",
        "celular": 3205150624,
        "direccion": "calle150a#95-30",
        "ciudad": "Bogota",
        "coordenadas": "{\"lat\":4.7474311,\"lng\":-74.0867677}",
        "role": "admin",
        "createdAt": "2020-08-30T18:55:24.000Z",
        "updatedAt": "2020-08-30T18:55:24.000Z",
        "Empresas": [
            {
                "id": 3,
                "name": "TEST2",
                "nit": 222222222,
                "celular": 3202203099,
                "createdAt": "2020-08-30T19:56:27.000Z",
                "updatedAt": "2020-08-30T19:56:27.000Z",
                "UserId": 3
            }
        ]
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 

    **Content:** `{ error : "Users not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "acces denied" }`



**CREAR EMPRESA**
----
Regresa un Json con la empresa creada.

* **URL**

  API/empresa/

* **Method:**

  `POST`
  
*  **URL Params**

    

* **Data Params**

  name

  nit 

  celular

  usuario //el administrador de la empresa (usuario creado con rol "admin_empresa")


* **Success Response:**

  * **Code:** 200 

    **Content:** `{
    "id": 5,
    "name": "EMPRESA TEST5",
    "nit": "11111111111",
    "celular": "3202203099",
    "UserId": "3",
    "updatedAt": "2020-08-31T02:23:11.885Z",
    "createdAt": "2020-08-31T02:23:11.885Z"
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 

    **Content:** `{ error : "Business not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED 


    **Content:** `{ error : "access denid" }`


**Obtener una empresa**
----
Regresa un Json con la empresa solicitada.

* **URL**

  API/empresa/:id

* **Method:**

  `GET`
  
*  **URL Params**

    id=integer requerido

* **Data Params**

 None


* **Success Response:**

  * **Code:** 200 

    **Content:** `{
    "id": 5,
    "name": "EMPRESA TEST5",
    "nit": "11111111111",
    "celular": "3202203099",
    "UserId": "3",
    "updatedAt": "2020-08-31T02:23:11.885Z",
    "createdAt": "2020-08-31T02:23:11.885Z"
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


    **Content:** `{ error : "Business not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`



**Obtener todas las empresas**
----
Regresa un json con todas las empresas.

* **URL**

  API/empresa/

* **Method:**

  `GET`
  
*  **URL Params**

    None

* **Data Params**

 None


* **Success Response:**

  * **Code:** 200 

    **Content:** `{
    "id": 5,
    "name": "EMPRESA TEST5",
    "nit": "11111111111",
    "celular": "3202203099",
    "UserId": "3",
    "updatedAt": "2020-08-31T02:23:11.885Z",
    "createdAt": "2020-08-31T02:23:11.885Z"
},
{
    "id": 5,
    "name": "EMPRESA TEST5",
    "nit": "11111111111",
    "celular": "3202203099",
    "UserId": "3",
    "updatedAt": "2020-08-31T02:23:11.885Z",
    "createdAt": "2020-08-31T02:23:11.885Z"
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


    **Content:** `{ error : "Business not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`





**Actualizar una empresa**
----
Regresa un mensaje con el éxito de la actualización de la empresa.

* **URL**

  API/empresa/:id

* **Method:**

  `PUT`
  
*  **URL Params**

    id=integer requerido

* **Data Params**

 None


* **Success Response:**

  * **Code:** 200 


    **Content:** `Businness updated succesfully`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


    **Content:** `{ error : "Cannot updated business with id=${id} .Maybe business was not found or req.body is empty!" }`

  OR

  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`



**Eliminar una empresa**
----
Regresa un mensaje con el éxito de la eliminación de la empresa.

* **URL**

  API/empresa/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

    id=integer requerido

* **Data Params**

 None


* **Success Response:**

  * **Code:** 200 

    **Content:** `Businness deleted succesfully`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 
    **Content:** `{ error : "Cannot deleted business with id=${id}. Maybe business was not found !" }`

  OR

  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "access denied" }`



**Crear categoría **
----
Regresa un Json con la categoría creada.

* **URL**

  API/categoria/

* **Method:**

  `POST`
  
*  **URL Params**

    

* **Data Params**

  nombre

  descripcion


* **Success Response:**

  * **Code:** 200 
    **Content:** `  {
        "id": 1,
        "nombre": "tecnologia",
        "descripcion": "servicios de tecnologia unicamente",
        "createdAt": "2020-08-30T04:40:09.000Z",
        "updatedAt": "2020-08-30T04:40:09.000Z"
    }`
 
* **Error Response:**



  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "access denied" }`



**Obtener categoria **
----
Regresa un json con la categoría solicitada.

* **URL**

  API/categoria/:id

* **Method:**

  `GET`
  
*  **URL Params**

    id= integer required

* **Data Params**

  None


* **Success Response:**

  * **Code:** 200 

    **Content:** `  {
        "id": 1,
        "nombre": "tecnologia",
        "descripcion": "servicios de tecnologia unicamente",
        "createdAt": "2020-08-30T04:40:09.000Z",
        "updatedAt": "2020-08-30T04:40:09.000Z"
    }`
 
* **Error Response:**


   * **Code:** 404 NOT FOUND 
    **Content:** `{ error : "Cannot get category with id=${id}. Maybe business was not found !" }
OR

  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "access denied" }`





**Obtener categorias **
----
Regresa un json con todas las categorías.

* **URL**

  API/categoria/

* **Method:**

  `GET`
  
*  **URL Params**

    None

* **Data Params**

  None


* **Success Response:**

  * **Code:** 200 

    **Content:** `     {
        "id": 1,
        "nombre": "tecnologia",
        "descripcion": "servicios de tecnologia unicamente",
        "createdAt": "2020-08-30T04:40:09.000Z",
        "updatedAt": "2020-08-30T04:40:09.000Z"
    },
    {
        "id": 2,
        "nombre": "medicina",
        "descripcion": "productos relacionados con medicina",
        "createdAt": "2020-08-30T04:40:25.000Z",
        "updatedAt": "2020-08-30T04:40:25.000Z"
    }`
 
* **Error Response:**



  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`
OR

  * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "categories not found" }`




**Actualizar categoría **
----
Regresa mensaje de éxito de la categoría actualizada.

* **URL**

  API/categoria/:id

* **Method:**

  `PUT`
  
*  **URL Params**

    id= integer required

* **Data Params**

  None


* **Success Response:**

  * **Code:** 200 


    **Content:** ` Category updated succesfully`
 
* **Error Response:**


   
   * **Code:** 404 NOT FOUND 
    **Content:** `{ error : "Cannot updated category with id=${id}. Maybe category was not found !" }

OR
  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`



**Eliminar categoría **
----
Regresa mensaje de éxito de la eliminación de la categoría.

* **URL**

  API/categoria/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

    id= integer required

* **Data Params**

  None


* **Success Response:**

  * **Code:** 200 


    **Content:** ` Category deleted succesfully`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 
    **Content:** `{ error : "Cannot deleted category with id=${id}. Maybe category was not found !" }
  OR


  * **Code:** 401 UNAUTHORIZED 

   **Content:** `{ error : "access denied" }`






**Crear factura **
----
Regresa un json con la factura creada.

* **URL**

  API/factura/

* **Method:**

  `POST`
  
*  **URL Params**
   none
    

* **Data Params**

  total

  numerodefactura

  venta // es el id de la venta


* **Success Response:**

  * **Code:** 200 


    **Content:** `  {
        "id": 1,
        "total": 50000,
        "numerodefactura": "11111111",
        "VentaId" 1
        "createdAt": "2020-08-30T04:40:09.000Z",
        "updatedAt": "2020-08-30T04:40:09.000Z"
    }`
 
* **Error Response:**



  * **Code:** 401 UNAUTHORIZED 


    **Content:** `{ error : "access denied" }`





**Obtener factura **
----
Regresa un json con la factura solicitada.

* **URL**

  API/factura/:id

* **Method:**

  `GET`
  
*  **URL Params**
   id = requerido
    

* **Data Params**

None


* **Success Response:**

  * **Code:** 200 

    **Content:** `  {
        "id": 1,
        "total": 50000,
        "numerodefactura": "11111111",
        "VentaId" 1
        "createdAt": "2020-08-30T04:40:09.000Z",
        "updatedAt": "2020-08-30T04:40:09.000Z"
    }`
 
* **Error Response:**



  * **Code:** 401 UNAUTHORIZED


    **Content:** `{ error : "access denied" }`

   Or

   * **Code:** 404 NOT FOUND 
    **Content:** `{ error : "Cannot get facture with id=${id}. Maybe facture was not found !" }



**Obtener facturas **
----
Regresa un json de todas las facturas.

* **URL**

  API/factura/

* **Method:**

  `GET`
  
*  **URL Params**
   
    

* **Data Params**




* **Success Response:**

  * **Code:** 200 

    **Content:** `  {
        "id": 1,
        "total": 50000,
        "numerodefactura": "11111111",
        "VentaId" 1
        "createdAt": "2020-08-30T04:40:09.000Z",
        "updatedAt": "2020-08-30T04:40:09.000Z"
    }`
 
* **Error Response:**



  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`

   Or

  * **Code:** 404 NOT FOUND


    **Content:** `{ error : "factures not found " }`



**Actualizar factura **
----
Regresa mensaje de éxito de la actualización de la factura.

* **URL**

  API/factura/:id

* **Method:**

  `PUT`
  
*  **URL Params**
   id = requerido
    

* **Data Params**

None


* **Success Response:**

  * **Code:** 200 


    **Content:** `Facture updated succesfully`
 
* **Error Response:**



  * **Code:** 401 UNAUTHORIZED 


    **Content:** `{ error : "access denied" }`

   Or

  * **Code:** 404 NOT FOUND

    **Content:** `{ error : "`Cannot updated facture with id=${id} .Maybe facture was not found or req.body is empty!" }`



**Eliminar factura **
----
Regresa mensaje de éxito de la eliminación de la factura.

* **URL**

  API/factura/:id

* **Method:**

  `DELETE`
  
*  **URL Params**
   id = requerido
    

* **Data Params**

None


* **Success Response:**

  * **Code:** 200 

    **Content:** `Facture was deleted succesfully`
 
* **Error Response:**



  * **Code:** 401 UNAUTHORIZED 


    **Content:** `{ error : "access denied" }`

   Or

  * **Code:** 404 NOT FOUND

    **Content:** `{ error : "`Cannot deleted facture with id=${id} .Maybe facture was not found or req.body is empty!" }`







**Crear Inventario**
----
Regresa un json con el inventario creado.

* **URL**

  API/inventario/

* **Method:**

  `POST`
  
*  **URL Params**
   none
    

* **Data Params**

 cantidad
 producto
 puntodeventa


* **Success Response:**

  * **Code:** 200 

    **Content:** `{
        "id": 1,
        "cantidad": 50,
        "createdAt": "2020-08-30T04:45:36.000Z",
        "updatedAt": "2020-08-30T04:45:36.000Z",
        "PuntoVentumId": 1,
        "ProductoId": 3,
        "Producto": {
            "id": 3,
            "nombre": "alcalcelcer",
            "descripcion": "medicamento para el dolor de cabeza",
            "precio": 5000,
            "createdAt": "2020-08-30T04:42:30.000Z",
            "updatedAt": "2020-08-30T04:42:30.000Z",
            "CategoriaId": 2
        },
        "PuntoVentum": 1
    },`
 
* **Error Response:**



  * **Code:** 401 UNAUTHORIZED 


    **Content:** `{ error : "access denied" }`



**Obtener Inventarios**
----
Regresa un json con todo la información de inventarios.

* **URL**

  API/inventario/

* **Method:**

  `GET`
  
*  **URL Params**
  
    

* **Data Params**




* **Success Response:**

  * **Code:** 200 


    **Content:** `{
        "id": 1,
        "cantidad": 50,
        "createdAt": "2020-08-30T04:45:36.000Z",
        "updatedAt": "2020-08-30T04:45:36.000Z",
        "PuntoVentumId": 1,
        "ProductoId": 3,
        "Producto": {
            "id": 3,
            "nombre": "alcalcelcer",
            "descripcion": "medicamento para el dolor de cabeza",
            "precio": 5000,
            "createdAt": "2020-08-30T04:42:30.000Z",
            "updatedAt": "2020-08-30T04:42:30.000Z",
            "CategoriaId": 2
        },
        "PuntoVentum": 1
    },`
 
* **Error Response:**



  * **Code:** 404 NOTFOUND


    **Content:** `{ error : "data not found" }`
OR

  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`





**Obtener Inventario**
----
Regresa un json con el inventario solicitado.

* **URL**

  API/inventario/:id

* **Method:**

  `GET`
  
*  **URL Params**
  
    id requerido 

* **Data Params**




* **Success Response:**

  * **Code:** 200


    **Content:** `{
        "id": 1,
        "cantidad": 50,
        "createdAt": "2020-08-30T04:45:36.000Z",
        "updatedAt": "2020-08-30T04:45:36.000Z",
        "PuntoVentumId": 1,
        "ProductoId": 3,
        "Producto": {
            "id": 3,
            "nombre": "alcalcelcer",
            "descripcion": "medicamento para el dolor de cabeza",
            "precio": 5000,
            "createdAt": "2020-08-30T04:42:30.000Z",
            "updatedAt": "2020-08-30T04:42:30.000Z",
            "CategoriaId": 2
        },
        "PuntoVentum": 1
    },`
 
* **Error Response:**



  * **Code:** 404 NOTFOUND


    **Content:** `{ error : "inventaries with id "id"  not found}`
OR

  * **Code:** 401 UNAUTHORIZED 


    **Content:** `{ error : "access denied" }`




**Actualizar Inventario**
----
Regresa un mensaje de éxito de la actualización del inventario.

* **URL**

  API/inventario/:id

* **Method:**

  `PUT`
  
*  **URL Params**
  
    id requerido 

* **Data Params**




* **Success Response:**

  * **Code:** 200 

    **Content:** `Iventario was updated succesfully`
 
* **Error Response:**



  * **Code:** 404 NOTFOUND

    **Content:** `{ error : "Cannot updated inventary with id=${id} .Maybe inventary was not found or req.body is empty!"}`

OR

  * **Code:** 401 UNAUTHORIZED


    **Content:** `{ error : "access denied" }`





**Eliminar Inventario**
----
Regresa un mensaje de éxito de la eliminación  del inventario.

* **URL**

  API/inventario/:id

* **Method:**

  `DELETE`
  
*  **URL Params**
  
    id requerido 

* **Data Params**




* **Success Response:**

  * **Code:** 200 

    **Content:** `Iventario was deleted succesfully`
 
* **Error Response:**



  * **Code:** 404 NOTFOUND

    **Content:** `{ error : "Cannot deleted inventary with id=${id}. Maybe inventary was not found !"}`
OR

  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`



**Obtener Inventario por punto de venta**
----
Regresa un Json con el inventario solicitado por punto de venta

* **URL**

  API/inventario/porpuntodeventa/:puntoventa

* **Method:**

  `GET`
  
*  **URL Params**
  
    puntoventa = id del punto de venta requerido

* **Data Params**




* **Success Response:**

  * **Code:** 200 

    **Content:** `{
        "id": 1,
        "cantidad": 50,
        "createdAt": "2020-08-30T04:45:36.000Z",
        "updatedAt": "2020-08-30T04:45:36.000Z",
        "PuntoVentumId": 1,
        "ProductoId": 3,
        "Producto": {
            "id": 3,
            "nombre": "alcalcelcer",
            "descripcion": "medicamento para el dolor de cabeza",
            "precio": 5000,
            "createdAt": "2020-08-30T04:42:30.000Z",
            "updatedAt": "2020-08-30T04:42:30.000Z",
            "CategoriaId": 2
        },
        "PuntoVentum": 1
    },`
 
* **Error Response:**



  * **Code:** 404 NOTFOUND

    **Content:** `{ error : "inventaries with id "id"  not found}`
OR

  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`








**Crear Punto de venta**
----
Regresa un json con el punto de venta creado y los datos de la empresa al que pertenece.

* **URL**

  API/puntoventa/

* **Method:**

  `POST`
  
*  **URL Params**
   none
    

* **Data Params**

 nombre

 dirección

 ciudad

 empresa



* **Success Response:**

  * **Code:** 200 

    **Content:** `  {
        "id": 4,
        "nombre": "Puntodeventatest3",
        "direccion": "calle150a#95-30",
        "ciudad": "Bogota",
        "coordenadas": "{\"lat\":4.7474311,\"lng\":-74.0867677}",
        "createdAt": "2020-08-30T20:19:23.000Z",
        "updatedAt": "2020-08-30T20:19:23.000Z",
        "EmpresaId": 2,
        "Empresa": {
            "id": 2,
            "name": "TEST",
            "nit": 11111111,
            "celular": 3202203099,
            "createdAt": "2020-08-30T19:56:10.000Z",
            "updatedAt": "2020-08-30T19:56:10.000Z",
            "UserId": 2
        }`
 
* **Error Response:**

   en el campo  coordenadas puede recibir:

  "{\"lat\"Direccion ingresada incorrecta,\"lng\":Direccion ingresada incorrecta}"
  
   Esto se debe a que la API de google de geocode no encontró las coordenadas con la direccion y ciudad 
   ingresada.




  * **Code:** 401 NOTFOUND 

    **Content:** `{ error : "access denied" }`






**Obtener puntos de venta**
----
Regresa un json con los puntos de venta.

* **URL**

  API/puntoventa/

* **Method:**

  `GET`
  
*  **URL Params**
   none
    

* **Data Params**



* **Success Response:**

  * **Code:** 200 

    **Content:** `  {
        "id": 4,
        "nombre": "Puntodeventatest3",
        "direccion": "calle150a#95-30",
        "ciudad": "Bogota",
        "coordenadas": "{\"lat\":4.7474311,\"lng\":-74.0867677}",
        "createdAt": "2020-08-30T20:19:23.000Z",
        "updatedAt": "2020-08-30T20:19:23.000Z",
        "EmpresaId": 2,
        "Empresa": {
            "id": 2,
            "name": "TEST",
            "nit": 11111111,
            "celular": 3202203099,
            "createdAt": "2020-08-30T19:56:10.000Z",
            "updatedAt": "2020-08-30T19:56:10.000Z",
            "UserId": 2
        }`
 
* **Error Response:**




  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`

   OR


 * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "pointsofsales not found " }`




  



**Obtener punto de venta**
----
Regresa un json con el punto de venta solicitado .

* **URL**

  API/puntoventa/:id

* **Method:**

  `GET`
  
*  **URL Params**
   
    id = requerido

* **Data Params**



* **Success Response:**

  * **Code:** 200 

    **Content:** `  {
        "id": 4,
        "nombre": "Puntodeventatest3",
        "direccion": "calle150a#95-30",
        "ciudad": "Bogota",
        "coordenadas": "{\"lat\":4.7474311,\"lng\":-74.0867677}",
        "createdAt": "2020-08-30T20:19:23.000Z",
        "updatedAt": "2020-08-30T20:19:23.000Z",
        "EmpresaId": 2,
        "Empresa": {
            "id": 2,
            "name": "TEST",
            "nit": 11111111,
            "celular": 3202203099,
            "createdAt": "2020-08-30T19:56:10.000Z",
            "updatedAt": "2020-08-30T19:56:10.000Z",
            "UserId": 2
        }`
 
* **Error Response:**




  * **Code:** 401 UNAUTHORIZED 

   **Content:** `{ error : "access denied" }`

   OR


 * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "pointsofsale with id "id" not found  " }`





**Actualizar punto de venta**
----
Regresa un mensaje de éxito de la actualización del punto de venta.

* **URL**

  API/puntoventa/:id

* **Method:**

  `PUT`
  
*  **URL Params**
   
    id = requerido

* **Data Params**



* **Success Response:**

  * **Code:** 200 

    **Content:** `Pointofsale was updated succesfully`
 
* **Error Response:**




  * **Code:** 401 UNAUTHORIZED

    **Content:** `{ error : "access denied" }`

   OR


 * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "Cannot updated pointofsale with id=${id} .Maybe pointofsale was not found or req.body is empty! " }`




**Eliminar punto de venta**
----
Regresa un mensaje de éxito de la eliminación del punto de venta.

* **URL**

  API/puntoventa/:id

* **Method:**

  `DELETE`
  
*  **URL Params**
   
    id = requerido

* **Data Params**



* **Success Response:**

  * **Code:** 200 

    **Content:** `Pointofsale was deleted succesfully`
 
* **Error Response:**




  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`

   OR


 * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "Cannot deleted pointofsale with id=${id} .Maybe deleted was not found or req.body is empty!  " }`




**Obtener puntos de venta por ciudad **
----
Regresa un json con todos los puntos de venta que estén en la ciudad solicitada.
* **URL**

  API/puntoventa/porciudad/:ciudad

* **Method:**

  `GET`
  
*  **URL Params**
   
    ciudad = requerido

* **Data Params**



* **Success Response:**

  * **Code:** 200 

   **Content:** `  {
        "id": 4,
        "nombre": "Puntodeventatest3",
        "direccion": "calle150a#95-30",
        "ciudad": "Bogota",
        "coordenadas": "{\"lat\":4.7474311,\"lng\":-74.0867677}",
        "createdAt": "2020-08-30T20:19:23.000Z",
        "updatedAt": "2020-08-30T20:19:23.000Z",
        "EmpresaId": 2,
        "Empresa": {
            "id": 2,
            "name": "TEST",
            "nit": 11111111,
            "celular": 3202203099,
            "createdAt": "2020-08-30T19:56:10.000Z",
            "updatedAt": "2020-08-30T19:56:10.000Z",
            "UserId": 2
        }`
 
* **Error Response:**




  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`

   OR


 * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "pointofsales in this city not found " }`




**Obtener puntos de venta a 1 kilómetro de distancia**
----
Regresa un json con todos los puntos de venta que estén a 1 kilómetro a la redonda del usuario. 

* **URL**

  API/puntoventa/por/distancia

* **Method:**

  `GET`
  
*  **URL Params**
   
   

* **Data Params**



* **Success Response:**

  * **Code:** 200 

    **Content:** ` {
    "puntos_venta_a_un_kilometro_o_menos_del_usuario": [
        {
            "nombre": "Puntodeventatest3",
            "direccion": "calle150a#95-30",
            "ciudad": "Bogota",
            "coordenadas": {
                "lat": 4.7474311,
                "lng": -74.0867677
            },
            "EmpresaId": 2
        },
        {
            "nombre": "Puntodeventatest7",
            "direccion": "calle150a#95-30",
            "ciudad": "Bogota",
            "coordenadas": {
                "lat": 4.7474311,
                "lng": -74.0867677
            },
            "EmpresaId": 2
        }
    ]
}`
 
* **Error Response:**




  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`

   OR


 * **Code:** 404 UNAUTHORIZED

    **Content:** `{ error : "No se encontraron puntos de venta cerca" }`








**Crear producto**
----
Regresa un json con la información del producto creado.

* **URL**

  API/producto/

* **Method:**

  `POST`
  
*  **URL Params**
   none
    

* **Data Params**

 nombre

 descripción

 precio

 categoría // id de la categoría


* **Success Response:**

  * **Code:** 200 

    **Content:** `     {
        "id": 2,
        "nombre": "computador",
        "descripcion": "dispositivo electronico",
        "precio": 40000,
        "createdAt": "2020-08-30T04:42:01.000Z",
        "updatedAt": "2020-08-30T04:42:01.000Z",
        "CategoriaId": 1,
 
    },`
 
* **Error Response:**


  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "access denied" }`



**Obtener producto**
----
Regresa un json con la información del producto creado y la categoría a la que pertenece.

* **URL**

  API/producto/:id

* **Method:**

  `GET`
  
*  **URL Params**
   id  = requerido
    

* **Data Params**

 None


* **Success Response:**

  * **Code:** 200 

    **Content:** `     {
        "id": 2,
        "nombre": "computador",
        "descripcion": "dispositivo electronico",
        "precio": 40000,
        "createdAt": "2020-08-30T04:42:01.000Z",
        "updatedAt": "2020-08-30T04:42:01.000Z",
        "CategoriaId": 1,
        "Categoria": {
            "id": 1,
            "nombre": "tecnologia",
            "descripcion": "servicios de tecnologia unicamente",
            "createdAt": "2020-08-30T04:40:09.000Z",
            "updatedAt": "2020-08-30T04:40:09.000Z"
        }
    },`
 
* **Error Response:**


  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`
  OR
 
 * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "product with id "id" not found  " }`





**Obtener productos**
----
Regresa un json con la información de todos los productos y sus categorías.

* **URL**

  API/producto/

* **Method:**

  `GET`
  
*  **URL Params**
  
    

* **Data Params**

 None


* **Success Response:**

  * **Code:** 200 

    **Content:** `     {
        "id": 2,
        "nombre": "computador",
        "descripcion": "dispositivo electronico",
        "precio": 40000,
        "createdAt": "2020-08-30T04:42:01.000Z",
        "updatedAt": "2020-08-30T04:42:01.000Z",
        "CategoriaId": 1,
        "Categoria": {
            "id": 1,
            "nombre": "tecnologia",
            "descripcion": "servicios de tecnologia unicamente",
            "createdAt": "2020-08-30T04:40:09.000Z",
            "updatedAt": "2020-08-30T04:40:09.000Z"
        }
    },`
 
* **Error Response:**


  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`
  OR
 
 * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "products not found " }`




**Actualizar producto**
----
Regresa un mensaje de éxito de la actualización de el producto solicitado.

* **URL**

  API/producto/:id

* **Method:**

  `PUT`
  
*  **URL Params**
   id  = requerido
    

* **Data Params**

 None


* **Success Response:**

  * **Code:** 200 

    **Content:** `Product was updated succesfully` },`
 
* **Error Response:**


  * **Code:** 401 UNAUTHORIZED

    **Content:** `{ error : "access denied" }`
  OR
 
 * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "`Cannot updated product with id="id" .Maybe product was not found or req.body is empty! " }`



**Eliminar producto**
----
Regresa un  mensaje de éxito de la eliminación de el producto solicitado.

* **URL**

  API/producto/:id

* **Method:**

  `DELETE`
  
*  **URL Params**
   id  = requerido
    

* **Data Params**

 None


* **Success Response:**

  * **Code:** 200 

    **Content:** `product was deleted succesfully` },`
 
* **Error Response:**


  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`
  OR
 
 * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "`Cannot delete product with id="id" .Maybe product was not found or req.body is empty! " }`




**Obtener productos por categoria**
----
Regresa un json con la información de todos los productos por su categoría.

* **URL**

  API/producto/:categoria

* **Method:**

  `GET`
  
*  **URL Params**
  
    categoria = requerido

* **Data Params**

 None


* **Success Response:**

  * **Code:** 200 


    **Content:** `     {
        "id": 2,
        "nombre": "computador",
        "descripcion": "dispositivo electronico",
        "precio": 40000,
        "createdAt": "2020-08-30T04:42:01.000Z",
        "updatedAt": "2020-08-30T04:42:01.000Z",
        "CategoriaId": 1,
        "Categoria": {
            "id": 1,
            "nombre": "tecnologia",
            "descripcion": "servicios de tecnologia unicamente",
            "createdAt": "2020-08-30T04:40:09.000Z",
            "updatedAt": "2020-08-30T04:40:09.000Z"
        }
    },`
 
* **Error Response:**


  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denid" }`
  OR
 
 * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "products with id category not found " }`





**Crear una venta o compra**
----
Regresa un json con la información de la venta realizada.

* **URL**

  API/ventas/

* **Method:**

  `POST`
  
*  **URL Params**
   
    

* **Data Params**

 cantidad

 fechadecompra

 producto

 usuario// id de el usuario que realiza la compra

 empresa // id de la empresa

 puntodeventa // id del punto de venta en donde se realiza la compra


* **Success Response:**

  * **Code:** 200

    **Content:** `        {
        "id": 1,
        "fecha_de_compra": "2020-08-30T09:45:36.000Z",
        "cantidad": 1,
        "createdAt": "2020-08-30T22:55:21.000Z",
        "updatedAt": "2020-08-30T22:55:21.000Z",
        "ProductoId": 5,
        "EmpresaId":1,
        "UserId": 2,
        "PuntoVentumId": 4
    },`
 
* **Error Response:**


  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`

   OR


  * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "This product is not available" }`
 
   * **Code:** 400 NOTFOUND 

    **Content:** `{ error : " "there are not enough units of this product "" }`





**Obtener ventas**
----
Regresa un json con la información de todas las ventas.

* **URL**

  API/ventas/

* **Method:**

  `GET`
  
*  **URL Params**
   
    

* **Data Params**



* **Success Response:**

  * **Code:** 200 

    **Content:** `        {
        "id": 1,
        "fecha_de_compra": "2020-08-30T09:45:36.000Z",
        "cantidad": 1,
        "createdAt": "2020-08-30T22:55:21.000Z",
        "updatedAt": "2020-08-30T22:55:21.000Z",
        "ProductoId": 5,
        "UserId": 2,
        "PuntoVentumId": 4
    },`
 
* **Error Response:**


  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`

   OR


  * **Code:** 404 NOTFOUND

    **Content:** `{ error : "Sales not found }`



**Obtener ventas por punto de venta**
----
Regresa un json con todas las ventas de un punto de venta.

* **URL**

  API/ventas/perpointofsale/:puntodeventa

* **Method:**

  `GET`
  
*  **URL Params**
   
  puntodeventa = requerido
    

* **Data Params**



* **Success Response:**

  * **Code:** 200 

    **Content:** `        {
        "id": 1,
        "fecha_de_compra": "2020-08-30T09:45:36.000Z",
        "cantidad": 1,
        "createdAt": "2020-08-30T22:55:21.000Z",
        "updatedAt": "2020-08-30T22:55:21.000Z",
        "ProductoId": 5,
        "UserId": 2,
        "PuntoVentumId": 4
    },`
 
* **Error Response:**


  * **Code:** 401 UNAUTHORIZED

    **Content:** `{ error : "access denied" }`

   OR


  * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "Sale with id pointofsale "+puntodeventaid+"not found" }`





**Obtener ventas por empresa**
----
Regresa un json con todas las ventas de una empresa.

* **URL**

  API/ventas/perempresa/:empresa

* **Method:**

  `GET`
  
*  **URL Params**
   
  empresa = requerido
    

* **Data Params**



* **Success Response:**

  * **Code:** 200

    **Content:** `        {
        "id": 1,
        "fecha_de_compra": "2020-08-30T09:45:36.000Z",
        "cantidad": 1,
        "createdAt": "2020-08-30T22:55:21.000Z",
        "updatedAt": "2020-08-30T22:55:21.000Z",
        "ProductoId": 5,
        "UserId": 2,
        "PuntoVentumId": 4
    },`
 
* **Error Response:**


  * **Code:** 401 UNAUTHORIZED

    **Content:** `{ error : "access denied" }`

   OR


  * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "Sales with id empresa "+id+"not found" }`


**Obtener venta **
----
Regresa un json con todas la información de la venta solicitada.

* **URL**

  API/ventas/:id

* **Method:**

  `GET`
  
*  **URL Params**
   
  id= requerido
    

* **Data Params**



* **Success Response:**

  * **Code:** 200

    **Content:** `        {
        "id": 1,
        "fecha_de_compra": "2020-08-30T09:45:36.000Z",
        "cantidad": 1,
        "createdAt": "2020-08-30T22:55:21.000Z",
        "updatedAt": "2020-08-30T22:55:21.000Z",
        "ProductoId": 5,
        "UserId": 2,
        "PuntoVentumId": 4
    },`
 
* **Error Response:**


  * **Code:** 401 UNAUTHORIZED

    **Content:** `{ error : "access denied" }`

   OR


  * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "Sale with id "+id+"not found" }`
 

**Eliminar venta **
----
Regresa un  mensaje de éxito de la eliminación de la venta.

* **URL**

  API/ventas/:id

* **Method:**

  `DELETE`
  
*  **URL Params**
   
  id= requerido
    

* **Data Params**



* **Success Response:**

  * **Code:** 200 

    **Content:** `Sale was deleted succesfully`
 
* **Error Response:**


  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`

   OR


  * **Code:** 404 NOTFOUND 

    **Content:** `{ error : "Cannot deleted Sale with id="id". Maybe Sale was not found !" }`



**Actualizar venta **
----
Regresa un  mensaje de éxito de la actualización de la venta.

* **URL**

  API/ventas/:id

* **Method:**

  `PUT`
  
*  **URL Params**
   
  id= requerido
    

* **Data Params**



* **Success Response:**

  * **Code:** 200

    **Content:** `Sale was updated succesfully`
 
* **Error Response:**


  * **Code:** 401 UNAUTHORIZED 

    **Content:** `{ error : "access denied" }`

   OR


  * **Code:** 404 NOTFOUND

    **Content:** `{ error : "Cannot updated Sale with id="id". Maybe Sale was not found !" }`







