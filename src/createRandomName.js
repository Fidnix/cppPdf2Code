/** 
* Crea un nombre con caracteres aleatorios
* @param {int} length - Número de caracteres para la cadena
* @return {string} Cadena con caracteres aleatorios
*/
module.exports = function (length = 16){
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const numLetters = alphabet.length;
    const arr = []
    for(let i = 0; i < length; i++){
        arr.push(alphabet[parseInt(numLetters*Math.random()-1)])
    }
    return arr.join('');
}