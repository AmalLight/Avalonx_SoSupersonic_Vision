"use strict";
class Histor {
    constructor(max) {
        this.collection = Array();
        this.max_of_coll = 30;
        this.stat = 0;
        this.ready = true;
        this.max_of_coll = max;
    }
    getCollLength() { return this.collection.length; }
    getCollection() { return this.collection; }
    getStat() { return this.stat; }
    add(query) {
        var todo = false;
        if (this.ready) {
            this.ready = false;
            const textp = textarea.getValue(query);
            const carp = textarea.getCaret(query);
            if (this.stat == 0) {
                if (this.collection.length >= this.max_of_coll)
                    this.collection = this.collection.slice(5);
                if (this.collection.length == 0 ||
                    this.collection[this.collection.length - 1].text != textp)
                    todo = true;
                if (todo)
                    this.collection.push({ text: textp, car: carp });
            }
            this.ready = true;
        }
        return todo;
    }
    reset() {
        if (this.stat != 0) {
            this.collection = this.collection.splice(0, this.stat);
            this.stat = 0;
        }
    }
    prev() {
        if (this.stat <= 0)
            this.stat = this.collection.length;
        if (this.stat > 1)
            this.stat = this.stat - 1;
        return this.read();
    }
    next() {
        if (this.stat != 0)
            this.stat = this.stat + 1;
        if (this.stat >= this.collection.length)
            this.stat = 0;
        return this.read();
    }
    read() {
        if (this.stat <= 0)
            return this.collection[this.collection.length - 1];
        else
            return this.collection[this.stat - 1];
    }
}
