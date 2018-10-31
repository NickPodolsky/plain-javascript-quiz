//
// Depends on:
//              questionGenerator.js
//              number.js
//              collection.js


(function(){

    // By this name you can call generator from stack: "new QuestionGenerators.[GeneratorName]"
    var generatorName = 'Volume';

    // *******************************
    // Init block
    // Executed when you call "new QuestionGenerators.Fractions_addition()"
    var G = function(){

        this.question = null;                               // question string
        this.rightAnswer = null;                            // right answer value
        this.wrongAnswers = [];                             // array of wrong answers
        this.combinedAnswers = [];                          // collection of right and wrong answers

        var prismShapedObjects = new Collection(['water tank', 'fish tank', 'pool', 'tub']);
        var areaTypes = new Collection(['area of', 'base area']);

        var object_1 = prismShapedObjects.getRandom();
        var placeholder_1 = areaTypes.getRandom();
        var argument_1 = qNumber.getRandom(1, 20);
        var argument_2 = qNumber.getRandom(100, 300);
        this.question = " A " + object_1 + " in the shape of a rectangular prism is " + argument_1 + "  " + " feet deep. The top of the " + object_1 + "  " + " has a " + " " + placeholder_1 + "  " + argument_2 + " square feet. What is the volume, in cubic feet, of the " + " " + object_1 + " ? ";

        this.rightAnswer = new this.Variant(argument_1 * argument_2);
        this.wrongAnswers = this.getWrongAnswers(3);
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
            var checked = (userAnswer !== null && userAnswer.variant === variant.id) ? 'checked' : '';
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
        var variant = this.combinedAnswers.getById(formData.variant);
        if(variant !== null)
            return variant.value;
        else
            return null;
    };

    // Receive form data as object where key is form field name
    // return true|false
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
                var percents = qNumber.getRandom(1, 20);
                var correction = Math.floor((this.rightAnswer.value * percents) / 100);

                if (Math.random() < 0.5)
                    variant = this.rightAnswer.value + correction;
                else
                    variant = this.rightAnswer.value - correction;

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
            if(variants[i].value === variant)
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