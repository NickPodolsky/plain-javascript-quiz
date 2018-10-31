function Collection(){

    // Init new array with data from arguments passed into Collection constructor
    var ar = [];
    for(var i=0; i < arguments.length; i++){
        ar = ar.concat(arguments[i]);
    }

    ar.getRandom = function(){
        return this[Math.floor(Math.random() * this.length)];
    };

    ar.shuffle = function(){
        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
    };

    // Returns an element that has the desired identifier
    ar.getById = function(id){
        for(var i = 0; i < this.length; i++){
            var item = this[i];
            if(item.id && item.id === id)
                return item;
        }
        return null;
    };

    // Returns all items according to the list of identifiers
    ar.getAllByIds = function(ids){
        var items = [];
        for(var i = 0; i < this.length; i++){
            var item = this[i];
            if(ids.indexOf(item.id) !== -1)            // if input array of id's has id of current item
                items.push(item);
        }
        return (items.length === 0) ? null : items;
    };



    return ar;
}