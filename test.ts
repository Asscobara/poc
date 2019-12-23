import { log } from "./core/logger";
import { SerialConection } from "./core/connection";

function greeter(msg: string) {
    return msg;
  }

log(greeter('********************************* COM Port *********************************'));

let s = new SerialConection();
s.init('test', (data: string) => log(data));