const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translate(str, mode) {
        let translatedString = str;

        if (mode == 'american-to-british') {
            // translate direct word changes
            for (const word in americanOnly) {
                // thanks https://stackoverflow.com/a/50828436 for regex
                // used boundaries (\\b) so that a word within a word isn't detected
                // case insensitive and global to get all occurrences
                let regex = new RegExp(`\\b${word}\\b`, 'gi');
                translatedString = translatedString.replace(regex, '<span class="highlight">'+ americanOnly[word] + '</span>');
            }

            // translate word spellings
            for (const word in americanToBritishSpelling) {
                let regex = new RegExp(`\\b${word}\\b`, 'gi');
                translatedString = translatedString.replace(regex, '<span class="highlight">'+ americanToBritishSpelling[word] + '</span>');
            }
        } else if (mode == 'british-to-american') {
            // both direct words and spellings are just opposite of american-to-british
            for (const word in britishOnly) {
                let regex = new RegExp(`\\b${word}\\b`, 'gi');
                translatedString = translatedString.replace(regex, '<span class="highlight">'+ britishOnly[word] + '</span>');
            }

            for (const word in americanToBritishSpelling) {
                let regex = new RegExp(`\\b${americanToBritishSpelling[word]}\\b`, 'gi');
                translatedString = translatedString.replace(regex, '<span class="highlight">'+ word + '</span>');
            }
        }

        // if translatedString is the same then nothing is translated
        if (translatedString == str) return "Everything looks good to me!";

        return translatedString;
    }
}

module.exports = Translator;
