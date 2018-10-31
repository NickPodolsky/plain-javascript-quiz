//
// Depends on:
//              questionGenerator.js
//              fraction.js
//              collection.js
//              placeholders.js

(function(){

    // By this name you can call generator from stack: "new QuestionGenerators.[GeneratorName]"
    var generatorName = '================ SET THE NAME OF THE GENERATOR ================';  // CHANGE THIS

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

    };

    // Return html elements with answer variants
    // accept: form data object with user answer (used when user returns to the question)
    G.prototype.getVariantsHtml = function(formData){

    };

    G.prototype.getRightAnswerHtml = function(){

    };

    // Transform answer id from form to string
    G.prototype.getUserAnswerHtml = function(formData){

    };

    // Receive form data as object where key is form field name
    // return true|false
    G.prototype.checkAnswer = function(formData){

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