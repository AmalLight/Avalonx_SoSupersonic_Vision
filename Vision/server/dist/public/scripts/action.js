"use strict";
function onclicktable(query, colors) {
    if (query == 'values1a') {
        if (document.querySelector(`div[ id=${query} ] `)?.classList.contains('col-1'))
            div.setValue(query, HTMLfromTEXT(textarea.getValue('values1b'), colors));
        div.setColClass(query, ['1', '9'], '9');
        textarea.setColClass('values1b', ['1', '9'], '1');
    }
    else if (query == 'values1b') {
        div.setColClass('values1a', ['1', '9'], '1');
        textarea.setColClass(query, ['1', '9'], '9');
    }
}
function onscrolltable(query) {
    if (query == 'values1a')
        textarea.setYscrollTopValue('values1b', div.getYscrollTopValue(query));
    else if (query == 'values1b')
        div.setYscrollTopValue('values1a', textarea.getYscrollTopValue(query));
}
function onkeyupcsv(event, colors, classe, monitor, saveFile) {
    if (event.keyCode == 13) {
        const value = input.getValue('getcsv');
        const list = value.split(' ');
        if (list.length == 2 && list[0] && list[1]) {
            const oReq = new XMLHttpRequest();
            var find = false;
            if ((list[0] == 'save') &&
                (monitor.getDevice() == Monitor.pc()))
                saveFile.setOn(list[1]).saveTheFile();
            else if (list[0] == 'get' && (find = true))
                if (monitor.getDevice() == Monitor.smartphone())
                    oReq.onload = function () {
                        textarea.setValue('values2', this.responseText);
                    };
                else {
                    saveFile.reset();
                    div.updateFinalLineValue('infos1', `reset done : ${saveFile.getReady()}`);
                    oReq.onload = function () {
                        textarea.setValue('values1b', this.responseText);
                    };
                }
            else if ((list[0] == 'read') &&
                (monitor.getDevice() == Monitor.pc()) &&
                (find = true)) {
                div.updateFinalLineValue('infos1', `read ${list[1]} for csv runned`);
                oReq.onload = function () {
                    moreVariables(this.responseText, colors, classe);
                };
                list[1] += '.csv';
            }
            if (list[0] == 'save' || list[0] == 'get')
                document.title = `Vision - ${list[1]}`;
            if (find) {
                oReq.open('GET', `/get?${list[1]}`, true);
                oReq.send();
            }
        }
    }
}
function pure(split_col, correct, rows, colors, classe) {
    for (var i = 0; i < rows.length; i++)
        if (rows[i] && rows[i].indexOf(split_col) &&
            rows[i].split(split_col).length == correct) {
            const row = rows[i].split(split_col);
            const nm_class = '' + row[0];
            const nm_short = '' + row[1];
            colors[nm_class] = ['', 'darkviolet', '32', '1'];
            if (!(nm_class in classe))
                classe[nm_class] = {};
            if (nm_short in classe[nm_class])
                delete classe[nm_class][nm_short];
        }
}
function moreVariables(text, colors, classe) {
    const split_row = '\n';
    const split_col = ',,,';
    const correct = 7;
    if (text[text.length - 1] == '\n')
        text = text.substring(0, text.length - 1);
    const rows = text.split(split_row);
    pure(split_col, correct, rows, colors, classe);
    for (var i = 0; i < rows.length; i++)
        if (rows[i] && rows[i].indexOf(split_col) &&
            rows[i].split(split_col).length == correct) {
            const row = rows[i].split(split_col);
            const nm_class = '' + row[0];
            const nm_short = '' + row[1];
            const nm_full = '' + row[2];
            const descript = '' + row[3];
            const backgrnd = '' + row[4];
            const colorTxT = '' + row[5];
            const insText = '' + row[6];
            if (!(nm_short in classe[nm_class])) {
                classe[nm_class][nm_short] = [nm_full, descript];
                colors[nm_short] = [backgrnd, colorTxT, insText];
            }
            else {
                const old_full = classe[nm_class][nm_short][0];
                const old_desc = classe[nm_class][nm_short][1];
                classe[nm_class][nm_short] =
                    [
                        (old_full ? old_full : '') + (nm_full ? "°n" : "") + nm_full,
                        (old_desc ? old_desc : '') + descript
                    ];
            }
        }
        else {
            div.updateFinalLineValue('infos1', `error<br>for<br>${i + 1}`);
            break;
        }
}
