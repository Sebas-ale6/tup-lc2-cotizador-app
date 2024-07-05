ESPECIFICACIONES:
estructura general:
rotador de opiniones:
El rotador de opiniones, si bien no se ve de lo mas lindo, funciona correctamente cambiando entre
3 opiniones preestablecidas en el archivo common.js, dichas opiniones van rotando cada 3 segundos.
El punto a mejorar podria ser que dependiendo el espacio que ocupa la opinion, muchas veces empuja el contenido
principal de la pagina.

Indice:
En el indice se muestran todas las cotizaciones de todas las monedas por default, cada moneda se muestra por nombre, valor de compra
y valor de venta, cada cotizacion contiene un boton "Guardar" para guardar las cotizaciones en Mi Archivo. 
Tambien se encuentra un buscador de monedas que, valga la redondancia,busca la moneda seleccionada 
y muestra su fecha de actualizacion al buscar una moneda individualmente.

Mi Archivo:
En Mi Archivo se muestran todas las cotizaciones que se han guardado desde el indice, cada vez que se 
presiona el boton de guardar se almacena un nuevo registro y al final de cada linea contiene un boton de 
borrar que el presionarlo, elimina la linea deseada.
El punto a mejorar es que no logramos que almacene el valor y fecha de la moneda en el momento exacto que 
se presiona el boton de guardar, solo muestra los valores y fecha del monento en el que se abre la pagina,
es decir, muestra la fecha y hora actual.

Informes:
En la seccion de informes tuvimos una confusion y en lugar de mostrar el informe de las monedas almacenadas
en Mi Archivo, mostramos el informe de las monedas que se encuentran llamadas y registradas en el historial 
de la API, lo cual cumpliria con una de las activdades extra, ya que, muestra el grafico y variaciones de 
la moneda que se seleccione atraves del buscador de monedas pero bueno, nos quedaria pendiente hacerla 
correctamente, mostrando el informe de las monedas almacenadas

Contacto:
Y por ultimo, la seccion de contacto, la cual funciona de manera optima, en los inputs se valida
que se ingresen solo letras para el nombre, que se ingrese un @ en el email y que cada campo este completo.
Luego de ingresar todo, y presionar el boton de enviar, se envia el mensaje a EmailJS, el cual esta vinculado 
al mail de uno de los integrantes del grupo, para poder recibirlo y visualizarlo

Nota: Eliminamos el archivo nosotros.html, nos parecio una adicion innecesaria.
