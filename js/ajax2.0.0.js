function sendAjax(options) {
    var _default = {
        method: 'GET',
        url: '',
        data: null,
        success: null,
        error: null
    }
    // 替换默认值
    for(var i in options) {
        _default[i] = options[i];
    }

    var xhr = new XMLHttpRequest();
    xhr.open(_default.method, _default.url, true);
    xhr.send(_default.data);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {

                // 获取返回的内容
                var val = xhr.responseText;
                val = JSON.parse(val);
                if(val.msg == 200) {
                    if(typeof _default.success === 'function') {
                        _default.success(val);
                    }
                }
            } else {
                if(typeof _default.error === 'function') {
                    _default.error(val);
                }
            }
        }
    }


}