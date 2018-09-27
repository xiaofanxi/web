/**
 * Created by Administrator on 2017/08/17.
 */
function wulv5(url,callback) {
    var hm = document.createElement("script");
    hm.src = url;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm,s);
    var require,
        exports,
        module = {};
    define = function (data) {
        data(require,exports,module);
        callback(module.exports);
        s.parentNode.removeChild(hm);
    }

}

