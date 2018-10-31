//
// Depends on:
//              questionGenerator.js
//              fraction.js
//              collection.js
//              placeholders.js

(function(){

    // By this name you can call generator from stack: "new QuestionGenerators.[GeneratorName]"
    var factoryName = 'Generic';

    // *******************************
    // Init block
    // Executed when you call "new QuestionGenerators.Fractions_addition()"
    var F = function(questionSet){

        var generatedQuestions = [];

        questionSet.forEach(function(item){
            var question = this.build(item);
            generatedQuestions.push(question);
        }, this);

        return generatedQuestions;
    };

    F.prototype.build = function(rawQuestion){
        var variables = rawQuestion.getVariables();
        var template =  new QuestionGenerators._Generic();

        template.question = this.compileQuestion(rawQuestion.question, variables);
        template.rightAnswer = new template.Variant(variables.answer);
        template.wrongAnswers = this.wrapInVariants(template, variables.wrongAnswers);
        template.combinedAnswers = new Collection(template.rightAnswer, template.wrongAnswers);
        template.combinedAnswers.shuffle();

        return template;
    };

    F.prototype.compileQuestion = function(question, variables){
        if(!variables.args)
            return question;

        for(var arg in variables.args){
            var regexp = new RegExp('(\\[\\[' + arg + '\\]\\])', 'g');
            question = question.replace(regexp, variables.args[arg]);
        }
        return question;
    };

    F.prototype.wrapInVariants = function(template, items){
        var variants = [];
        items.forEach(function(item){
            variants.push(new template.Variant(item))
        });
        return variants;
    };



    // *******************************
    // *******************************
    // Push factory to global stack
    if(window.QuestionFactories === undefined)
        window.QuestionFactories = {};

    window.QuestionFactories[factoryName] = F;
}());