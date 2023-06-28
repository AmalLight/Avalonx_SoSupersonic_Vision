"use strict";
function modelText(event, classe, colors) {
    const query = 'values1b';
    var car = textarea.getCaret(query);
    var text = textarea.getValue(query);
    var word = getCurrentWord(text, car);
    const key_to_ignore = [8, 16, 17, 35, 37, 38, 39, 40, 46, 89, 90];
    const selected = '' + textarea.getSelection(query);
    const vaildCombo = function (event) {
        return (selected == '') && (key_to_ignore.indexOf(event.keyCode) == -1);
    };
    if (word == '.') {
        var collect = '';
        for (var dict in classe)
            collect += miniHTMLfromTEXT(dict, colors).replace('>', `onmouseover="hover_description( '${dict}' , '' , true     )" ` +
                `onclick="click_textwrite(   '${dict}' , '' , true , 1 )" ` +
                '>') + '<br>';
        div.setValue('infos1', collect);
    }
    else if (word.length &&
        (word.lastIndexOf('.') == word.length - 1) &&
        (word.replace('.', '') in classe)) {
        var dict = word.replace('.', '');
        var collect = '';
        for (var nm_short in classe[dict])
            collect += miniHTMLfromTEXT(nm_short, colors).replace('>', `onmouseover="hover_description( '${dict}' , '${nm_short}' , false                      )" ` +
                `onclick="click_textwrite(   '${dict}' , '${nm_short}' , false , ${dict.length + 1} )" ` +
                '>') + '<br>';
        div.setValue('infos1', collect);
    }
    if (event.keyCode == 36) {
        var i = car;
        while (i + 1 < text.length && text[i] == ' ')
            i++;
        textarea.setCaret(query, i);
    }
    else if (event.keyCode == 13) {
        var sub = text.substring(0, car - 1);
        var new_line_i = sub.lastIndexOf('\n');
        var i = (new_line_i > -1 ? new_line_i + 1 : 0);
        var space = '';
        while (i < text.length && text[i++] == ' ')
            space += ' ';
        if (getCurrentWord(text, car - 1) == '{')
            space += '    ';
        textarea.updateCurrentRowValue(query, space);
    }
    else if (word == '=' && vaildCombo(event))
        textarea.updateCurrentRowValue(query, ' °');
    else if (word == ',' && vaildCombo(event))
        textarea.updateCurrentRowValue(query, ' °');
    else if (word == ":" && vaildCombo(event))
        textarea.updateCurrentRowValue(query, " °");
    else if (word == "'" && vaildCombo(event))
        textarea.updateCurrentRowValue(query, "°'");
    else if (word == '"' && vaildCombo(event))
        textarea.updateCurrentRowValue(query, '°"');
    else if (word == '[' && vaildCombo(event))
        textarea.updateCurrentRowValue(query, ' ° ]');
    else if (word == '(' && vaildCombo(event))
        textarea.updateCurrentRowValue(query, ' ° )');
    else if (word == '{' && vaildCombo(event))
        textarea.updateCurrentRowValue(query, ' ° }');
    else if (word == '}' && vaildCombo(event)) {
        textarea.setCaret(query, car - 1);
        historZY({ keyCode: 8 }, new Histor(0), new Save());
    }
}
