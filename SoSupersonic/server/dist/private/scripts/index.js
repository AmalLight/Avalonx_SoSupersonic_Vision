"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const csv_1 = require("./csv");
const fsManager_1 = require("./fsManager");
const app = (0, express_1.default)();
const mainPublic = `${__dirname}/../../public`;
const limitRows = 300;
const limitFiles = 99;
var ArrayCSV = [];
ListenerSlice();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/static', express_1.default.static(`${mainPublic}`));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(`${mainPublic}/html/index.html`), (err) => {
        if (err)
            console.log('error occurred for "html send file"');
        else
            console.log('html sent file');
    });
});
app.get('/test', (req, res) => {
    if (req.url == '/test?init') {
        fsManager_1.Manager.deleteFilesCSV(mainPublic, 'nome_file_0_457d3bd73bf722bdec9154828017cad9_1.csv');
        fsManager_1.Manager.deleteFilesCSV(mainPublic, 'nome_file_0_457d3bd73bf722bdec9154828017cad9_2.csv');
        fsManager_1.Manager.deleteFilesCSV(mainPublic, 'nome_file_0_457d3bd73bf722bdec9154828017cad9_3.csv');
        fsManager_1.Manager.deleteFilesCSV(mainPublic, 'nome_file_1_457d3bd73bf722bdec9154828017cad9_1.csv');
        fsManager_1.Manager.deleteFilesCSV(mainPublic, 'nome_file_1_457d3bd73bf722bdec9154828017cad9_2.csv');
        fsManager_1.Manager.deleteFilesCSV(mainPublic, 'nome_file_1_457d3bd73bf722bdec9154828017cad9_3.csv');
        fsManager_1.Manager.deleteFilesCSV(mainPublic, 'testmakecode1_c414b307f67ddee88d24da81e27aad8a_1.csv');
        fsManager_1.Manager.deleteFilesCSV(mainPublic, 'testmakecode2_c414b307f67ddee88d24da81e27aad8a_1.csv');
        res.send('init done');
        res.end();
    }
    else
        res.sendFile(path_1.default.join(`${mainPublic}/html/test.html`), (err) => {
            if (err)
                console.log('error occurred for "html send file"');
            else
                console.log('html sent file');
        });
});
app.post('/csv', (req, res) => {
    const name = ((req.body.name && req.body.name.length > 0) ? req.body.name : '');
    const hash = ((req.body.hash && req.body.hash.length > 0) ? req.body.hash : '');
    const values = ((req.body.values && req.body.values.length > 0) ? req.body.values : '');
    const short = ((req.body.short && req.body.short.length > 0) ? true : false);
    if ((!name) || name.length < 1 ||
        (!values) || values.length < 1) {
        res.send('body written wrong');
        res.end();
    }
    else
        ArrayCSV.push(new csv_1.CSV(name, hash, values, mainPublic, limitFiles, limitRows, short, res));
});
app.post('/read', (req, res) => {
    var name = ((req.body.name && req.body.name.length > 0) ? req.body.name : '');
    var hash = ((req.body.hash && req.body.hash.length > 0) ? req.body.hash : '');
    const csv = new csv_1.CSV(name, hash, '', mainPublic, 0, 0, false, res);
    const output = fsManager_1.Manager.getFilesCSV(csv);
    csv.resSend((output ? output : 'none'));
});
app.listen(8080, '0.0.0.0', () => { console.log('server started'); });
function ListenerSlice() {
    setInterval(() => {
        while (ArrayCSV.length > 0) {
            ArrayCSV[0].actions();
            ArrayCSV = ArrayCSV.slice(1);
        }
    }, 1000);
}
