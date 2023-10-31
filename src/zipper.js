// const colors = require('colors');
const fs = require('fs');
const path = require('path');
const ZipStream = require('zip-stream');
const AdmZip = require('adm-zip');
const createRandomName = require('./createRandomName')
/** 
* Gets the metadata of an array (its project name and files name)
* @param {Array[string]} modulesArr - An array that contains the files contents
* @return {Object} It wraps the project names and file names
*/
function getMetadata(modulesArr){
    const metadata = {};
    const proyecto = modulesArr[0].match(/(?<=\*\s*[pP]royecto:\s*)(\S*)(?=\s*\n)/g);
    metadata.proyecto = proyecto != null? proyecto : createRandomName();
    metadata.archivos = modulesArr.map(m=>m.match(/(?<=\*\s*(?:[aA]rchivo|[fF]ile):\s*)(\S*)(?=\s*\n)/g)[0].replace(' ', ''))
    return metadata;
}

/** 
* Creates the zip file with all the cpp code
* @param {Array[string]} modulesArr - An array that contains the files contents
* @return {string} The project's name.
*/
let createZipInPath = (zipPath, modulesArr)=> new Promise(async (resolve, reject)=>{
    const metadata = Object.freeze(getMetadata(modulesArr));
    const archive = new ZipStream();
    archive.on('error', (err)=>{
        reject(err)
    })
    // console.log(`Iniciando con la creacion del zip :D`.cyan);

    let entryFile = (index)=> {
        // console.log(index)
        // console.log(`Creando el archivo ${metadata.archivos[index]} en el zip`.cyan);
        archive.entry(modulesArr[index], {name: `${metadata.proyecto}/${metadata.archivos[index]}`}, (err, entry)=>{
            if(err){
                console.log(`error al ingresar ${metadata.archivos[index]}`.red)
                reject(err);
            }else{
                // console.log(`Se ingreso bien ${metadata.archivos[index]}`.green)
                if(index + 1 != modulesArr.length){
                    entryFile(index+1)
                }else{
                    const zipFile = fs.createWriteStream(path.join(zipPath, `${metadata.proyecto}.zip`));
                    zipFile.on('ready', ()=>{
                        archive.pipe(zipFile);
                        archive.finish();
                    })
                    zipFile.on('close', ()=>{
                        resolve({
                            'proyecto': metadata.proyecto,
                            'buffer': null
                        });
                    })
                }
            }
        })
    }
    entryFile(0);
})

let createZipInBuffer = (modulesArr) => new Promise(async (resolve, reject)=>{
    const metadata = Object.freeze(getMetadata(modulesArr));
    const zip = new AdmZip();
    
    for(let index = 0; index < modulesArr.length; index++){
        zip.addFile(`${metadata.proyecto}/${metadata.archivos[index]}`, modulesArr[index]);
    }
    // console.log(zip.toBuffer())
    resolve({
        'proyecto': metadata.proyecto,
        'buffer': zip.toBuffer()
    })
})

module.exports = {
    createZipInBuffer: createZipInBuffer,
    createZipInPath: createZipInPath
}

// const {exec} = require('child_process');
// async function createFiles(projectName, files){
//     return new Promise((resolve, reject)=>{
//         files.forEach((fileData) => {
//             console.log(`Creando/Reescribiendo el archivo ${fileData.fileName}`.green);
//             try{
//                 fs.writeFileSync(path.join(__dirname, '..', 'tmp', projectName, fileData.fileName), fileData.fileContent);
//             }catch(e){
//                 reject(e);
//             }
//         });
//         resolve();
//     })
// }

// async function createDir(projectName){
//     return new Promise((resolve, reject)=>{
//         console.log(`Creando la carpeta ${projectName}`.cyan);
//         exec(`mkdir ${path.join(__dirname, '..', 'tmp', projectName)}`, (err, stdout, stderr)=>{
//             if(stderr){
//                 console.error('Hubo un error a nivel de sistema');
//                 reject();
//             }
//             if(err){
//                 console.warn('Advertencia: El directorio ya esta creado'.yellow);
//             }
//             resolve();
//         });
//     })
// }