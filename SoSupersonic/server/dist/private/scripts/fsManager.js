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
        for (var int = 1; int < csv.limitFilesGet(); int++)
            if (Manager.existFileCSV(tempNewFullName = fullFileName.replace('_1.csv', `_${int}.csv`), csv, false))
                newFullFileName = tempNewFullName;
            else if (int == 1) {
                csv.resSend(`File does not exist for _${int}.csv`);
                return;
            }
            else
                break;
        const valuesStr = csv.valuesStrGet();
        const rows2 = Manager.readLinesCSV(newFullFileName, true).split(csv.symbolLines());
        const rows1 = valuesStr.split(csv.symbolLines());
        const row2 = (rows2 ? rows2[0] : null);
        if (csv.validateROWS(rows1, false, row2)) {
            if ((rows2.length <= csv.limitRowsGet() / 2) ||
                (rows2.length + valuesStr.split(csv.symbolColums()).length <= csv.limitRowsGet()))
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
        if (exists)
            return fs_1.default.readFileSync(fullFileName).toString();
        else
            return '';
    }
    static getFilesCSV(csv) {
        const listRead = fs_1.default.readdirSync(`${csv.mainGet()}/CSV/`);
        var listOutput = [];
        for (var i = 0; i < listRead.length; i++)
            if (((!csv.nameBoolGet()) ||
                (listRead[i].indexOf(csv.nameStrGet()) > -1)) && ((!csv.hashBoolGet()) ||
                (listRead[i].indexOf(csv.hashStrGet()) > -1)))
                listOutput.push(listRead[i]);
        return listOutput.join('\n');
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
    static deleteFilesCSV(mainGet, file) {
        if (fs_1.default.existsSync(`${mainGet}/CSV/${file}`))
            fs_1.default.unlinkSync(`${mainGet}/CSV/${file}`);
    }
}
exports.Manager = Manager;
