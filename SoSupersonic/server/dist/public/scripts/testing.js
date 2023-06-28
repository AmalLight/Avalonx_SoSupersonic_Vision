"use strict";
function reqListener() {
    document.getElementById('temporary').value = this.responseText;
}
function testing(readName, readHash, readValues, readShort) {
    const oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open('POST', '/csv', true);
    oReq.setRequestHeader('Content-Type', 'application/json');
    oReq.send(JSON.stringify({
        'name': readName,
        'hash': readHash,
        'values': readValues,
        'short': readShort
    }));
}
function testInit() {
    const oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open('GET', '/test?init', true);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.send(JSON.stringify({}));
}
function multiplyLine(str, int) {
    var da_ritorno = str;
    for (var i = 0; i < (int - 1); i++)
        da_ritorno += `\n${str}`;
    return da_ritorno;
}
