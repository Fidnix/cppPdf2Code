# Conversor de PDF's de C++ a Código de C++

Este repositorio fue hecho para convertir los proyectos de C++ exportados en pdf en código de C++ sin mayor complicación

El propósito de este proyecto es ser útil para convertir y formatear el código dentro de los pdf's para que puedan ser usados como código directo, este quiere decir:

* Se revisan si algunas sintaxis están correctamente escritas
* Se identa el código para legibilidad
* Se espacian algunos identificadores que quedaron unidos a otras sintaxis producto de la exportación del pdf

## Formato de los pdf's

Este proyecto también ofrece modularización de los códigos, para esto se debe añadir como encabezado un bloque de comentarios que muestren los siguientes datos:

* **Projecto (opcional):** El nombre del proyecto
* **Archivo:** Nombre del archivo c++ o h, debe contener la extensión
* **Autor:** Debe contener el nombre de la persona que creo el archivo (Posiblemente cambie esto en el futuro)

Además también se necesita que los códigos estén indexados

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

let ruta = '...' // Es la ruta donde se guardara el zip
let pdfBuffer = fs.read('.../nombre_archivo.pdf') // El buffer del archivo pdf

cppZipper(pdfBuffer, [ruta]) // Si se obvia la ruta devuelve el buffer del zip
    .then((proyectoObj)=>{ //Devuelve un objeto con la siguiente estructura
    // proyectoObj: {proyecto: string(nombre), buffer: Buffer || null (buffer del zip si no se pasa la ruta como parametro)}
        // Tu codigo
    })
    .catch((err)=>{
        // Tu codigo
    }); // Es una función asíncrona que retorna el nombre del zip creado
```

> También tienes la opción de usar try-catch en lugar de then-catch