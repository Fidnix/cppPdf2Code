const pdf = require('pdf-parse');
const colors = require('colors');
const packageZip = require('./src/zipper');
const formatter = require('./src/formatter');
const splitter = require('./src/splitter');

// const fs = require('fs');
// let pdfBuffer = fs.readFileSync('/home/fidel/Descargas/ejemplo.pdf')
// codePdfParser(pdfBuffer);

module.exports = async function (path, dataBuffer){
    return new Promise((resolve, reject)=>{
        pdf(dataBuffer)
            .then(data=>formatter(data.text))
            .then(data=>splitter(data))
            .then((data)=> packageZip(path, data))
            .then((projectName)=>{
                console.log('Se creó correctamente el zip'.green);
                resolve(projectName)
            })
            .catch(err=>{
                console.error(err);
                reject(err);
            })
    })
}   