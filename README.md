#Cube Summation

Code Challenge for **Grability**.
Implementación en Javascript (NodeJS Framework) del reto en [HackerRank](https://www.hackerrank.com/challenges/cube-summation).

###Instalación y ejecución
Sigue estos pasos:

- git clone https://github.com/mirabalj/grability.git
- cd grability
- npm install
- node server.js

Luego vas a la [dirección](http://localhost:8080) de la aplicación en el navegador. Listo.

###Modelo
La clase principal se encuentra en el archivo *server.js*, se llama Matrix, se definieron los métodos necesarios, siguiendo el *SRP*:
- **init**, para inicializar el objeto con ceros.
- **update**, el cual actualiza el objeto matrix en las posiciones indicadas.
- **query**, para obtener la suma en el rango deseado de la matrix.

###Persistencia
No posee una capa como tal, innecesaria en este caso ya que el procesamiento se hace por lotes, sin embargo existe un arreglo **results[]** donde se pueden almacenar los resultados *casi* indefinidamente, ya que el framework puede persistir los datos en variables globales.

###Vista
La vista es administrada en primera instancia por **ExpressJS**, modulo del framework. Comprende un *textarea* para escribir los comandos, así como un botón **Run** para validar y procesar los datos en la matrix 3D. También se usa **Jade** Template Engine para mostrar los resultados de la ejecución. Los archivos están guardados en la carpeta **/public**.

###Controlador
El archivo controlador es *server.js*, el cual contiene toda la lógica del reto. Al ser un archivo de menos de 170 lineas, pareció *opcional* dividirlo en módulos más pequeños. Así mismo podemos encontrar dentro, la función **execute** que se usa para procesar por lotes los comandos recibidos por la vista y una función auxiliar **isNumber**.

**Rutas:**
NodeJS maneja la creación de rutas para responder a las peticiones vía Web. En este caso sólo se hizo necesaria la respuesta al metodo **POST** en la raiz de la aplicación con *app.post('/')*.

**Objetos:**
Se ha creado un objeto *JSON* llamado **errors** para manejar los posibles errores encontrados en la validación de los datos obtenidos.

###Observaciones
1. Se uso el principio KISS para hacer la aplicación tan sencilla como fuese posible y con la menor cantidad de requerimientos... pero se puede hacer **tan compleja como se quiera**, agregando persistencia, manejo de usuarios, método **delete**, entre otras cosas.
2. Se usa una variable global que puede ser refactorizada, fue creada para *probar* la persistencia. También se usa un *arreglo o matriz* para guardar las matrices de cada uno de los **test_case**, este comportamiento puede ser cambiado para ahorrar memoria.
3. Se pueden usar *"hashes"* en vez de matrices multidimensionales, siempre y cuando el comando query exigiera sólo la suma de las coordenadas y no *"entre"* las mismas.
4. La validación de los datos y el procesamiento se realizan de forma paralela, esto debido a que resultaría en una doble carga hacer ambas cosas por separado *(pero siempre se podrá, todo depende del contexto)*.
5. La función execute puede ser optimizada mucho más *(el uso de parseInt(), por ejemplo)*, pero para ser un trabajo de 10 horas me parece está bastante bien. Cualquier sugerencia es bienvenida, así como reporte de algun *bug*. 

#Espero que sea de tú agrado!

