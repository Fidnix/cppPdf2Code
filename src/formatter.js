const pipe = require('./pipe');

function hasPathData(data) {
    for (let i = 0; i < data.length; i++) {
        // Windows
        if(/^[C-Z]:\\([a-zA-Z0-9_\-\*ñ\.]*\\)+([a-zA-Z0-9_\-\*\.]*\.[a-zA-Z]{3})/g.test(data[i])) return true;
        // Linux
        if(/^file:\/\/\/([a-zA-Z0-9_\-\*ñ\.]*\\)+([a-zA-Z0-9_\-\*\.]*\.[a-zA-Z]{3})/g.test(data[i])) return true;
    }

    return false;
}

function filterCodeLines(data){
    const isGuaniraPattern = hasPathData(data);
    let lineNum = 1;
    if(isGuaniraPattern){
        return data
    }
    return  data.filter((textLine)=>{
        let re = new RegExp(`^${lineNum}`);
        if(re.test(textLine)){
            lineNum++;
            return true;
        }
        return false;
    })
}

function sintaxFormatter(linesArr){
    const regExps = {
        dataType: '(ofstream|ifstream|int|void|double|char|float)',
        identifier: '([a-zA-Z0-9_]*)',
        memMan: '(\\**)\\s*(&?)',
        constantVal: '(=\\s*\'?"?[a-zA-Z\\\\0-9\\.]*"?\'?)?',
        arr: '(\\[.*\\])?',
    };

    regExps.usingNamespace = new RegExp(`using\\s*namespace\\s*${regExps.identifier};`);
    // regExps.functionName = new RegExp(`^\\s*${regExps.dataType}\\s*${regExps.memMan}\\s*${regExps.identifier}\\s*\\((.*)([\\),])`);
    regExps.return = new RegExp(`return\\s*(.*);`);
    regExps.args = new RegExp(`([\\(,])\\s*(const)?\\s*${regExps.dataType}\\s*${regExps.memMan}\\s*${regExps.identifier}\s*${regExps.constantVal}`, 'g');
    regExps.delete = new RegExp(`delete\\s*${regExps.identifier};`, 'g');
    regExps.variables = new RegExp(`${regExps.dataType}\\s*${regExps.identifier}\\s*${regExps.arr}`);
    regExps.logicalOps = new RegExp(`not\\s*${regExps.identifier}`, 'g');

    return linesArr.map((linea)=>{
        linea = linea.replace(/^\d{1,}\s*/, '')
            .replace(regExps.usingNamespace, 'using namespace $1;')
            .replace(regExps.return, 'return $1;')
            .replaceAll(regExps.args, '$1$2 $3 $4$5 $6 $7')
            .replaceAll(regExps.delete, 'delete $1;')
            .replace(regExps.variables, '$1 $2$3')
            .replaceAll(regExps.logicalOps, 'not $1');
        return linea;
    });
}

function indentFormatter(codeLines){
    let indents = [];
    return codeLines.map((palabra)=>{
        const commentMatch = palabra.search(/\/\//)
        const lefttBracketMatch = palabra.search(/\{/)
        const rightBracketMatch = palabra.search(/\}/)
        if(rightBracketMatch != -1 &&
            (commentMatch == -1 || commentMatch >= rightBracketMatch) &&
            (commentMatch != -1 || lefttBracketMatch == -1 || lefttBracketMatch >= rightBracketMatch)
            && (commentMatch == -1 || rightBracketMatch == -1 || lefttBracketMatch >= rightBracketMatch || rightBracketMatch >= commentMatch)){
            indents.pop()
        }

        palabra = [...indents, palabra].join('');

        if(lefttBracketMatch != -1 &&
            (commentMatch == -1 || commentMatch >= lefttBracketMatch) &&
            (commentMatch != -1 || rightBracketMatch == -1 || lefttBracketMatch >= rightBracketMatch) &&
            (commentMatch == -1 || rightBracketMatch == -1 || lefttBracketMatch >= rightBracketMatch || rightBracketMatch >= commentMatch)){
            indents.push('\t');
        }
        return palabra;
    })
}

module.exports = function (rawText){
    try {
        const formattedText = pipe(
            text => text.split('\n'),
            filterCodeLines,
            sintaxFormatter,
            indentFormatter,
            codeLines => codeLines.join('\n')
        )(rawText);
        return Promise.resolve(formattedText);
    } catch (error) {
        return Promise.reject(error)
    }
}