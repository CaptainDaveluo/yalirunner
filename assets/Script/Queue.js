cc.Class({

    properties: {
        items:[],
    },
    push: function(element) {
        this.items.push(element)
    },
    dequeue: function(element) {
        this.items.shift()
    },
    front: function() {
        return this.items[0]
    },
    isEmpty: function() {
        return this.items.length == 0
    },
    size: function() {
        return this.items.length
    },
    get: function(index){
        return this.items[index];
    },
    printf: function() {
        console.log(this.items.length.toString())
    }
});
