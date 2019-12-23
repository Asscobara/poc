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
    constructor() {
        super(...arguments);
        this._availablePorts = [];
    }
    init(name, dataRecivedCallback) {
        super.init(name, dataRecivedCallback);
        SerialPort.list().then((ports) => {
            for (let port of ports) {
                this._availablePorts.push(port);
                this.onDataRecived(`Port found: '${port.path}', Full port info: ${JSON.stringify(port)}`);
            }
        });
        this._port = new SerialPort('/dev/tty.Bluetooth-Incoming-Port', { baudRate: 19200, autoOpen: false }, (err) => {
            if (err) {
                this.onDataRecived(`Open Error:  ${err.message}`);
            }
        });
        this._port.open((err) => {
            if (err) {
                return this.onDataRecived(`Error opening port: ${err.message}`);
            }
            // Because there's no callback to write, write errors will be emitted on the port:
            this._port.write('main screen turn on');
        });
        // The open event is always emitted
        this._port.on('open', function () {
            this.onDataRecived("Port opend");
        });
        this._port.on('readable', function () {
            this.onDataRecived(`Data: ${this._port.read()}`);
        });
        // Switches the port into "flowing mode"
        this._port.on('data', function (data) {
            this.onDataRecived(`Data: ${data}`);
        });
    }
}
exports.SerialConection = SerialConection;
class HttpConnection extends Connection {
}
exports.HttpConnection = HttpConnection;
