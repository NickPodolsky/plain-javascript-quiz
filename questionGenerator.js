(function(){

    // ************************
    // Push to global scope
    var G =  function(){

        this.getQuestionHtml = function(){
            throw new Error('Function "getQuestionHtml" must be overridden');
        };

        this.getVariantsHtml = function(){
            throw new Error('Function "getVariantsHtml" must be overridden');
        };

        this.getRightAnswerHtml = function(){
            throw new Error('Function "getRightAnswerHtml" must be overridden');
        };

        this.getUserAnswerHtml = function(){
            throw new Error('Function "getUserAnswerHtml" must be overridden');
        };

        this.checkAnswer = function(){
            throw new Error('Function "getUserAnswerHtml" must be overridden');
        };

        this.Variant = function(value){
            this.value = value;
            this.id = this.getUuid();
        };
        this.Variant.prototype.getUuid = function(){
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
    };
    window.QuestionGenerator = G;
}());