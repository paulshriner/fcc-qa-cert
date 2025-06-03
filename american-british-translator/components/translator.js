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
                translatedString = translatedString.replace(regex, this.highlightText(americanOnly[word]));
            }

            // translate word spellings
            for (const word in americanToBritishSpelling) {
                let regex = new RegExp(`\\b${word}\\b`, 'gi');
                translatedString = translatedString.replace(regex, this.highlightText(americanToBritishSpelling[word]));
            }

            // translate time
            // thanks https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace for tip on callback
            translatedString = translatedString.replace(/\d+:\d+/g, match => this.highlightText(match.replace(':', '.')));

            // translate titles
            translatedString = translatedString.replace(/[A-Za-z]+./gi, match => {
                for (const word in americanToBritishTitles) {
                    if (match.toLowerCase() == word.toLowerCase()) {
                        return this.highlightText(match.replace('.', ''));
                    }
                }

                return match;
            });
        } else if (mode == 'british-to-american') {
            // both direct words and spellings are just opposite of american-to-british
            for (const word in britishOnly) {
                let regex = new RegExp(`\\b${word}\\b`, 'gi');
                translatedString = translatedString.replace(regex, this.highlightText(britishOnly[word]));
            }

            for (const word in americanToBritishSpelling) {
                let regex = new RegExp(`\\b${americanToBritishSpelling[word]}\\b`, 'gi');
                translatedString = translatedString.replace(regex, this.highlightText(word));
            }

            // translate time
            translatedString = translatedString.replace(/\d+.\d+/g, match => this.highlightText(match.replace('.', ':')));

            // translate titles
            for (const word in americanToBritishTitles) {
                let regex = new RegExp(`\\b${americanToBritishTitles[word]}\\b`, 'gi');
                translatedString = translatedString.replace(regex, this.highlightText(word));                
            }
        }

        // if translatedString is the same then nothing is translated
        if (translatedString == str) return "Everything looks good to me!";

        return translatedString;
    }

    // Helper function that highlights a string given
    highlightText(str) {
        return '<span class="highlight">' + str + '</span>';
    }
}

module.exports = Translator;
