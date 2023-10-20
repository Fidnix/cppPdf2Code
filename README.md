# Conversor de PDF's de C++ de la PUCP a Código de C++

Este repositorio fue hecho para convertir los proyectos de C++ exportados en pdf de la PUCP

El propósito de este proyecto es ser útil para convertir y formatear el código dentro de los pdf's para que puedan ser usados como código directo

> Esta versión es incompleta como libería, pero en el futuro se harán sus modificaciones

## Formato de los pdf's

Para modularizar correctamente los archivos, es necesario que los pdf's tengan las siguientes características:

* Que el código este numerado
* Para cada módulo debe existir un comentario de multilínea que indique los datos de cada módulo:
    * **Projecto (opcional):** El nombre del proyecto
    * **Archivo:** Nombre del archivo c++ o h, debe contener la extensión
    * **Autor:** Debe contener el nombre de la persona que creo el archivo (Posiblemente cambie esto en el futuro)

# Instalación

## Para usarlo

```bash
npm install https://github.com/Fidnix/pucp_cpp_pdf_2_code
```

## Para hacer pruebas

Primero se debe clonar el proyecto

```bash
git clone https://github.com/Fidnix/pucp_cpp_pdf_2_code
```

Luego debe dirigirse a la carpeta clonada e instalar las dependencias necesarias:

```bash
npm install
```

# Uso

Uso básico de esta librería:

```js
const fs = require('fs')
const cppZipper = require('pucpdf2code');

let ruta = '...' // Es la ruta donde se guardaran el zip
let pdfBuffer = fs.read('.../nombre_archivo.pdf') // El buffer del archivo pdf
cppZipper(ruta, pdfBuffer); // Es una función asíncrona que retorna el nombre del zip creado
```