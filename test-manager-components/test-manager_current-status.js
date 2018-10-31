(function(){
    // ************************
    // Current status string
    //
    var CS = function(options){
        // *****************************
        // Init block
        // this code runs automatically when you call "new TestResults()"
        options = options || {};
        options.showIn = options.showIn || {};

        this.options = {
            showIn: {
                status: options.showIn.status || 'status'
            }
        };

        this.userResults = options.userResults;
        this.currentQuestionNumber = 1;

        // Set listeners on test manager events
        document.addEventListener('TM_renderQuestion', this.render.bind(this));
        document.addEventListener('TM_showResults', this.renderResult.bind(this));

    };

    CS.prototype.render = function(event){
        this.currentQuestionNumber = event.detail.questionNumber;
        this.$(this.options.showIn.status).innerHTML = this.getStatusString();
    };

    CS.prototype.renderResult = function(){
        this.$(this.options.showIn.status).innerHTML = this.getResultString();
    };

    CS.prototype.getStatusString = function(){
        var correctAnswersNumber = this.getNumberOfCorrectAnswers();
        var status = '';
        status += 'question ' + this.currentQuestionNumber + ' of ' + this.userResults.length;
        status += ' (' + Math.round( (correctAnswersNumber / this.userResults.length) * 100 ) + '% correct)';
        return status;
    };

    CS.prototype.getResultString = function(){
        var correctAnswersNumber = this.getNumberOfCorrectAnswers();
        var status = '';
        status += this.userResults.length + ' questions ';
        status += ' (' + Math.round( (correctAnswersNumber / this.userResults.length) * 100 ) + '% correct)';
        return status;
    };


    CS.prototype.getNumberOfCorrectAnswers = function(){
        var number = 0;
        for(var i = 0; i < this.userResults.length; i++){
            if(this.userResults[i].isCorrect)
                number++;
        }
        return number;
    };


    //*******************************
    // Helpers

    // Return node by id
    CS.prototype.$ = function(id){ return document.getElementById(id); };



    //*******************************
    // Attach constructor to manager prototype in the global scope
    window.TestManager.prototype.CurrentStatus = CS;
    //*******************************
}());