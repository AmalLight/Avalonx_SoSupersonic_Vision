"use strict";
function cure(match) {
    while (match.includes('°t'))
        match = match.replace('°t', '    ');
    while (match.includes('°n'))
        match = match.replace('°n', '\n');
    return match;
}
function getCurrentWord(text, car) {
    var car_copy = car;
    while (car_copy > 0 &&
        text[car_copy - 1] != ' ' &&
        text[car_copy - 1] != '\n' &&
        text[car_copy - 1] != '\t' &&
        text[car_copy - 1] != '\r')
        car_copy--;
    return text.substring(car_copy, car);
}
function readHist(query, readBefore) {
    const textH = readBefore.text;
    const carH = readBefore.car;
    textarea.setValue(query, textH);
    textarea.setCaret(query, carH);
}
function hover_description(dict, nm_short, direct) {
    if (direct)
        label.setValue('description', dict);
    else
        label.setValue('description', classe[dict][nm_short][1]);
}
function click_textwrite(dict, nm_short, direct, del) {
    textarea.delPosCurrentRow('values1b', del);
    if (direct)
        textarea.updateCurrentRowValue('values1b', dict);
    else
        textarea.updateCurrentRowValue('values1b', cure(classe[dict][nm_short][0]));
    point_reset();
    textarea.focusOn('values1b');
}
function point_reset() {
    label.setValue('description', 'Description');
    div.clearValue('infos1');
}
