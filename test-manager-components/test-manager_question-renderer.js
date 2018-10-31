(function(){

    var QR = function(options){

        // *****************************
        // Init block
        // this code runs automatically when you call "new QuestionRenderer()"
        options = options || {};
        options.showIn = options.showIn || {};

        this.options = {
            showIn: {                                            // set id's of html elements which must contain components
                question:       options.showIn.question || 'testQuestion',
                answers:        options.showIn.answers || 'testAnswers'
            }
        };
        this.options.ids = {
            answersForm: this.options.showIn.answers + '_form'
        };

        this.questions = options.questionSet;               // Collection of question objects
        this.userResults = options.userResults;             // Array of user results

        this.currentQuestionNumber = 1;                     // Index of current question in "questions" collection is (currentQuestionNumber - 1)

        // Attach listeners on test manager events
        document.addEventListener('TM_renderQuestion', this.showQuestion.bind(this));


        // *****************************
        // Define public function

        this.getFormData = function(){
            var form = this.$(this.options.ids.answersForm);

            return this.formDataToObject(form);
        };
    };

    //**********************************
    // Questions show functions
    //
    QR.prototype.showQuestion = function(event){
        var questionNumber = event.detail.questionNumber;
        this.currentQuestionNumber = questionNumber;
        this.renderQuestionForm(this.questions[questionNumber - 1]);
    };

    // Compile and display question and answer variants
    // accept: question object
    QR.prototype.renderQuestionForm = function(question){
        var el = this.options.showIn;
        var rawUserAnswer = this.userResults[this.currentQuestionNumber - 1].rawUserAnswer;
        this.$(el.question).innerHTML = question.getQuestionHtml();
        this.$(el.answers).innerHTML = "<form id='"+ this.options.ids.answersForm +"'>" + question.getVariantsHtml(rawUserAnswer) + "</form>";
    };


    //*******************************
    // Converts form data to object
    // Converts form content to object
    QR.prototype.formDataToObject = function(form){
        // Check if object has no properties
        var isEmpty = function(obj){
            for(var key in obj){
                return false;
            }
            return true;
        };

        var formData = [].reduce.call(form, this.formReducer, {});
        return (isEmpty(formData) ? null : formData);
    };

    QR.prototype.formReducer = function(data, element){
        // ================
        // Checkers
        // ================
        // If name and value are setted - it's valid element
        var isValidElement = function(element){
            return element.name && element.value
        };

        // Throw away unchecked values
        var hasValidValue = function(element) {
            if(element.type === 'checkbox' || element.type === 'radio')
                return element.checked;
            else
                return true;
        };

        // Check if element has checkbox type
        var isCheckbox = function(element) {return element.type === 'checkbox'};

        // ================
        // Start processing
        // ================
        if(isValidElement(element) && hasValidValue(element)) {
            if(isCheckbox(element)){
                data[element.name] = (data[element.name] || []).concat(element.value); // add one more selected value to array
            }
            else {
                data[element.name] = element.value;
            }
        }
        return data;
    };


    //*******************************
    // Helpers

    // Return element by id
    QR.prototype.$ = function(id){ return document.getElementById(id); };



    //*******************************
    // Export renderer to global scope
    window.TestManager.prototype.QuestionRenderer = QR;
    //*******************************
}());