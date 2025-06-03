const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
    // #1
    test('Translate Mangoes are my favorite fruit. to British English', () => {
        assert.equal("Mangoes are my favourite fruit.", translator.translate("Mangoes are my favorite fruit.", "american-to-british", false));
    });

    // #2
    test('Translate I ate yogurt for breakfast. to British English', () => {
        assert.equal("I ate yoghurt for breakfast.", translator.translate("I ate yogurt for breakfast.", "american-to-british", false));
    });

    // #3
    test('Translate We had a party at my friend\'s condo. to British English', () => {
        assert.equal("We had a party at my friend's flat.", translator.translate("We had a party at my friend's condo.", "american-to-british", false));
    });

    // #4
    test('Translate Can you toss this in the trashcan for me? to British English', () => {
        assert.equal("Can you toss this in the bin for me?", translator.translate("Can you toss this in the trashcan for me?", "american-to-british", false));
    });

    // #5
    test('Translate The parking lot was full. to British English', () => {
        assert.equal("The car park was full.", translator.translate("The parking lot was full.", "american-to-british", false));
    });

    // #6
    test('Translate Like a high tech Rube Goldberg machine. to British English', () => {
        assert.equal("Like a high tech Heath Robinson device.", translator.translate("Like a high tech Rube Goldberg machine.", "american-to-british", false));
    });

    // #7
    test('Translate To play hooky means to skip class or work. to British English', () => {
        assert.equal("To bunk off means to skip class or work.", translator.translate("To play hooky means to skip class or work.", "american-to-british", false));
    });

    // #8
    test('Translate No Mr. Bond, I expect you to die. to British English', () => {
        assert.equal("No Mr Bond, I expect you to die.", translator.translate("No Mr. Bond, I expect you to die.", "american-to-british", false));
    });

    // #9
    test('Translate Dr. Grosh will see you now. to British English', () => {
        assert.equal("Dr Grosh will see you now.", translator.translate("Dr. Grosh will see you now.", "american-to-british", false));
    });

    // #10
    test('Translate Lunch is at 12:15 today. to British English', () => {
        assert.equal("Lunch is at 12.15 today.", translator.translate("Lunch is at 12:15 today.", "american-to-british", false));
    });

    // #11
    test('Translate We watched the footie match for a while. to American English', () => {
        assert.equal("We watched the soccer match for a while.", translator.translate("We watched the footie match for a while.", "british-to-american", false));
    });

    // #12
    test('Translate Paracetamol takes up to an hour to work. to American English', () => {
        assert.equal("Tylenol takes up to an hour to work.", translator.translate("Paracetamol takes up to an hour to work.", "british-to-american", false));
    });

    // #13
    test('Translate First, caramelise the onions. to American English', () => {
        assert.equal("First, caramelize the onions.", translator.translate("First, caramelise the onions.", "british-to-american", false));
    });

    // #14
    test('Translate I spent the bank holiday at the funfair. to American English', () => {
        assert.equal("I spent the public holiday at the carnival.", translator.translate("I spent the bank holiday at the funfair.", "british-to-american", false));
    });

    // #15
    test('Translate I had a bicky then went to the chippy. to American English', () => {
        assert.equal("I had a cookie then went to the fish-and-chip shop.", translator.translate("I had a bicky then went to the chippy.", "british-to-american", false));
    });

    // #16
    test('Translate I\'ve just got bits and bobs in my bum bag. to American English', () => {
        assert.equal("I've just got odds and ends in my fanny pack.", translator.translate("I've just got bits and bobs in my bum bag.", "british-to-american", false));
    });

    // #17
    test('Translate The car boot sale at Boxted Airfield was called off. to American English', () => {
        assert.equal("The swap meet at Boxted Airfield was called off.", translator.translate("The car boot sale at Boxted Airfield was called off.", "british-to-american", false));
    });

    // #18
    test('Translate Have you met Mrs Kalyani? to American English', () => {
        assert.equal("Have you met Mrs. Kalyani?", translator.translate("Have you met Mrs Kalyani?", "british-to-american", false));
    });

    // #19
    test('Translate Prof Joyner of King\'s College, London. to American English', () => {
        assert.equal("Prof. Joyner of King's College, London.", translator.translate("Prof Joyner of King's College, London.", "british-to-american", false));
    });

    // #20
    test('Translate Tea time is usually around 4 or 4.30. to American English', () => {
        assert.equal("Tea time is usually around 4 or 4:30.", translator.translate("Tea time is usually around 4 or 4.30.", "british-to-american", false));
    });

    // #21
    test('Highlight translation in Mangoes are my favorite fruit.', () => {
        assert.equal("Mangoes are my <span class=\"highlight\">favourite</span> fruit.", translator.translate("Mangoes are my favorite fruit.", "american-to-british", true));
    });

    // #22
    test('Highlight translation in I ate yogurt for breakfast.', () => {
        assert.equal("I ate <span class=\"highlight\">yoghurt</span> for breakfast.", translator.translate("I ate yogurt for breakfast.", "american-to-british", true));
    });

    // #23
    test('Highlight translation in We watched the footie match for a while.', () => {
        assert.equal("We watched the <span class=\"highlight\">soccer</span> match for a while.", translator.translate("We watched the footie match for a while.", "british-to-american", true));
    });

    // #24
    test('Highlight translation in Paracetamol takes up to an hour to work.', () => {
        assert.equal("<span class=\"highlight\">Tylenol</span> takes up to an hour to work.", translator.translate("Paracetamol takes up to an hour to work.", "british-to-american", true));
    });
});
