//
// Fraction helper for question generators
// Defines global "qFraction" object
// Since it uses the library "math.js", script must be placed afterwards it.
//


var qFraction = {

    // Transforms math.js improper fraction to proper fraction object
    // accept:          math.js fraction object
    // return:          object like {integer: number|null, numerator: number|null, denominator: number|null}
    normalize: function(fraction){
        var nf = {integer: null, numerator: null, denominator: null};
        if(fraction.n === 0) {                                                   // Fraction like 0/1
            nf.integer = 0;
            nf.numerator = null;
            nf.denominator = null;
        }
        else if(fraction.n > fraction.d){                                        // Improper fractions
            nf.integer = (fraction.n / fraction.d);
            nf.integer = nf.integer - (nf.integer % 1);
            nf.numerator = fraction.n - (fraction.d * nf.integer);
            nf.denominator = fraction.d;
            if(nf.numerator === 0){                                             // If after calculation we get fraction like 1 0/2
                nf.numerator = null;
                nf.denominator = null;
            }
        }
        else if(fraction.n === fraction.d){                                     // Fractions like 1/1
            nf.integer = fraction.n;
        }
        else {                                                                  // Proper fractions
            nf.numerator = fraction.n;
            nf.denominator = fraction.d;
        }

        return nf;
    },

    // Converts fraction to html element
    // accept:          math.js fraction object
    // return:          html template for fraction display
    getTemplateFor: function(fraction){

        var getFullTpl = function(integer, numerator, denominator){
            integer = (integer !== null) ? integer : "&nbsp";
            return "<table style='display:inline; text-align: center;'>" +
                "<tr>" +
                "<td rowspan='2'>" + integer + "</td>" +
                "<td>" + numerator + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td style='border-top: 1px solid black'>" + denominator + "</td>" +
                "</tr>" +
                "</table>";
        };

        var getIntegerTpl = function(integer){return "<span>"+ integer+"</span>"};

        var tpl = '';
        var nf = this.normalize(fraction);
        if(nf.numerator === null)
            tpl = getIntegerTpl(nf.integer);
        else
            tpl = getFullTpl(nf.integer, nf.numerator, nf.denominator);

        return tpl;
    },

    // Generates random fraction
    // accept:
    // maxResult:       maximum possible value for resulting fraction
    //                  for example: if value is "5" - fraction may be 4 1/2, but not 5 1/5
    // maxDenominator:  maximum possible value for denominator
    //                  for example: if value is "25" - fraction may be 1/2 or 1/24, but not  1/30
    // return:          math.js fraction object
    getRandom: function(maxResult, maxDenominator){
        var result = Math.floor(Math.random() * maxResult + 1);
        var denominator = Math.floor(Math.random() * maxDenominator + 2);
        var nominator  = Math.floor(Math.random() * (denominator - 1) + 1);
        nominator = nominator + (result - 1) * denominator;
        return math.fraction(nominator + "/" + denominator);
    },

    // Changes fraction on random value
    distort: function(base){
        var variant = null;
        var n = qNumber.getRandom(1, base.n);
        if (Math.random() < 0.5)
            variant = qFraction.add(base, n + '/' + base.d);
        else
            variant = qFraction.subtract(base, n + '/' + base.d);

        return variant;
    },

    // aliases for math.js functions
    toFraction: math.fraction,
    add:        math.add,
    subtract:   math.subtract,
    divide:     math.divide,
    multiply:   math.multiply
};
