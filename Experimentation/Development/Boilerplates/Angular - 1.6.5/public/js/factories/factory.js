app.factory('dataClass', function() {
    return {
        items: [],
        addItem : function(item) {
            this.items.push(item);
        },
        getItems : function() {
            return this.items;
        },
        clearItems : function() {
            this.items = [];
        }
    }
});