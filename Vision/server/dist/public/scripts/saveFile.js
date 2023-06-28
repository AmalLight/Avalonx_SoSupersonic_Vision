"use strict";
class Save {
    constructor() {
        this.name = '';
        this.ready = false;
        this.reset();
    }
    getName() { return this.name; }
    getReady() { return this.ready; }
    reset() {
        this.name = '';
        this.ready = false;
    }
    setOn(name) {
        this.name = name;
        this.ready = true;
        div.updateFinalLineValue('infos1', `setOn made for ${this.name}`);
        return this;
    }
    saveTheFile() {
        if (this.ready) {
            const oReq = new XMLHttpRequest();
            oReq.onload = () => { div.updateFinalLineValue('infos1', `file ${this.name} saved`); };
            oReq.open('POST', '/save', true);
            oReq.setRequestHeader('Content-Type', 'application/json');
            oReq.send(JSON.stringify({
                'name': this.name,
                'text': textarea.getValue('values1b')
            }));
        }
    }
}
