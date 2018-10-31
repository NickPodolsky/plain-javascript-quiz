//
// Depends on:
//              questionGenerator.js
//              fraction.js
//              number.js
//              collection.js
//              placeholders.js

(function(){

    // By this name you can call generator from stack: "new QuestionGenerators.[GeneratorName]"
    var generatorName = 'Fractions_addition';

    // *******************************
    // Init block
    // Executed when you call "new QuestionGenerators.Fractions_addition()"
    var G = function(){

        this.question = null;
        this.rightAnswer = null;
        this.wrongAnswers = [];
        this.combinedAnswers = [];

        var subject_1   = qPlaceholders.maleNames.getRandom();
        var place_1     = qPlaceholders.places.getRandom();
        var argument_1  = qFraction.getRandom(5, 15);
        var argument_2  = qFraction.getRandom(2, 9);

        this.question = subject_1 + " walked " + qFraction.getTemplateFor(argument_1) + " miles to his friend's house. Then he walked another " + qFraction.getTemplateFor(argument_2) + " mile to the " + place_1 + ". What is the total distance that " + subject_1 + " walked?";
        this.rightAnswer = new this.Variant( qFraction.add(argument_1, argument_2) );
        this.wrongAnswers = this.getWrongAnswers(3);
        this.combinedAnswers = new Collection(this.rightAnswer, this.wrongAnswers);
        this.combinedAnswers.shuffle();
    };

    // *******************************
    // Prototype inheritance
    //G.prototype = QuestionGenerator.prototype;
    G.prototype = new QuestionGenerator();


    // *******************************
    // Override prototype functions
    // This functions called by TestManager
    G.prototype.getQuestionHtml = function(){
        return this.question;
    };

    // Return html elements with answer variants
    // accept: form data object with user answer (used when user returns to the question)
    G.prototype.getVariantsHtml = function(userAnswer){
        var html = '';
        this.combinedAnswers.forEach(function(variant){
            var checked = (userAnswer !== null && userAnswer.variant === variant.id) ? 'checked' : '';
            html += "<div><label>" +
                "<input type='radio' name='variant' " + checked + " value='"+ variant.id + "'>" +
                qFraction.getTemplateFor(variant.value) +
                "</label></div>"
        });

        return html;
    };

    G.prototype.getRightAnswerHtml = function(){
        return qFraction.getTemplateFor(this.rightAnswer.value);
    };

    // Transform answer id from form to string
    G.prototype.getUserAnswerHtml = function(formData){
        var variant = this.combinedAnswers.getById(formData.variant);
        if(variant !== null)
            return qFraction.getTemplateFor(variant.value);
        else
            return null;
    };

    G.prototype.checkAnswer = function(formData){
        return formData.variant === this.rightAnswer.id;
    };



    // *******************************
    // Helpers functions
    // They needs only for this generator
    // Declare as: G.prototype.[functionName]
    // Use in code as: this.[functionName]
    G.prototype.getWrongAnswers = function(number){
        var variants = [];
        for(var i=0; i < number; i++){
            var variant = null;
            var isUnique = false;
            do {
                var n = qNumber.getRandom(1, this.rightAnswer.value.n);

                if (Math.random() < 0.5)
                    variant = qFraction.add(this.rightAnswer.value, n + '/' + this.rightAnswer.value.d);
                else
                    variant = qFraction.subtract(this.rightAnswer.value, n + '/' + this.rightAnswer.value.d);

                isUnique = this.checkUniquenessOfWrongAnswer(variants, variant);
            }
            while(isUnique === false);

            variants.push(new this.Variant(variant));
        }
        return variants;
    };

    G.prototype.checkUniquenessOfWrongAnswer = function(variants, variant){
        if(variants.length === 0)
            return true;

        for(var i=0; i < variants.length; i++){
            var item = variants[i];
            if(item.value.n === variant.n && item.value.d === variant.d)
                return false;
        }

        return true;
    };



    // *******************************
    // *******************************
    // Push generator to global stack
    if(window.QuestionGenerators === undefined)
        window.QuestionGenerators = {};

    window.QuestionGenerators[generatorName] = G;
}());