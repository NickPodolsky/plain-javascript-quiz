//
// Depends on:
//              questionGenerator.js
//              number.js
//              collection.js
//              placeholders.js

(function(){

    // By this name you can call generator from stack: "new QuestionGenerators.[GeneratorName]"
    var generatorName = 'MoreOrLess';

    // *******************************
    // Init block
    // Executed when you call "new QuestionGenerators.Fractions_addition()"
    //
    // This generator can accept type of user answer
    // 'radio' - a form with radio buttons will be used
    // 'manual' - a user will enter the value manually
    var G = function(userAnswerType){

        this.question = null;                               // question string
        this.rightAnswer = null;                            // right answer value
        this.wrongAnswers = [];                             // array of wrong answers
        this.combinedAnswers = [];                          // collection of right and wrong answers

        var subject_1   = qPlaceholders.maleNames.getRandom();
        var subject_2   = qPlaceholders.femaleNames.getRandom();
        var foodName    = qPlaceholders.food.getRandom();
        var argument_1  = qNumber.getRandom(5, 20);
        var argument_2  = qNumber.getRandom(1, argument_1);
        var relation    = (Math.random() < 0.5) ? 'less' : 'more';

        // Determines how a user must give an answer: using radio buttons (default) or by entering value manually
        this.userAnswerType = userAnswerType || 'radio';

        this.question =   subject_1 + " has " + argument_1 + "  " + foodName + ".  " + subject_2 + "  " + "  " + " has " + argument_2 + "  " + relation + ". What is the total amount they have altogether? ";

        if(relation === 'less')
            this.rightAnswer = argument_1 + (argument_1 - argument_2);
        else
            this.rightAnswer = argument_1 + (argument_1 + argument_2);
        this.rightAnswer = new this.Variant(this.rightAnswer);                  // Don't forget to wrap the answer into the Variant object

        if(this.userAnswerType === 'radio') {
            this.wrongAnswers = this.getWrongAnswers(argument_1, argument_2, relation);

            this.combinedAnswers = new Collection(this.rightAnswer, this.wrongAnswers);
            this.combinedAnswers.shuffle();
        }
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
        if(this.userAnswerType === 'radio') {
            this.combinedAnswers.forEach(function(variant){
                var checked = (userAnswer !== null && userAnswer.variant === variant.id) ? 'checked' : '';
                html += "<div><label>" +
                    "<input type='radio' name='variant' " + checked + " value='"+ variant.id + "'>" + variant.value +
                    "</label></div>"
            });
        }
        else {
            var value = (userAnswer !== null && userAnswer.variant) ? userAnswer.variant : '';
            html += "<div><label>" +
                "<input type='text' name='variant' value='" + value + "'>" +
                "</label></div>"
        }

        return html;
    };

    G.prototype.getRightAnswerHtml = function(){
        return this.rightAnswer.value;
    };

    // Transform answer id from form to string
    G.prototype.getUserAnswerHtml = function(formData){
        if(formData.variant === undefined)                          // if the user don't give an answer
            return null;

        if(this.userAnswerType === 'radio')
            return this.combinedAnswers.getById(formData.variant).value;
        else
            return formData.variant;

    };

    // Receive form data as object where key is form field name
    // return true|false
    G.prototype.checkAnswer = function(formData){
        var userAnswer = formData.variant || '';
        if(this.userAnswerType === 'radio')                         // If the user answers using radio buttons - compare id's
            return userAnswer === this.rightAnswer.id;
        else                                                        // If manual input is expected - compare values
            return parseInt(userAnswer.trim()) === this.rightAnswer.value;
    };



    // *******************************
    // Helpers functions
    // They needs only for this generator
    // Declare as: G.prototype.[functionName]
    // Use in code as: this.[functionName]
    G.prototype.getWrongAnswers = function(argument_1, argument_2, relation){
        var variants = [];
        var variant = null;

        // first wrong variant  - is the opposite relation
        var more = argument_1 + (argument_1 + argument_2);
        var less = argument_1 + (argument_1 - argument_2);
        variant = (relation === 'more') ? less : more;
        variants.push(new this.Variant(variant));

        // second wrong
        variant = argument_1 + argument_2;
        variants.push(new this.Variant(variant));

        // third variant
        variant = argument_1 - argument_2;
        variants.push(new this.Variant(variant));

        return variants;
    };





    // *******************************
    // *******************************
    // Push generator to global stack
    if(window.QuestionGenerators === undefined)
        window.QuestionGenerators = {};

    window.QuestionGenerators[generatorName] = G;
}());