const createRandomName = require('./createRandomName');
const pipe = require('./pipe');

module.exports = function(formattedText){
    try {
        const randomSeparator = createRandomName(32);
        const metadataPattern = /\/\*\s*\n(?:\*\s*.*\s*\n)?(\*\s*(?:[pP]royecto|[pP]roject):\s*(.*)\s*\n)?(?:\*.*\n)?\*\s*(?:[aA]rchivo|[fF]ile):\s*(.*)\s*\n(?:\*.*\n)?\*\s*(?:[aA]utor|[aA]uthor):\s*(.*)\s*\n(?:\*.*\n)*(?:\*\/)/g;
        const metadata = formattedText.match(metadataPattern);
        const modulesArray = pipe(
            text => text.replaceAll(metadataPattern, randomSeparator),
            text => text.split(randomSeparator),
            codeModules => {codeModules.shift(); return codeModules;}, // Elimina los espacios y lineas de codigo anteriores a este (porque no podrian estar definidas en un archivo)
            codeModules => codeModules.map(codeModule => codeModule.trim()),
            codeModules => codeModules.map((codModule, index)=>[metadata[index], codModule].join('\n')) // Une la cabecera al resto del modulo
        )(formattedText)
        return Promise.resolve(modulesArray);
    } catch (error) {
        return Promise.reject(error);
    }
}