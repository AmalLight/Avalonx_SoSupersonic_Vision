"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const mainPublic = `${__dirname}/../../public`;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
function readFile(name, res) {
    var find = false;
    if (name.length > 0) {
        find = true;
        const dir = `${mainPublic}/FILES/${name}`;
        if (fs_1.default.existsSync(dir))
            res.sendFile(path_1.default.join(dir), (err) => {
                if (err)
                    console.log(`error occurred for "html send ${name}"`);
                else
                    console.log(`html sent ${name}`);
            });
        else
            find = false;
    }
    return find;
}
app.use('/static', express_1.default.static(`${mainPublic}`));
app.get('/get', (req, res) => {
    if (!readFile(req.url.replace('/get?', ''), res)) {
        res.send('not find');
        res.end();
    }
});
app.get('/hack', (req, res) => {
    if (!readFile(req.url.replace('/hack?', ''), res)) {
        res.send('not find');
        res.end();
    }
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(`${mainPublic}/html/index.html`), (err) => {
        if (err)
            console.log('error occurred for "html send index"');
        else
            console.log('html sent index');
    });
});
app.post('/save', (req, res) => {
    const text = (req.body.text ? req.body.text : '');
    const name = (req.body.name ? req.body.name : '');
    if (text && name) {
        const dir = `${mainPublic}/FILES/${name}`;
        fs_1.default.writeFileSync(dir, text);
        res.send('done');
    }
    res.end();
});
app.listen(8888, '0.0.0.0', () => { console.log('server started'); });
