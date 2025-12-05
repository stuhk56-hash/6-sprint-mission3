"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const validator = (req, res, next) => {
    req.valid = true;
    next();
};
const handler = (req, res, next) => {
    req.cookies;
    res.send();
};
app.use(handler);
app.get('/valid', validator, (req, res) => {
    console.log(req.valid);
    res.send('valid');
});
app.get('/invalid', (req, res) => {
    console.log(req.valid);
    res.send('invalid');
});
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send();
});
app.listen(3000, () => {
    console.log('Server running on port 3000!');
});
