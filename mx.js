
Mx = {
    namespace: function(names) {
        var sep = names.split('.'),
                i,
                scope = window;
        for (i = 0; i < sep.length; i++) {
            if (typeof scope[sep[i]] === 'undefined') {
                scope[sep[i]] = {};
            }
            scope = scope[sep[i]];
        }
    }
};
Mx.namespace('array');

Mx.array = {
    'toTree': function(ar, parentKey){
    }
};
