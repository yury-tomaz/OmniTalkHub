import { Baileys } from "../baileys";

interface Props {
  connection: string | undefined,
  lastDisconnect: { error: Error | undefined; date: Date; } | undefined,
  qr: string | undefined,
  baileysInstance: Baileys,
}


export class ConnectionUpdateHandler {

  async  handle({connection, lastDisconnect, qr,  baileysInstance}:Props) {

  }
}