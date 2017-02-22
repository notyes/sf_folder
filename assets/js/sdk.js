var chk_hostname = document.location.hostname;
var wwwpruksa = "www.pruksa.com";
if(/pruksadev\.me/.test(chk_hostname)) {
    wwwpruksa = "www.pruksadev.me";
} else if(/pruksapre.com/.test(chk_hostname)) {
    wwwpruksa = "www.pruksapre.com";
} else if(/uat.pruksa.com/.test(chk_hostname)) {
    wwwpruksa = "www.uat.pruksa.com";
}
wwwpruksa = wwwpruksa.replace('.me', '.me:'+document.location.port);

var PS = {
    Storage: {},
    auth: "",
    lang: "th",
    env: "prod",
    www: "https://"+wwwpruksa,
    www2: "http://"+wwwpruksa,
    setLang: function(lang) {
        PS.lang = lang;
        if(lang != 'th') {
            PS.www += '/' + lang;
            PS.www2 += '/' + lang;
        }
    },
    getEnv: function() {
        var hostname = document.location.hostname;
        if(/pruksadev\.me/.test(hostname)) {
            PS.env = "dev";
            PS.www = "https://www.pruksadev.me";
        } else if(/pruksapre.com/.test(hostname)) {
            PS.env = "pre";
            PS.www = "https://www.pruksapre.com";
        } else if(/uat.pruksa.com/.test(hostname)) {
            PS.env = "uat";
            PS.www = "https://www.uat.pruksa.com";
        }
        PS.www2 = PS.www.replace('https:', 'http:').replace('.me', '.me:8888');
        return PS.env;
    },
    init: function() {
        PS.getEnv();
        PS.Storage = new CDStorage(document.location.protocol == 'https:' ? PS.www : PS.www2, "/crossd_iframe.php");
        PS.Storage.init();
        PS.status();
    },
    forgotpw: function(email, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/forgotpw' : PS.www + '/member/api/forgotpw';
        url += "?email="+encodeURIComponent(email);
        Ajx.load(url, function(data){
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    changepw: function(params, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/changepw' : PS.www + '/member/api/changepw';
        url += "?";
        params = params || {};
        for(var key in params)
        {
            url += key+"="+encodeURIComponent(params[key])+"&";
        }
        url = url.substring(0, url.length-1);
        Ajx.load(url, function(data){
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    login: function(params, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/login' : PS.www + '/member/api/login';
        url += "?";
        params = params || {};
        for(var key in params)
        {
            url += key+"="+encodeURIComponent(params[key])+"&";
        }
        url = url.substring(0, url.length-1);
        Ajx.load(url, function(data){
            if(data !=null && typeof data=='object' && data.status=='200')
            {
                PS.auth=data.profile;
                PS.Storage.setItem('ps_auth', JSON.stringify(data.profile));
                var redirect_to = (document.location.protocol == 'http:' ? PS.www + '/member' : PS.www2) + '/runtime/redirect_to?output=profile&t=' +(new Date).getTime();
                JSONP(redirect_to, function(data2){
                    if(typeof callback == "function") callback(PS.auth);
                });
            }
            else
            {
                if(typeof callback == "function") callback(data);
            }
        }, 'json', 'POST');
    },
    project: function(params, callback) {
        console.log(params);
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/project' : PS.www + '/member/api/project';
        url += "?";
        params = params || {};
        for(var key in params)
        {
            url += key+"="+encodeURIComponent(params[key])+"&";
        }
        url = url.substring(0, url.length-1);
        Ajx.load(url, function(data){
            console.log(data);
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    register: function(params, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/register' : PS.www + '/member/api/register';
        url += "?";
        params = params || {};
        for(var key in params)
        {
            url += key+"="+encodeURIComponent(params[key])+"&";
        }
        url = url.substring(0, url.length-1);
        Ajx.load(url, function(data){
            console.log(data);
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    loginfb: function(callback, scope) {
        scope = typeof scope == "undefined" ? "email" : scope;
        PS.auth = "";
        FB.login(function(response){
            if(response.status == 'connected') {
                JSONP(PS.www + '/member/login/facebook', function(data){
                    if(data !=null && typeof data=='object' && data.status==200)
                    {
                        PS.auth=data.profile;
                        PS.Storage.setItem('ps_auth', JSON.stringify(data.profile));
                        var redirect_to = PS.www2 + '/runtime/redirect_to?output=profile&t=' +(new Date).getTime();
                        JSONP(redirect_to, function(data2){
                            if(typeof callback == "function") callback(PS.auth);
                        });
                    }
                    else
                    {
                        PS.auth = "";
                        PS.Storage.setItem('ps_auth', "");
                        if(typeof callback == "function") callback(PS.auth);
                    }
                });
            } else {
                if(typeof callback == "function") callback(PS.auth);
            }
        },{scope: scope});
    },
    logout: function(callback) {
        url = typeof url == "undefined" || url === "" ? document.location.href : url;
        PS.auth = "";
        PS.Storage.setItem('ps_auth', "");
        PS.Storage.getItem('ps_auth', function(key, value){
            JSONP(PS.www + '/member/logout?ref='+encodeURIComponent(url), function(data){
                if(typeof callback == "function") callback(PS.auth);
            });
        });
    },
    status: function(callback) {
        JSONP(PS.www + '/member_is_login.php', function(data){
            if(data !=null && typeof data=='object' && data.status==200)
            {
                PS.auth=data.profile;
                PS.Storage.setItem('ps_auth', JSON.stringify(data.profile));
            }
            else
            {
                PS.auth = "";
                PS.Storage.setItem('ps_auth', "");
            }
            if(typeof callback == "function") callback(PS.auth);
        });
    },
    getprofile: function(member_id, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/profile' : PS.www + '/member/api/profile';
        url += "?member_id="+encodeURIComponent(member_id);
        Ajx.load(url, function(data){
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    getprofile_byfbid: function(facebook_id, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/profile/profile_byfbid' : PS.www + '/member/api/profile/byfbid';
        url += "?facebook_id="+encodeURIComponent(facebook_id);
        Ajx.load(url, function(data){
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
	updateprofile: function(params, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/profile/update_profile' : PS.www + '/member/api/profile/update_profile';
        url += "?";
		params = params || {};
        for(var key in params)
        {
            url += key+"="+encodeURIComponent(params[key])+"&";
        }
        url = url.substring(0, url.length-1);
        Ajx.load(url, function(data){
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    getprovince: function(callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/master/get_province' : PS.www + '/member/api/get_province';
        //url += "?lang=en";

        Ajx.load(url, function(data){
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    getamper: function(prov_id, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/master/get_amper' : PS.www + '/member/api/get_amper';
        url += "?prov_id="+encodeURIComponent(prov_id); //+"&lang=en";

        Ajx.load(url, function(data){
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    gettambon: function(amp_id, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/master/get_tambon' : PS.www + '/member/api/get_tambon';
        url += "?amp_id="+encodeURIComponent(amp_id); //+"&lang=en";

        Ajx.load(url, function(data){
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    getcustomerproject: function(params, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/profile/customer_project' : PS.www + '/member/api/customer_project';
        url += "?";
        params = params || {};
        for(var key in params)
        {
            url += key+"="+encodeURIComponent(params[key])+"&";
        }
        url = url.substring(0, url.length-1);
        Ajx.load(url, function(data){
            //console.log(data);
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    gethomenumber: function(params, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/profile/home_number' : PS.www + '/member/api/home_number';
        url += "?";
        params = params || {};
        for(var key in params)
        {
            url += key+"="+encodeURIComponent(params[key])+"&";
        }
        url = url.substring(0, url.length-1);
        Ajx.load(url, function(data){
            //console.log(data);
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    getunitno: function(params, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/profile/unit_no' : PS.www + '/member/api/unit_no';
        url += "?";
        params = params || {};
        for(var key in params)
        {
            url += key+"="+encodeURIComponent(params[key])+"&";
        }
        url = url.substring(0, url.length-1);
        Ajx.load(url, function(data){
            //console.log(data);
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    getroomplan: function(params, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/profile/room_plan' : PS.www + '/member/api/room_plan';
        url += "?";
        params = params || {};
        for(var key in params)
        {
            url += key+"="+encodeURIComponent(params[key])+"&";
        }
        url = url.substring(0, url.length-1);
        Ajx.load(url, function(data){
            //console.log(data);
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    getcustomerinfobyhousenumber: function(params, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/profile/customer_by_house_number' : PS.www + '/member/api/customer_by_house_number';
        url += "?";
        params = params || {};
        for(var key in params)
        {
            url += key+"="+encodeURIComponent(params[key])+"&";
        }
        url = url.substring(0, url.length-1);
        Ajx.load(url, function(data){
            //console.log(data);
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    getcustomerprojectbyhousenumber: function(params, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/profile/customer_project_by_house_number' : PS.www + '/member/api/customer_project_by_house_number';
        url += "?";
        params = params || {};
        for(var key in params)
        {
            url += key+"="+encodeURIComponent(params[key])+"&";
        }
        url = url.substring(0, url.length-1);
        Ajx.load(url, function(data){
            //console.log(data);
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    getactivateotpcode: function(params, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/activate_OTP' : PS.www + '/member/api/activate_OTP';
        url += "?";
        params = params || {};
        for(var key in params)
        {
            url += key+"="+encodeURIComponent(params[key])+"&";
        }
        url = url.substring(0, url.length-1);
        Ajx.load(url, function(data){
            //console.log(data);
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    },
    getcheckverifyemail: function(params, callback) {
        var url = document.location.protocol == 'http:' ? PS.www2 + '/api/profile/check_verify_email' : PS.www + '/member/api/check_verify_email';
        url += "?";
        params = params || {};
        for(var key in params)
        {
            url += key+"="+encodeURIComponent(params[key])+"&";
        }
        url = url.substring(0, url.length-1);
        Ajx.load(url, function(data){
            //console.log(data);
            if(typeof callback == "function") callback(data);
        }, 'json', 'POST');
    }
};
/*CDStorage*/
function CDStorage(a,b){this._iframe=null;this._iframeReady=false;this._origin=a;this._path=b;this._queue=[];this._requests={};this._id=0;this._check_supports=function(){try{return window.postMessage&&window.JSON&&'localStorage'in window&&window['localStorage']!==null}catch(e){return false}};this.supported=this._check_supports()}CDStorage.prototype={constructor:CDStorage,init:function(){var b=this;if(!this._iframe&&this.supported){this._iframe=document.createElement("iframe");this._iframe.style.cssText="position:absolute;width:1px;height:1px;left:-9999px;";document.body.appendChild(this._iframe);if(window.addEventListener){this._iframe.addEventListener("load",function(){b._iframeLoaded()},false);window.addEventListener("message",function(a){b._handleMessage(a)},false)}else if(this._iframe.attachEvent){this._iframe.attachEvent("onload",function(){b._iframeLoaded()},false);window.attachEvent("onmessage",function(a){b._handleMessage(a)})}this._iframe.src=this._origin+this._path}},getItem:function(a,b){if(this.supported){var c={id:++this._id,type:'get',key:a},data={request:c,callback:b};if(window.jQuery){data.deferred=jQuery.Deferred()}if(this._iframeReady){this._sendRequest(data)}else{this._queue.push(data)}if(window.jQuery){return data.deferred.promise()}}},setItem:function(a,b){if(this.supported){var c={id:++this._id,type:'set',key:a,value:b},data={request:c};if(window.jQuery){data.deferred=jQuery.Deferred()}if(this._iframeReady){this._sendRequest(data)}else{this._queue.push(data)}if(window.jQuery){return data.deferred.promise()}}},_sendRequest:function(a){if(this._iframe){this._requests[a.request.id]=a;this._iframe.contentWindow.postMessage(JSON.stringify(a.request),this._origin)}},_iframeLoaded:function(){this._iframeReady=true;if(this._queue.length){for(var i=0,len=this._queue.length;i<len;i++){this._sendRequest(this._queue[i])}this._queue=[]}},_handleMessage:function(a){if(a.origin==this._origin){var b=JSON.parse(a.data);if(typeof this._requests[b.id]!='undefined'&&typeof this._requests[b.id].deferred!='undefined'){this._requests[b.id].deferred.resolve(b.value)}if(typeof this._requests[b.id]!='undefined'&&typeof this._requests[b.id].callback=='function'){this._requests[b.id].callback(b.key,b.value)}delete this._requests[b.id]}}};
/*JSONP*/
(function(e,t){var n=function(t,n,r,i){t=t||"";n=n||{};r=r||"";i=i||function(){};var s=function(e){var t=[];for(var n in e){if(e.hasOwnProperty(n)){t.push(n)}}return t};if(typeof n=="object"){var o="";var u=s(n);for(var a=0;a<u.length;a++){o+=encodeURIComponent(u[a])+"="+encodeURIComponent(n[u[a]]);if(a!=u.length-1){o+="&"}}t+="?"+o}else if(typeof n=="function"){r=n;i=r}if(typeof r=="function"){i=r;r="callback"}if(!Date.now){Date.now=function(){return(new Date).getTime()}}var f=Date.now();var l="jsonp"+Math.round(f+Math.random()*1000001);e[l]=function(t){i(t);delete e[l]};if(t.indexOf("?")===-1){t=t+"?"}else{t=t+"&"}var c=document.createElement("script");c.setAttribute("src",t+r+"="+l);document.getElementsByTagName("head")[0].appendChild(c)};e.JSONP=n})(window)
/*Ajax*/
Ajx={getHTTPObject:function(){var a=!1;if("undefined"!=typeof ActiveXObject)try{a=new ActiveXObject("Msxml2.XMLHTTP")}catch(b){try{a=new ActiveXObject("Microsoft.XMLHTTP")}catch(d){a=!1}}else if(window.XMLHttpRequest)try{a=new XMLHttpRequest}catch(b){a=!1}return a},load:function(a,b,d,e,g){var c=this.init();if(c&&a){c.overrideMimeType&&c.overrideMimeType("text/xml");e||(e="GET");d||(d="text");g||(g={});d=d.toLowerCase();e=e.toUpperCase();var f="uid="+(new Date).getTime();a+=a.indexOf("?")+1?"&":"?";
a+=f;f=null;"POST"==e&&(f=a.split("?"),a=f[0],f=f[1]);c.open(e,a,!0);"POST"==e&&c.setRequestHeader("Content-type","application/x-www-form-urlencoded");c.onreadystatechange=g.handler?function(){g.handler(c)}:function(){if(4==c.readyState)if(200==c.status){var a="";c.responseText&&(a=c.responseText);"j"==d.charAt(0)?(a=a.replace(/[\n\r]/g,""),a=eval("("+a+")")):"x"==d.charAt(0)&&(a=c.responseXML);b&&b(a)}else error&&error(c.status)};c.send(f)}},bind:function(a){var b={url:"",onSuccess:!1,onError:!1,
format:"text",method:"GET"},d;for(d in b)a[d]&&(b[d]=a[d]);b.url&&this.load(b.url,function(a){if(b.onSuccess)b.onSuccess(a)},b.format,b.method,b)},init:function(){return this.getHTTPObject()}};
PS.init();