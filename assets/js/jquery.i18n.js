(function($) {
    $.fn.extend({
        i18n: function(options) {
            var defaults = {
                lang: "",
                defaultLang: "",
                filePath: "/language/",
                filePrefix: "i18n_",
                fileSuffix: "",
                forever: true,
                callback: function() {}
            };

            function getCookie(name) {
                var arr = document.cookie.split('; ');
                for (var i = 0; i < arr.length; i++) {
                    var arr1 = arr[i].split('=');
                    if (arr1[0] == name) {
                        return arr1[1];
                    }
                }
                return '';
            };

            function setCookie(name, value, myDay) {
                var oDate = new Date();
                oDate.setDate(oDate.getDate() + myDay);
                document.cookie = name + '=' + value + '; expires=' + oDate;
            };

            var options = $.extend(defaults, options);

            if (getCookie('i18n_lang') != "" && getCookie('i18n_lang') != "undefined" && getCookie('i18n_lang') != null) {
                defaults.defaultLang = getCookie('i18n_lang');
            } else if (options.lang == "" && defaults.defaultLang == "") {
                throw "defaultLang must not be null !";
            };

            if (options.lang != null && options.lang != "") {
                if (options.forever) {
                    setCookie('i18n_lang', options.lang);
                } else {
                    $.removeCookie("i18n_lang");
                }
            } else {
                options.lang = defaults.defaultLang;
            };

            var i = this;
            $.getJSON(options.filePath + options.filePrefix + options.lang + options.fileSuffix + ".json", function(data) {
                var i18nLang = {};
                if (data != null) {
                    i18nLang = data;
                }

                $(i).each(function(i) {
                    var i18nOnly = $(this).attr("i18n-only");
                    if ($(this).val() != null && $(this).val() != "") {
                        if (i18nOnly == null || i18nOnly == undefined || i18nOnly == "" || i18nOnly == "value") {
                            $(this).val(i18nLang[$(this).attr("i18n")])
                        }
                    }
                    if ($(this).html() != null && $(this).html() != "") {
                        if (i18nOnly == null || i18nOnly == undefined || i18nOnly == "" || i18nOnly == "html") {
                            $(this).html(i18nLang[$(this).attr("i18n")])
                        }
                    }
                    if ($(this).attr('placeholder') != null && $(this).attr('placeholder') != "") {
                        if (i18nOnly == null || i18nOnly == undefined || i18nOnly == "" || i18nOnly == "placeholder") {
                            $(this).attr('placeholder', i18nLang[$(this).attr("i18n")])
                        }
                    }
                });
                options.callback();
            });
        }
    });
})(jQuery);

/*默认语言*/
var defaultLang = "cn"
function languageSelect(defaultLang){
    $("[i18n]").i18n({
        defaultLang: defaultLang,
        filePath: "./language/",
        filePrefix: "i18n_",
        fileSuffix: "",
        forever: true,
        callback: function(res) {}
    });
}
languageSelect(defaultLang);

function select(){
    $('#i18n-chinese').click(function(e){
        e.stopPropagation();
        var condition = $(this).text();  //根据按钮显示  中 文/English  
        console.log('click condition', condition);
        defaultLang = "cn",
        languageSelect(defaultLang);
    })
    $('#i18n-english').click(function(e){
        e.stopPropagation();
        var condition = $(this).text();  //根据按钮显示  中 文/English  
        console.log('click condition', condition);
        defaultLang = "en",
        languageSelect(defaultLang);
    })
}
$(function(){
    select(); 
})