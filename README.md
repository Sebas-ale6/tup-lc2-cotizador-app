ESPECIFICACIONES:

Estructura general:

Rotador de opiniones:
El rotador de opiniones, si bien no se ve de lo mas lindo, funciona correctamente cambiando entre
3 opiniones preestablecidas en el archivo common.js, dichas opiniones van rotando cada 3 segundos.
El punto a mejorar podria ser que dependiendo el espacio que ocupa la opinion, muchas veces empuja el contenido principal de la pagina.

Corregido, ya no empuja el contenido principal

Indice:
En el indice se muestran todas las cotizaciones de todas las monedas por default, cada moneda se muestra por nombre, valor de compra
y valor de venta, cada cotizacion contiene un boton "Guardar" para guardar las cotizaciones en Mi Archivo. 
Tambien se encuentra un buscador de monedas que, valga la redondancia,busca la moneda seleccionada 
y muestra su fecha de actualizacion al buscar una moneda individualmente.

Mi Archivo:
En Mi Archivo se muestran todas las cotizaciones que se han guardado desde el indice, cada vez que se 
presiona el boton de guardar se almacena un nuevo registro y al final de cada linea contiene un boton de 
borrar que al presionarlo, elimina la linea deseada.
El punto a mejorar es que no logramos que almacene el valor y fecha de la moneda en el momento exacto que 
se presiona el boton de guardar, solo muestra los valores y fecha del monento en el que se abre la pagina,
es decir, muestra la fecha y hora actual.

Corregido, se muestran la fecha y valores del momento en el que se guarda la moneda seleccionada

Informes:
En la seccion de informes tuvimos una confusion y en lugar de mostrar el informe de las monedas almacenadas
en Mi Archivo, mostramos el informe de las monedas que se encuentran llamadas y registradas en el historial 
de la API, lo cual cumpliria con una de las activdades extra, ya que, muestra el grafico y variaciones de 
la moneda que se seleccione atraves del buscador de monedas pero bueno, nos quedaria pendiente hacerla 
correctamente, mostrando el informe de las monedas almacenadas. Corregido, ahora la pagina de informes muestra por default todas las cotizaciones guardadas y 
almacenadas, y su respectivo grafico. Tambien contiene un buscador para encontrar cada moneda de forma individual. 

Contacto:
Y por ultimo, la seccion de contacto, la cual funciona de manera optima, en los inputs se valida
que se ingresen solo letras para el nombre, que se ingrese un @ en el email y que cada campo este completo.
Luego de ingresar todo, y presionar el boton de enviar, se envia el mensaje a EmailJS, el cual esta vinculado al mail de uno de los integrantes del grupo,
para poder recibirlo y visualizarlo

Adiciones:
Agregamos unaa pagina extra, llamada historial.html, la cual contiene lo que antes estaba por error en la pagina de informes pero que a su vez cumple con una de las actividades 
extra. Esta pagina muestra un informe de la variacion de la moneda seleccionada segun el registro de la API(la cual solo tiene registro de algunas monedas, no todas).
Tambien agregamos un archivo tipo JSON llamado cotizaciones.JSON, en el cual ir guardando y modificando los datos almacenados en el local storage para poder hacer pruebas


Nota: Eliminamos el archivo nosotros.html, nos parecio una adicion innecesaria.

Apreciacion personal del grupo acerca del TP:
Honestamente nos resulto un poco complicado tirando a bastante, por ahi tuvimos complicaciones por otras materias, lo cual nos dio poco tiempo para dedicarle al TP.
