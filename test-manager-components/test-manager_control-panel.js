(function(){
    // ************************
    // Control panel - keep "Check answer" button, navigation buttons, question list buttons
    //
    var CP = function(options){
        // *****************************
        // Init block
        // this code runs automatically when you call "new ControlPanel()"
        options = options || {};
        options.showIn = options.showIn || {};

        this.options = {
            showIn: {
                controlPanel: options.showIn.controlPanel || 'controlPanel',
                finishButton: options.showIn.finishButton || 'finishOrNewTestButton'
            }
        };

        this.userResults = options.userResults;
        this.currentQuestionNumber = 1;

        // Set listeners on test manager events
        document.addEventListener('TM_renderQuestion', this.render.bind(this));
        document.addEventListener('TM_showResults', this.renderNewTestButton.bind(this));

        // Set listeners on inner control panel events
        this.setInnerListeners();
    };


    CP.prototype.render = function(event){
        this.currentQuestionNumber = event.detail.questionNumber;
        this.$(this.options.showIn.controlPanel).innerHTML = this.getControlPanelHtml();
        this.$(this.options.showIn.finishButton).innerHTML = this.getFinishButton();
    };

    CP.prototype.renderNewTestButton = function(){
        var btn = '<a href="#" data-action="startNewTest" class="btn finishOrNewTest">Start new test</a>';
        this.$(this.options.showIn.finishButton).innerHTML = btn;
    };

    CP.prototype.getControlPanelHtml = function(){
        var html = '';
        html += this.getSubmitButtonHtml();
        html += this.getQuestionsListHtml();
        html += this.getNavigationButtonsHtml();
        return html;
    };

    CP.prototype.getSubmitButtonHtml = function(){
        var text = 'Submit Answer';
        var inactive = '';
        if(this.userResults[this.currentQuestionNumber - 1].userAnswerHtml !== null){
            text = 'You already answered';
            inactive = 'inactive';
        }
        return '<div id="containerSubmitButton">' +
                    '<a href="#" data-action="checkAnswer" class="btn ' + inactive + '">' + text + '</a>' +
                '</div>';
    };

    // Build list of buttons for transitions to specific questions
    CP.prototype.getQuestionsListHtml = function(){
        var html = '';
        this.userResults.forEach(function(element, index){
            var classes = 'btn ';

            if(element.userAnswerHtml !== null){
                classes += 'answered ';
                classes += (element.isCorrect) ? 'correct ' : 'incorrect ';
            }

            if(this.currentQuestionNumber === index + 1)
                classes += ' current';

            html += '<a href="#" class="' + classes + '" data-action="goToQuestion" data-number="' + (index + 1) + '">' + (index + 1) + '</a>'
        },this);

        html = '<div id="containerQuestionsList">' + html + '</div>';
        return html;
    };

    CP.prototype.getNavigationButtonsHtml = function(){
        var previousInactive = (this.currentQuestionNumber === 1) ? 'inactive': '';
        var nextInactive = (this.currentQuestionNumber === this.userResults.length) ? 'inactive' : '';

        var html = '';
        html += '<a href="#" data-action="goToPreviousQuestion" class="btn ' + previousInactive + '">Previous</a>';
        html += '<a href="#" data-action="goToNextQuestion" class="btn ' + nextInactive + '">Next</a>';

        html = '<div id="containerNavigationButtons">' + html + '</div>';
        return html;
    };

    CP.prototype.getFinishButton = function(){
        return '<a href="#" data-action="goToResults" class="btn finishOrNewTest">Finish the test</a>';
    };

    // ***************************
    // Listeners
    //

    CP.prototype.setInnerListeners = function(){
        this.$(this.options.showIn.controlPanel).addEventListener('click', this.selectAction.bind(this));
        this.$(this.options.showIn.finishButton).addEventListener('click', this.selectAction.bind(this));
    };

    CP.prototype.selectAction = function(event){
        event.preventDefault();

        var action = event.target.getAttribute('data-action');
        if(action === 'goToQuestion')
            var questionNumber = parseInt( event.target.getAttribute('data-number') );

        switch(action){
            case 'goToQuestion':
                this.fireEvent('CP_goToQuestion', {questionNumber: questionNumber}); break;
            case 'goToNextQuestion':
                this.fireEvent('CP_goToQuestion', {questionNumber: this.currentQuestionNumber + 1}); break;
            case 'goToPreviousQuestion':
                this.fireEvent('CP_goToQuestion', {questionNumber: this.currentQuestionNumber - 1}); break;
            case 'checkAnswer':
                this.fireEvent('CP_checkAnswer', {questionNumber: this.currentQuestionNumber}); break;
            case 'goToResults':
                this.fireEvent('CP_goToResults'); break;
            case 'startNewTest':
                window.location.reload(false); break;
        }
    };

    CP.prototype.fireEvent = function(eventName, data){
        document.dispatchEvent( new qEvent(eventName, data) );
    };


    //*******************************
    // Helpers

    // Return node by id
    CP.prototype.$ = function(id){ return document.getElementById(id); };



    //*******************************
    // Export manager to global scope
    window.TestManager.prototype.ControlPanel = CP;
    //*******************************
}());