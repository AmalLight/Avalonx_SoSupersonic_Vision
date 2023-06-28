"use strict";
function reqListenerShare() { textarea.updateLineValue('infos1', this.responseText); }
function reqListenerSmartphone() { label.updateLineValue('infos2', this.responseText); }
function Ainsert(monitor) {
    var readName = '';
    var readHash = '';
    var readValues = '';
    var readShort = '';
    const oReq = new XMLHttpRequest();
    if (monitor.getDevice() == Monitor.pc() ||
        monitor.getDevice() == Monitor.tablet()) {
        readName = input.getValue('name1');
        readHash = input.getValue('hash1');
        readValues = textarea.getValue('values1');
        textarea.updateLineValue('infos1', `insert name=${readName}, hash=${readHash}, for values..`);
        oReq.onload = reqListenerShare;
    }
    else if (monitor.getDevice() == Monitor.smartphone()) {
        readName = input.getValue('name2');
        readHash = input.getValue('hash2');
        readValues = textarea.getValue('values2');
        readShort = '1';
        label.updateLineValue('infos2', 'insert for values..');
        oReq.onload = reqListenerSmartphone;
    }
    oReq.open('POST', '/csv', true);
    oReq.setRequestHeader('Content-Type', 'application/json');
    oReq.send(JSON.stringify({
        'name': readName,
        'hash': readHash,
        'values': readValues,
        'short': readShort
    }));
}
function Alist(monitor, ip) {
    if (monitor.getDevice() == Monitor.pc() ||
        monitor.getDevice() == Monitor.tablet())
        textarea.updateLineValue('infos1', `http://${ip}/csv/`);
    else if (monitor.getDevice() == Monitor.smartphone())
        label.updateLineValue('infos2', `http://${ip}/csv/`);
}
function Aread() {
    const readName = input.getValue('name1');
    const readHash = input.getValue('hash1');
    const oReq = new XMLHttpRequest();
    textarea.updateLineValue('infos1', `read for name=${readName} , hash=${readHash} ..`);
    oReq.onload = reqListenerShare;
    oReq.open('POST', '/read', true);
    oReq.setRequestHeader('Content-Type', 'application/json');
    oReq.send(JSON.stringify({
        'name': readName,
        'hash': readHash
    }));
}
