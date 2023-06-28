"use strict";
class label {
    static clearValue(query) {
        document.querySelector(`label[ id=${query} ]`).innerHTML = '';
    }
    static setValue(query, value) {
        document.querySelector(`label[ id=${query} ]`).innerHTML = value;
    }
    static getValue(query) {
        const txtlabel = document.querySelector(`label[ id=${query} ]`);
        if (txtlabel && txtlabel.innerHTML)
            return txtlabel.innerHTML;
        return '';
    }
    static updateLineValue(query, value) {
        var reader = label.getValue(query);
        label.setValue(query, `${reader}${reader.length ? '<br>' : ''}${value}`);
        label.setYscrollTopValue(query, label.getYscrollTopSize(query));
    }
    static getXscrollLeftSize(query) {
        const txtlabel = document.querySelector(`label[ id=${query} ]`);
        if (txtlabel)
            return txtlabel.scrollWidth;
        return 0;
    }
    static getYscrollTopSize(query) {
        const txtlabel = document.querySelector(`label[ id=${query} ]`);
        if (txtlabel)
            return txtlabel.scrollHeight;
        return 0;
    }
    static setXscrollLeftValue(query, value) {
        document.querySelector(`label[ id=${query} ]`).scrollLeft = value;
    }
    static setYscrollTopValue(query, value) {
        document.querySelector(`label[ id=${query} ]`).scrollTop = value;
    }
}
class input {
    static clearValue(query) {
        document.querySelector(`input[ id=${query} ]`).value = '';
    }
    static setValue(query, value) {
        document.querySelector(`input[ id=${query} ]`).value = value;
    }
    static getValue(query) {
        const txtinput = document.querySelector(`input[ id=${query} ]`);
        if (txtinput && txtinput.value)
            return txtinput.value;
        return '';
    }
    static setStyle(query, style) {
        document.querySelector(`input[ id=${query} ]`)?.setAttribute('style', style);
    }
}
class textarea {
    static clearValue(query) {
        document.querySelector(`textarea[ id=${query} ]`).value = '';
    }
    static setValue(query, value) {
        document.querySelector(`textarea[ id=${query} ]`).value = value;
    }
    static getValue(query) {
        const txtarea = document.querySelector(`textarea[ id=${query} ]`);
        if (txtarea && txtarea.value)
            return txtarea.value;
        return '';
    }
    static updateLineValue(query, value) {
        const reader = textarea.getValue(query);
        textarea.setValue(query, `${reader}${reader.length ? '\n' : ''}${value}`);
        textarea.setYscrollTopValue(query, textarea.getYscrollTopSize(query));
    }
    static getYscrollTopSize(query) {
        const txtarea = document.querySelector(`textarea[ id=${query} ]`);
        if (txtarea)
            return txtarea.scrollHeight;
        return 0;
    }
    static setYscrollTopValue(query, value) {
        document.querySelector(`textarea[ id=${query} ]`).scrollTop = value;
    }
    static setStyle(query, key, value) {
        document.querySelector(`textarea[ id=${query} ]`).style[key] = value;
    }
}
class forId {
    static styleBlock(id) {
        document.getElementById(id)?.setAttribute('style', 'display:block');
    }
    static styleNone(id) {
        document.getElementById(id)?.setAttribute('style', 'display:none');
    }
}
