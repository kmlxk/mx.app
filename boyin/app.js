// boyin
Mx.namespace('Mx.boyin');
Mx.boyin.App = function() {
    var self = this;
    self.init();
};
Mx.boyin.App.getInstance = function() {
    if ( typeof Mx.boyin.App._instance === 'undefined') {
        Mx.boyin.App._instance = new Mx.boyin.App();
    }
    return Mx.boyin.App._instance;
};
Mx.boyin.App.prototype = {
    init : function() {
        var self = this;
        self.titleHeight = 0;
        self.pagesVisibility = {
            'index' : true
        };
        self.loadConfig();
    },
    loadConfig : function() {
        var self = this
        var defaultConfig = {
            apiurl : 'http://byshuju.cn:8010/public/index.php'
        };
        self.config = JSON.parse(appcan.locStorage.val('config'));
        if (self.config == null) {
            self.config = {};
        }
        $.extend(self.config, defaultConfig);
    },
    saveConfig : function() {
        var self = this;
        appcan.locStorage.val('config', JSON.stringify(self.config))
    },
    changeContentPanel : function(name) {
        var self = this;
        if (name === 'index') {
            appcan.bringPopoverToFront('content');
            return;
        }
        if ( typeof self.pagesVisibility[name] === 'undefined' || !self.pagesVisibility[name]) {
            appcan.openPopoverByEle("content", name + "_content.html", 0, self.titleHeight, 0, 'content_' + name);
            self.pagesVisibility[name] = true;
        } else {
            appcan.bringPopoverToFront('content_' + name);
        }
    },
    login: function(username, password, fnSuccess, fnError) {
        var self = this;
        $.ajax({
                    url : self.config.apiurl + '?r=appapi/user/Login',
                    dataType : "json",
                    type : 'GET',
                    data: {account:username, password:password},
                    success : function(data, textStatus) {
                        if (data.success) {
                            fnSuccess.apply(this, data.data);
                        } else {
                            fnError.apply(this, [1, data.message]);
                        }
                    },
                    error : function() {
                        fnError.apply(this, [0, "Connection Timeout"]);
                    },
                    statusCode : {
                        404 : function() {
                            fnError.apply(this, [404, "API not found"]);
                        }
                    }
                });
    }
}
