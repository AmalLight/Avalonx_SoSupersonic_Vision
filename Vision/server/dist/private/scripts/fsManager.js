"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const fs_1 = __importDefault(require("fs"));
class Manager {
    static WriteNewFileCSV(fullFileName, csv) {
        const firstExists = Manager.existFileCSV(fullFileName, csv, false);
        if (!Manager.existFileCSV(fullFileName, csv, true, firstExists)) {
            fs_1.default.writeFileSync(fullFileName, csv.valuesStrGet());
            Manager.existFileCSV(fullFileName, csv, true, true);
        }
        csv.resSend(csv.outputGet());
    }
    static AppendRowsCSV(fullFileName, csv) {
        var tempNewFullName = fullFileName;
        var newFullFileName = tempNewFullName;
        for (var int = 2; int < csv.limitFilesGet(); int++)
            if (Manager.existFileCSV(tempNewFullName = fullFileName.replace('_1.csv', `_${int}.csv`), csv, false))
                newFullFileName = tempNewFullName;
            else
                break;
        const valuesStr = csv.valuesStrGet();
        const rows2 = Manager.readLinesCSV(newFullFileName, true).split(csv.symbolLines());
        const rows1 = valuesStr.split(csv.symbolLines());
        const row2 = (rows2 ? rows2[0] : null);
        const bool = csv.validateROWS(rows1, false, row2);
        if (bool) {
            if (rows2.length + valuesStr.split(csv.symbolColums()).length < csv.limitRowsGet())
                fs_1.default.appendFileSync(newFullFileName, `\n${valuesStr}`);
            else
                fs_1.default.appendFileSync((newFullFileName = tempNewFullName), valuesStr);
            if (csv.shortGet())
                csv.outputUpdate('Append Sync on File done.');
            else
                csv.outputUpdate(`Append Sync on File ${newFullFileName} done.`);
            csv.resSend(csv.outputGet());
        }
    }
    static readLinesCSV(fullFileName, exists) {
        if (exists) {
            var document = fs_1.default.readFileSync(fullFileName);
            return document.toString();
        }
        else
            return '';
    }
    static getFilesCSV(csv) {
        const listRead = fs_1.default.readdirSync(`${csv.mainGet()}/CSV/`);
        if (!csv.nameBoolGet() && !csv.hashBoolGet())
            return listRead.join('\n');
        else {
            var listOutput = [];
            for (var i = 0; i < listRead.length; i++)
                if (csv.nameBoolGet())
                    if (listRead[i].indexOf(csv.nameStrGet()) > -1)
                        if (csv.hashBoolGet())
                            if (listRead[i].indexOf(csv.hashStrGet()) > -1)
                                listOutput.push(listRead[i]);
                            else {
                                ;
                            }
                        else
                            listOutput.push(listRead[i]);
                    else {
                        ;
                    }
                else if (csv.hashBoolGet() && listRead[i].indexOf(csv.hashStrGet()) > -1)
                    listOutput.push(listRead[i]);
                else {
                    ;
                }
            return listOutput.join('\n');
        }
    }
    static existFileCSV(fullFileName, csv, show = true, end = true) {
        const exists = fs_1.default.existsSync(fullFileName);
        if (show)
            if (csv.shortGet())
                csv.outputUpdate(`csv file exists ? ${exists}.${end ? '' : '\n'}`);
            else
                csv.outputUpdate(`csv file ${fullFileName} exists ? ${exists}.${end ? '' : '\n'}`);
        return exists;
    }
}
exports.Manager = Manager;
