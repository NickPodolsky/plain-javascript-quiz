(function(){
    // ************************
    // Test results
    //
    var TR = function(options){
        // *****************************
        // Init block
        // this code runs automatically when you call "new TestResults()"
        options = options || {};
        options.showIn = options.showIn || {};

        this.options = {
            showIn: {
                results: options.showIn.results || 'test'
            }
        };

        this.userResults = options.userResults;

        // Set listeners on test manager events
        document.addEventListener('TM_showResults', this.render.bind(this));

    };

    TR.prototype.render = function(){
        var output = '';
        this.userResults.forEach(function(item, index){
            output += this.createTestResultBlock(item, index+1);
        }, this);

        // Show results
        this.$(this.options.showIn.results).innerHTML = output;
    };

    TR.prototype.createTestResultBlock = function(result, questionNumber){
        var question    = "<div class='question'>" + "<b>" + questionNumber + ".</b> " + result.questionHtml + "</div>";
        var rightAnswer = "<div class='rightAnswer'>" + "<span class='label'>Right answer: </span>" + result.rightAnswerHtml + "</div>";

        var userAnswer = "";

        if(!result.isCorrect){
            var userAnswerValue = (result.userAnswerHtml !== null) ? result.userAnswerHtml : ' not answered';
            userAnswer  = (result.isCorrect) ? "" : "<div class='userAnswer'>" + "<span class='label'>Your answer: </span>" + userAnswerValue + "</div>";
        }

        var classCorrect = (result.isCorrect) ? "correct" : "incorrect";
        var output = "" +
            "<div class='resultItem " + classCorrect + "'>" +
            question +
            rightAnswer +
            userAnswer +
            "</div>";
        return output;
    };


    //*******************************
    // Helpers

    // Return node by id
    TR.prototype.$ = function(id){ return document.getElementById(id); };



    //*******************************
    // Attach constructor to manager prototype in the global scope
    window.TestManager.prototype.TestResults = TR;
    //*******************************
}());