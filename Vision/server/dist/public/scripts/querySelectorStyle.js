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
        document.querySelector(`input[ id=${query} ]`).setAttribute('style', style);
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
    static updateFinalLineValue(query, value) {
        const reader = textarea.getValue(query);
        textarea.setValue(query, `${reader}${reader.length ? '\n' : ''}${value}`);
        textarea.setCaret(query, `${reader}${reader.length ? '\n' : ''}${value}`.length);
    }
    static updateFinalRowValue(query, value) {
        textarea.setValue(query, textarea.getValue(query) + value);
        textarea.setCaret(query, textarea.getValue(query).length);
    }
    static updateCurrentRowValue(query, value) {
        const txtarea_value = textarea.getValue(query);
        const txtarea_old_car = textarea.getCaret(query);
        const txtarea_new_car = txtarea_old_car + value.length;
        const txtarea_substring_before = txtarea_value.substring(0, textarea.getCaret(query));
        const txtarea_substring_after = txtarea_value.substring(textarea.getCaret(query));
        textarea.setValue(query, txtarea_substring_before + value + txtarea_substring_after);
        textarea.setCaret(query, txtarea_new_car);
        return txtarea_new_car;
    }
    static getYscrollTopValue(query) {
        const txtarea = document.querySelector(`textarea[ id=${query} ]`);
        if (txtarea)
            return txtarea.scrollTop;
        return 0;
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
    static setColClass(query, value_to_reset, value_to_set) {
        for (var i = 0; i < value_to_reset.length; i++)
            document.querySelector(`textarea[ id=${query} ]`).classList.remove('col-' + value_to_reset[i]);
        document.querySelector(`textarea[ id=${query} ]`).classList.add('col-' + value_to_set);
    }
    static getCaret(query, start = true) {
        const txtarea = document.querySelector(`textarea[ id=${query} ]`);
        if (txtarea && start)
            return txtarea.selectionStart;
        if (txtarea && !start)
            return txtarea.selectionEnd;
        return 0;
    }
    static getSelection(query) {
        const txtarea = document.querySelector(`textarea[ id=${query} ]`);
        if (txtarea && txtarea.value)
            return txtarea.value.substring(txtarea.selectionStart, txtarea.selectionEnd);
        else
            return '';
    }
    static setCaret(query, i) {
        document.querySelector(`textarea[ id=${query} ]`).selectionStart = i;
        document.querySelector(`textarea[ id=${query} ]`).selectionEnd = i;
    }
    static setCareti(query, i) {
        document.querySelector(`textarea[ id=${query} ]`).selectionStart = i;
        document.querySelector(`textarea[ id=${query} ]`).selectionEnd = i + 1;
    }
    static setCaretxy(query, x, y) {
        document.querySelector(`textarea[ id=${query} ]`).selectionStart = x;
        document.querySelector(`textarea[ id=${query} ]`).selectionEnd = y;
    }
    static delPosCurrentRow(query, amount) {
        const old_text = textarea.getValue(query);
        const old_car = textarea.getCaret(query, false);
        textarea.setValue(query, old_text.substring(0, old_car - amount) + old_text.substring(old_car));
        textarea.setCaret(query, old_car - amount);
    }
    static insertNewSelection(query, newinsert) {
        const select = textarea.getSelection(query);
        const carx = textarea.getCaret(query);
        const cary = textarea.getCaret(query, false);
        textarea.setCaret(query, cary);
        textarea.delPosCurrentRow(query, select.length);
        textarea.updateCurrentRowValue(query, newinsert);
        textarea.setCaretxy(query, carx, carx + newinsert.length);
    }
    static focusOn(query) {
        document.querySelector(`textarea[ id=${query} ]`).focus();
    }
}
class div {
    static setStyle(query, key, value) {
        document.querySelector(`div[ id=${query} ]`).style[key] = value;
    }
    static clearValue(query) {
        document.querySelector(`div[ id=${query} ]`).innerHTML = '';
    }
    static setValue(query, value) {
        document.querySelector(`div[ id=${query} ]`).innerHTML = value;
    }
    static setColClass(query, value_to_reset, value_to_set) {
        for (var i = 0; i < value_to_reset.length; i++)
            document.querySelector(`div[ id=${query} ]`).classList.remove('col-' + value_to_reset[i]);
        document.querySelector(`div[ id=${query} ]`).classList.add('col-' + value_to_set);
    }
    static getValue(query) {
        const txtdiv = document.querySelector(`div[ id=${query} ]`);
        if (txtdiv && txtdiv.innerHTML)
            return txtdiv.innerHTML;
        return '';
    }
    static getYscrollTopValue(query) {
        const txtdiv = document.querySelector(`div[ id=${query} ]`);
        if (txtdiv)
            return txtdiv.scrollTop;
        return 0;
    }
    static setYscrollTopValue(query, value) {
        document.querySelector(`div[ id=${query} ]`).scrollTop = value;
    }
    static getYscrollTopSize(query) {
        const txtdiv = document.querySelector(`div[ id=${query} ]`);
        if (txtdiv)
            return txtdiv.scrollHeight;
        return 0;
    }
    static updateFinalLineValue(query, value) {
        var reader = div.getValue(query);
        div.setValue(query, `${reader}${reader.length ? '<br>' : ''}${value}`);
        div.setYscrollTopValue(query, div.getYscrollTopSize(query));
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
