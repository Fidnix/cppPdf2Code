const pdf = require('pdf-parse');
const colors = require('colors');
const packageZip = require('./src/zipper');
const formatter = require('./src/formatter');
const splitter = require('./src/splitter');
const PrettyError = require('pretty-error');

module.exports = async function (path, dataBuffer){
    return new Promise((resolve, reject)=>{
        pdf(dataBuffer)
            .then(data=>formatter(data.text))
            .then(data=>splitter(data))
            .then(data=> packageZip(path, data))
            .then(projectName=>{
                console.log('Se creó correctamente el zip'.green);
                resolve(projectName)
            })
            .catch(err=>{
                const pe = new PrettyError();
                const renderedError = pe.render(err);
                console.log(renderedError);
                reject(err);
            })
    })
}   