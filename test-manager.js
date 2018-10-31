(function(){

    var TM = function(){

        // *****************************
        // Init block
        // this code runs automatically when you call "new TestManager()"

        this.options = {
            randomize: true,                // show questions in order of set or shuffle

            showIn: {                       // set id's of html elements which must contain components
                testBlock:          'test',
                question:           'testQuestion',
                answers:            'testAnswers',
                status:             'status',
                timer:              'reverseTimer',
                controlPanel:       'controlPanel',

                finishTestButton:   'finishOrNewTestButton',
                newTestButton:      'finishOrNewTestButton'
            }
        };

        this.questions = null;              // Collection on question object
        this.currentQuestionNumber = 1;     // Index of current question in "questions" collection is (currentQuestionNumber - 1)

        this.userResults = [];              // Store user's answers data

        this.answered = 0;                  // Number of answered questions

        // Components
        this.questionRenderer = null;
        this.currentStatus = null;
        this.controlPanel = null;
        this.testResults = null;
        this.timer = null;


        // Set listeners on components events
        document.addEventListener('CP_goToQuestion', function(e){this.goToQuestion(e.detail.questionNumber)}.bind(this));
        document.addEventListener('CP_goToResults', this.goToResults.bind(this));
        document.addEventListener('CP_checkAnswer', this.checkAnswer.bind(this));


        // *****************************
        // Define public function

        // Load question set into manager object
        this.setQuestions = function(questions){
            this.questions = new Collection(questions);
            if(this.options.randomize)
                this.questions.shuffle();
            this.initUserResults();                             // fill array of results with init values
        };

        // Run test
        this.run = function(duration){
            duration = duration || 300;
            this.initComponents();
            this.timer.start(duration);

            document.dispatchEvent( new qEvent('TM_renderQuestion', {questionNumber: 1} ));
        };

        // Creates and initializes components
        this.initComponents = function(){
            this.questionRenderer = new this.QuestionRenderer({
                questionSet: this.questions,
                userResults: this.userResults
            });

            this.controlPanel = new this.ControlPanel({
                userResults: this.userResults
            });

            this.testResults = new this.TestResults({
                showIn: {
                    results: this.options.showIn.testBlock,
                    newTestButton: this.options.showIn.newTestButton
                },
                userResults: this.userResults
            });

            this.currentStatus = new this.CurrentStatus({
                userResults: this.userResults,
                showIn: {status: this.options.showIn.status}
            });

            this.timer = new this.Timer({showIn: this.options.showIn.timer});
        };
    };

    //**********************************
    // Show question
    //

    TM.prototype.goToQuestion = function(questionNumber){

        // If the user has answered all questions then go to results
        if(this.answered === this.questions.length){
            this.goToResults();
            return;
        }

        // if wrong number was given then go to first question
        if(questionNumber > this.questions.length || questionNumber > this.questions.length){    // if wrong number was given then go to first question
            this.currentQuestionNumber = 1;
            document.dispatchEvent( new qEvent('TM_renderQuestion', {questionNumber: 1} ));
            return;
        }

        this.currentQuestionNumber = questionNumber;
        document.dispatchEvent( new qEvent('TM_renderQuestion', {questionNumber: questionNumber} ));
    };

    TM.prototype.goToResults = function(){
        this.timer.stop();
        document.dispatchEvent( new qEvent('TM_showResults'));
    };


    //**********************************
    // Check user answer
    //

    TM.prototype.checkAnswer = function(event){
        var question = this.getCurrentQuestion();
        var formData = this.questionRenderer.getFormData();

        if(formData !== null) {
            var isCorrect = question.checkAnswer(formData);

            this.userResults[this.currentQuestionNumber - 1].isCorrect = isCorrect;
            this.userResults[this.currentQuestionNumber - 1].rawUserAnswer = formData;
            this.userResults[this.currentQuestionNumber - 1].userAnswerHtml = question.getUserAnswerHtml(formData);

            this.answered++;
        }

        this.goToQuestion(this.currentQuestionNumber + 1); // show next question
    };


    //*******************************
    // Helpers

    // Init results with default values
    TM.prototype.initUserResults = function(){
        var that = this;
        this.questions.forEach(function(question){
            var data = {
                questionHtml:       question.getQuestionHtml(),
                rightAnswerHtml:    question.getRightAnswerHtml(),
                userAnswerHtml:     null,
                rawUserAnswer:      null,
                isCorrect:          null
            };
            that.userResults.push(data);
        });
    };

    // Return node by id
    TM.prototype.$ = function(id){ return document.getElementById(id); };

    // Return object of current showing question from "questions" collection
    TM.prototype.getCurrentQuestion = function(){
        return this.questions[this.currentQuestionNumber - 1];
    };



    //*******************************
    // Export manager to global scope
    window.TestManager = TM;
    //*******************************
}());