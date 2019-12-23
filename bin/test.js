"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./core/logger");
const connection_1 = require("./core/connection");
function greeter(msg) {
    return msg;
}
logger_1.log(greeter('********************************* COM Port *********************************'));
let s = new connection_1.SerialConection();
s.init('test', (data) => logger_1.log(data));
