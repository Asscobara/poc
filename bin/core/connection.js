"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerialPort = require("serialport");
class Connection {
    init(name, dataRecivedCallback) {
        this._name = name;
        this._onDataRecivedCallback = dataRecivedCallback;
    }
    onDataRecived(data) {
        if (this._onDataRecivedCallback) {
            this._onDataRecivedCallback(data);
        }
    }
    get name() {
        return this._name;
    }
}
exports.Connection = Connection;
class SerialConection extends Connection {
    init(name, dataRecivedCallback) {
        super.init(name, dataRecivedCallback);
        this._com = new SerialPort('/dev/tty.iPhone-WirelessiAPv2', { baudRate: 19200 }, (err) => {
            if (err) {
                this.onDataRecived(`Open Error:  ${err.message}`);
            }
        });
    }
}
exports.SerialConection = SerialConection;
class HttpConnection extends Connection {
}
exports.HttpConnection = HttpConnection;
