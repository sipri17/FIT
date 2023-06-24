function sockCounter(arr) {
    const obj = {}
    let result = 0
    for (let x of arr) {
        if (!obj[x]) {
            obj[x] = 1
        } else if (obj[x] == 1) {
            result++
            obj[x] = 0
        }
    }
    return result;
}

const data1 = [5, 7, 7, 9, 10, 4, 5, 10, 6, 5]  //3
const data2 = [10, 20, 20, 10, 10, 30, 50, 10, 20]  //3
const data3 = [6, 5, 2, 3, 5, 2, 2, 1, 1, 5, 1, 3, 3, 3, 5] //6
const data4 = [1, 1, 3, 1, 2, 1, 3, 3, 3, 3] //4

console.log("data1 =",sockCounter(data1));
console.log("data2 =",sockCounter(data2));
console.log("data3 =",sockCounter(data3));
console.log("data4 =",sockCounter(data4));


function countWords(sentence) {
    const words = sentence.trim().split(" ");

    let count = 0;
    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        let isValid = true;
        for (let j = 0; j < word.length; j++) {
            const charCode = word.charCodeAt(j);
            if (j == word.length - 1) {
                if ((word[j] == ',') || (word[j] == '?') || (word[j] == '.') ) {
                    break;
                }
            }
            if (
                !(charCode >= 65 && charCode <= 90) &&
                !(charCode >= 97 && charCode <= 122) &&
                !(word[j] == '-')
                
                ) {
                    isValid = false;
                    break;
                }
            }
            
            if (isValid) {
                count++;
        }
    }

    return count;
}

const sentence1 = "Kemarin Shopia per[gi ke mall" //4
const sentence2 = "Saat meng*ecat tembok, Agung dib_antu oleh Raihan" // 5
const sentence3 = "Berapa u(mur minimal[ untuk !mengurus ktp?" //3
const sentence4 = "Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda." //4

console.log("sentence1 = ",countWords(sentence1));
console.log("sentence2 = ",countWords(sentence2));
console.log("sentence3 = ",countWords(sentence3));
console.log("sentence4 = ",countWords(sentence4));































