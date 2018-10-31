//
// Number helper for question generators
// Defines global "qNumber" object
//


var qNumber = {

    // Generates random number
    // accept:
    //          rangeFrom: lower limit of generation range
    //          rangeTo: upper limit of generation range
    //          fractionDigits: size of fractional part
    //                          if omitted or set to 0 - an integer is generated
    // return: random number
    getRandom: function(rangeFrom, rangeTo, fractionDigits){
        fractionDigits = fractionDigits || 0;
        var result = Math.random() * (rangeTo - rangeFrom) + rangeFrom;
        if(fractionDigits === 0)
            return Math.round(result);
        else
            return parseFloat(result.toFixed(fractionDigits));
    }

};
