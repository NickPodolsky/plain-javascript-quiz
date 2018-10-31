(function(){
    var setName = 'Set_1';
    var qSet = [];

    qSet.push({
        question:   'You have [[argument_1]] of a pizza and you want to share it equally between [[argument_2]] people. ' +
                    'How much of the pizza does each person get?',

        getVariables: function(){

            // Generate and calculate values
            var argument_1 = qFraction.getRandom(2, 8);
            var argument_2 = qNumber.getRandom(2, 10);
            var answer = qFraction.divide(argument_1, argument_2);


            // object contained variables which the factory will use
            var v = {};
            // variables used in question
            v.args = {};
            v.args.argument_1 = qFraction.getTemplateFor(argument_1);
            v.args.argument_2 = argument_2;

            // set the answer for display in test
            v.answer = qFraction.getTemplateFor(answer) + ' of the pizza';

            // create wrong answers
            v.wrongAnswers = [
                qFraction.getTemplateFor( qFraction.add(answer, qFraction.toFraction('1/4')) ) + ' of the pizza',
                qFraction.getTemplateFor( qFraction.subtract(answer, qFraction.toFraction('1/4')) ) + ' of the pizza',
                qFraction.getTemplateFor( qFraction.multiply(answer, qFraction.toFraction('1/4')) ) + ' of the pizza'
            ];

            return v;
        }
    });

    qSet.push({
        question:   'A baker is making cakes for a big party. She uses [[argument_1]] cup of oil for each cake. ' +
                    'How many cakes can she make if she has a bottle of oil that has [[argument_2]] cups in it?',

        getVariables: function(){

            // Generate and calculate values
            var argument_1 = qFraction.getRandom(2, 12);
            var argument_2 = qNumber.getRandom(2, 10);
            var answer = qFraction.divide(argument_2, argument_1);


            // object contained variables which the factory will use
            var v = {};
            // variables used in question
            v.args = {};
            v.args.argument_1 = qFraction.getTemplateFor(argument_1);
            v.args.argument_2 = argument_2;

            // set the answer for display in test
            v.answer = qFraction.getTemplateFor(answer);

            // create wrong answers
            v.wrongAnswers = [
                qFraction.getTemplateFor( qFraction.add(answer, qFraction.toFraction('1/4')) ),
                qFraction.getTemplateFor( qFraction.subtract(answer, qFraction.toFraction('1/4')) ),
                qFraction.getTemplateFor( qFraction.multiply(answer, qFraction.toFraction('1/4')) )
            ];

            return v;
        }
    });

    qSet.push({
        question:   'How many [[argument_1]] cup servings are in a package of cheese that contains [[argument_2]] cups altogether?',

        getVariables: function(){

            // Generate and calculate values
            var argument_1 = qFraction.getRandom(1, 12);
            var argument_2 = qNumber.getRandom(2, 10);
            var answer = qFraction.divide(argument_2, argument_1);


            // object contained variables which the factory will use
            var v = {};
            // variables used in question
            v.args = {};
            v.args.argument_1 = qFraction.getTemplateFor(argument_1);
            v.args.argument_2 = argument_2;

            // set the answer for display in test
            v.answer = qFraction.getTemplateFor(answer);

            // create wrong answers
            v.wrongAnswers = [
                qFraction.getTemplateFor( qFraction.add(answer, qFraction.toFraction('1/4')) ),
                qFraction.getTemplateFor( qFraction.subtract(answer, qFraction.toFraction('1/4')) ),
                qFraction.getTemplateFor( qFraction.multiply(answer, qFraction.toFraction('1/4')) )
            ];

            return v;
        }
    });

    qSet.push({
        question:   'A dime is [[argument_1]] inch wide. If you put [[argument_2]] dimes end to end, ' +
                    'how long would they be from beginning to end?',

        getVariables: function(){

            // Generate and calculate values
            var argument_1 = qFraction.getRandom(1, 12);
            var argument_2 = qNumber.getRandom(2, 10);
            var answer = qFraction.divide(argument_2, argument_1);


            // object contained variables which the factory will use
            var v = {};
            // variables used in question
            v.args = {};
            v.args.argument_1 = qFraction.getTemplateFor(argument_1);
            v.args.argument_2 = argument_2;

            // set the answer for display in test
            v.answer = qFraction.getTemplateFor(answer) + ' inch';

            // create wrong answers
            v.wrongAnswers = [
                qFraction.getTemplateFor( qFraction.add(answer, qFraction.toFraction('1/4')) ) + ' inch',
                qFraction.getTemplateFor( qFraction.subtract(answer, qFraction.toFraction('1/4')) ) + ' inch',
                qFraction.getTemplateFor( qFraction.multiply(answer, qFraction.toFraction('1/4')) ) + ' inch'
            ];

            return v;
        }
    });

    qSet.push({
        question:   'You have [[argument_1]] cookies and want to give [[argument_2]] of them to a friend. ' +
                    'How many do you give to your friend?',

        getVariables: function(){

            // Generate and calculate values
            var argument_1 = qNumber.getRandom(2, 10);
            var argument_2 = qFraction.getRandom(1, 12);
            var answer = qFraction.multiply(argument_1, argument_2);


            // object contained variables which the factory will use
            var v = {};
            // variables used in question
            v.args = {};
            v.args.argument_1 = argument_1;
            v.args.argument_2 = qFraction.getTemplateFor(argument_2);

            // set the answer for display in test
            v.answer = qFraction.getTemplateFor(answer);

            // create wrong answers
            v.wrongAnswers = [
                qFraction.getTemplateFor( qFraction.add(answer, qFraction.toFraction('1/4')) ),
                qFraction.getTemplateFor( qFraction.subtract(answer, qFraction.toFraction('1/4')) ),
                qFraction.getTemplateFor( qFraction.multiply(answer, qFraction.toFraction('1/4')) )
            ];

            return v;
        }
    });

    qSet.push({
        question:   'You have [[argument_1]] donuts and you want to give [[argument_2]] of them to a friend. ' +
                    'How many donuts would your friend get?',

        getVariables: function(){

            // Generate and calculate values
            var argument_1 = qNumber.getRandom(2, 10);
            var argument_2 = qFraction.getRandom(1, 12);
            var answer = qFraction.multiply(argument_1, argument_2);


            // object contained variables which the factory will use
            var v = {};
            // variables used in question
            v.args = {};
            v.args.argument_1 = argument_1;
            v.args.argument_2 = qFraction.getTemplateFor(argument_2);

            // set the answer for display in test
            v.answer = qFraction.getTemplateFor(answer);

            // create wrong answers
            v.wrongAnswers = [
                qFraction.getTemplateFor( qFraction.add(answer, qFraction.toFraction('1/4')) ),
                qFraction.getTemplateFor( qFraction.subtract(answer, qFraction.toFraction('1/4')) ),
                qFraction.getTemplateFor( qFraction.multiply(answer, qFraction.toFraction('1/4')) )
            ];

            return v;
        }
    });

    qSet.push({
        question:   '[[argument_1]] of a pan of brownies was sitting on the counter. ' +
                    'You decided to eat [[argument_2]] of the brownies in the pan. ' +
                    'How much of the whole pan of brownies did you eat?',

        getVariables: function(){

            // Generate and calculate values
            var argument_1 = qFraction.getRandom(1, 12);
            var argument_2 = qFraction.getRandom(1, 12);
            var answer = qFraction.multiply(1, argument_1);
            answer = qFraction.multiply(answer, argument_2);


            // object contained variables which the factory will use
            var v = {};
            // variables used in question
            v.args = {};
            v.args.argument_1 = qFraction.getTemplateFor(argument_1);
            v.args.argument_2 = qFraction.getTemplateFor(argument_2);

            // set the answer for display in test
            v.answer = qFraction.getTemplateFor(answer);

            // create wrong answers
            v.wrongAnswers = [
                qFraction.getTemplateFor( qFraction.add(answer, qFraction.toFraction('1/4')) ),
                qFraction.getTemplateFor( qFraction.subtract(answer, qFraction.toFraction('1/4')) ),
                qFraction.getTemplateFor( qFraction.multiply(answer, qFraction.toFraction('1/4')) )
            ];

            return v;
        }
    });



    // *******************************
    // *******************************
    // Push set to global stack
    if(window.QuestionSets === undefined)
        window.QuestionSets = {};

    window.QuestionSets[setName] = qSet;
})();