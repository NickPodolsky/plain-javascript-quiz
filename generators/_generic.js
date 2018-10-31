//
// Depends on:
//              questionGenerator.js
//              fraction.js
//              collection.js
//              placeholders.js

(function(){

    // By this name you can call generator from stack: "new QuestionGenerators.[GeneratorName]"
    var generatorName = '_Generic';  // CHANGE THIS

    // *******************************
    // Init block
    // Executed when you call "new QuestionGenerators.Fractions_addition()"
    var G = function(){

        this.question = null;                               // question string
        this.rightAnswer = null;                            // right answer value
        this.wrongAnswers = [];                             // array of wrong answers
        this.combinedAnswers = [];                          // collection of right and wrong answers
    };


    // *******************************
    // Prototype inheritance
    //G.prototype = QuestionGenerator.prototype;
    G.prototype = new QuestionGenerator();


    // *******************************
    // Overrides prototype functions
    // This functions called by TestManager
    G.prototype.getQuestionHtml = function(){
        return this.question;
    };

    // Return html elements with answer variants
    // accept: form data object with user answer (used when user returns to the question)
    G.prototype.getVariantsHtml = function(formData){
        var html = '';

        this.combinedAnswers.forEach(function(variant){
            var checked = (formData !== null && formData.variant === variant.id) ? 'checked' : '';
            html += "<div><label>" +
                "<input type='radio' name='variant' " + checked + " value='"+ variant.id + "'>" + variant.value +
                "</label></div>"
        });

        return html;
    };

    G.prototype.getRightAnswerHtml = function(){
        return this.rightAnswer.value;
    };

    // Transform answer id from form to string
    G.prototype.getUserAnswerHtml = function(formData){
        if(formData.variant === undefined)                          // if the user don't give an answer
            return null;

        return this.combinedAnswers.getById(formData.variant).value;
    };

    // Receive form data as object where key is form field name
    // return true|false
    G.prototype.checkAnswer = function(formData){
        var userAnswer = formData.variant || '';
        return userAnswer === this.rightAnswer.id;
    };



    // *******************************
    // Helpers functions
    // They needs only for this generator
    // Declare as: G.prototype.[functionName]
    // Use in code as: this.[functionName]







    // *******************************
    // *******************************
    // Push generator to global stack
    if(window.QuestionGenerators === undefined)
        window.QuestionGenerators = {};

    window.QuestionGenerators[generatorName] = G;
}());