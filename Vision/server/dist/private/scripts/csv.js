"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSV = void 0;
const md5_1 = __importDefault(require("md5"));
const fsManager_1 = require("./fsManager");
class CSV {
    constructor(name, hash, values, mainPublic, limitFiles, limitRows, iterator, short, res) {
        this.output = '';
        this.colDelimiter = ',,,';
        this.rowDelimiter = '\n';
        this.nameStr = name;
        this.hashStr = hash;
        this.valuesStr = values;
        this.nameBool = (this.nameStr && this.nameStr.length > 0);
        this.hashBool = (this.hashStr && this.hashStr.length > 0);
        this.valuesBool = (this.valuesStr && this.valuesStr.length > 0);
        this.shortBool = short;
        this.mainDirPublic = mainPublic;
        this.iterator = iterator;
        this.limitRows = limitRows;
        this.limitFiles = limitFiles;
        this.res = res;
    }
    outputUpdate(message) { this.output += message; }
    nameStrGet() { return this.nameStr; }
    hashStrGet() { return this.hashStr; }
    valuesStrGet() { return this.valuesStr; }
    nameBoolGet() { return this.nameBool; }
    hashBoolGet() { return this.hashBool; }
    shortGet() { return this.shortBool; }
    outputGet() { return this.output; }
    mainGet() { return this.mainDirPublic; }
    limitFilesGet() { return this.limitFiles; }
    limitRowsGet() { return this.limitRows; }
    iteratorGet() { return this.iterator; }
    symbolLines() { return this.rowDelimiter; }
    symbolColums() { return this.colDelimiter; }
    resSend(message) { this.res.send(message); this.res.end(); }
    actions() {
        if (this.inputValid()) {
            var rows = null;
            rows =
                (this.valuesStr ?
                    (this.valuesStr.indexOf(this.rowDelimiter) > -1 ?
                        this.valuesStr.split(this.rowDelimiter) : [this.valuesStr]) : null);
            const valid_input = this.validateROWS(rows);
            if (valid_input) {
                this.hashValid((rows ? rows[0] : ''));
                const fileName = `${this.nameStr}_${this.hashStr}_1.csv`;
                const fullFileName = `${this.mainDirPublic}/CSV/${fileName}`;
                if (!this.hashBool)
                    this.outputUpdate(`hash : ${this.hashStr}.\n`);
                if (!this.hashBool)
                    fsManager_1.Manager.WriteNewFileCSV(fullFileName, this);
                else
                    fsManager_1.Manager.AppendRowsCSV(fullFileName, this);
            }
        }
    }
    validateROWS(rows, self = true, firstRow = null) {
        const vaild_input = (rows &&
            (self || ((!self) && firstRow && firstRow.length > 0)));
        this.outputUpdate(`rows in values is valid ? ${vaild_input}.${vaild_input ? '\n' : ''}`);
        if ((!vaild_input) || (!rows)) {
            this.resSend(this.output);
            return false;
        }
        var columns = 1;
        if (self)
            if (rows[0].indexOf(this.colDelimiter) > -1)
                columns = rows[0].split(this.colDelimiter).length;
            else
                ;
        else if (firstRow && firstRow.indexOf(this.colDelimiter) > -1)
            columns = firstRow.split(this.colDelimiter).length;
        else
            columns = 0;
        for (let i = (self ? 1 : 0); i < rows.length; i++)
            if (columns < 1 || ((!rows[i]) || rows[i].split(this.colDelimiter).length != columns)) {
                this.outputUpdate(`rows ${i + 1} in values is not valid.`);
                this.resSend(this.output);
                return false;
            }
        return true;
    }
    inputValid() {
        const valid_input = (this.nameBool && this.valuesBool);
        this.outputUpdate(`input inserted is valid ? ${valid_input}.${valid_input ? '\n' : ''}`);
        if (valid_input)
            return true;
        else {
            this.resSend(this.output);
            return false;
        }
    }
    hashValid(row) {
        this.outputUpdate(`find hash value ? ${Boolean(this.hashBool)}.\n`);
        if (this.hashBool)
            return true;
        else if (row)
            this.hashStr = md5_1.default(row);
        return false;
    }
}
exports.CSV = CSV;
