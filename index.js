const pdf = require('pdf-parse');
const colors = require('colors');
const { createZipInBuffer, createZipInPath } = require('./src/zipper');
const formatter = require('./src/formatter');
const splitter = require('./src/splitter');
const PrettyError = require('pretty-error');

module.exports = async function (dataBuffer, path = null){
    return new Promise((resolve, reject)=>{
        pdf(dataBuffer)
            .then(data=>formatter(data.text))
            .then(data=>splitter(data))
            .then(data=> {
                if(path === null){
                    return createZipInBuffer(data)
                }else{
                    return createZipInPath(path, data)
                }
            })
            .then(proyecto=>{
                console.log('Se creó correctamente el zip'.green);
                resolve(proyecto)
            })
            .catch(err=>{
                const pe = new PrettyError();
                const renderedError = pe.render(err);
                console.log(renderedError);
                reject(err);
            })
    })
}   