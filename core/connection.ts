
import * as SerialPort from 'serialport';

export abstract class Connection<T> {
  
    protected init(name: string, dataRecivedCallback: (data: T) => void) {
        this._name = name;
        this._onDataRecivedCallback = dataRecivedCallback;
    }

    protected onDataRecived(data: T) {
        if(this._onDataRecivedCallback) {
            this._onDataRecivedCallback(data);
        }
    }

    private _name: string;
    get name(): string {
        return this._name;
    }
    
    _onDataRecivedCallback: (data: T) => void;
}

export class SerialConection extends Connection<string> {
    
    init(name: string, dataRecivedCallback: (data: string) => void) {
        super.init(name, dataRecivedCallback);
        this._com = new SerialPort('/dev/tty.iPhone-WirelessiAPv2', {baudRate : 19200}, (err: Error) => {
            if (err) {
                this.onDataRecived(`Open Error:  ${err.message}`);
            }
        });
    }

    private _com: SerialPort;
}

export class HttpConnection extends Connection<string> {
    
}