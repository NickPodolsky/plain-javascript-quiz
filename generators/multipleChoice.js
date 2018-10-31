//
// Depends on:
//              questionGenerator.js
//              fraction.js
//              collection.js
//              placeholders.js

(function(){

    // By this name you can call generator from stack: "new QuestionGenerators.[GeneratorName]"
    var generatorName = 'MultipleChoice';

    // *******************************
    // Init block
    // Executed when you call "new QuestionGenerators.Fractions_addition()"
    var G = function(){

        this.question = null;                               // question string
        this.rightAnswer = null;                            // right answer value
        this.wrongAnswers = [];                             // array of wrong answers
        this.combinedAnswers = [];                          // collection of right and wrong answers

        this.question = "Check even numbers";
        this.rightAnswer = [
            new this.Variant(2),
            new this.Variant(4),
        ];
        this.wrongAnswers = [
            new this.Variant(3),
            new this.Variant(5),
        ];
        this.combinedAnswers = new Collection(this.rightAnswer, this.wrongAnswers);
        this.combinedAnswers.shuffle();
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
    G.prototype.getVariantsHtml = function(userAnswer){
        var html = '';
        this.combinedAnswers.forEach(function(variant){
            var checked = (userAnswer !== null && userAnswer.variant.indexOf(variant.id) !== -1) ? 'checked' : '';
            html += "<div><label>" +
                "<input type='checkbox' name='variant' " + checked + " value='"+ variant.id + "'>" + variant.value +
                "</label></div>"
        });

        return html;
    };

    G.prototype.getRightAnswerHtml = function(){
        var values = [];
        this.rightAnswer.forEach(function(item){
            values.push(item.value);
        });
        return values.join(', ');
    };

    // Transform answer id from form to string
    G.prototype.getUserAnswerHtml = function(formData){
        var variants = this.combinedAnswers.getAllByIds(formData.variant);

        if (variants === null)
            return null;

        var values = [];
        variants.forEach(function(item){
            values.push(item.value);
        });
        return values.join(', ');
    };

    // Receive form data as object where key is form field name
    // return true|false
    G.prototype.checkAnswer = function(formData){
        if(formData.variant === null)
            return false;
        if(formData.variant.length !== this.rightAnswer.length)
            return false;
        for(var i = 0; i < this.rightAnswer.length; i++){
            var rightAnswerId = this.rightAnswer[i].id;
            if(formData.variant.indexOf(rightAnswerId) === -1)            // If one of the right ids is missing in the user answers, then we return an false
                return false;
        }

        return true;
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