
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

        SerialPort.list().then( (ports) => {
            for (let port of ports) {
                this._availablePorts.push(port);
                this.onDataRecived(`Port found: '${port.path}', Full port info: ${JSON.stringify(port)}`);
            }
        });
        
        this._port = new SerialPort('/dev/tty.Bluetooth-Incoming-Port', {baudRate : 19200, autoOpen: false}, (err: Error) => {
            if (err) {
                this.onDataRecived(`Open Error:  ${err.message}`);
            }
        });

        this._port.open( (err) => {
            if (err) {
                return this.onDataRecived(`Error opening port: ${err.message}`);
            }          
            // Because there's no callback to write, write errors will be emitted on the port:
            this._port.write('main screen turn on');
        });
          
          // The open event is always emitted
        this._port.on('open', function() {
            this.onDataRecived("Port opend")
        });

        this._port.on('readable', function () {
            this.onDataRecived(`Data: ${this._port.read()}`);
        });
        
        // Switches the port into "flowing mode"
        this._port.on('data', function (data) {
            this.onDataRecived(`Data: ${data}`);
        });
    }

    private _port: SerialPort;
    private _availablePorts: any[] = [];
}

export class HttpConnection extends Connection<string> {
    
}