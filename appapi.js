// adapter
Mx.namespace('Mx.appapi.appcan');
Mx.appapi.appcan.net = {
    ajax : function(url, data, fnSuccess, fnError, timeout) {
        window.Ajax.get(url, fnSuccess, fnError, timeout);
    }
};

Mx.appapi.appcan.storage = {
    set : function(key, value) {
        appcan.locStorage.val(key, JSON.stringify(value));
    },
    get : function(key, defaults) {
        if (typeof defaults ==='undefined') {
            defaults = {};
        }
        var json = appcan.locStorage.val(key),
        ret = JSON.parse(json);
        $.extend(ret, defaults);
        return ret;
    }
};

// common layer
Mx.namespace('Mx.appapi');
Mx.appapi.net = Mx.appapi.appcan.net;
Mx.appapi.storage = Mx.appapi.appcan.storage; 

