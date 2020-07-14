import express from "express";
import { logger } from "./shared/Logger";
import { createServer, Server } from "http";

import { socketManagement } from "./models/Socket";
import { Room } from "./models/Room";

export class SetServer {
  private _app: express.Application;
  private server: Server;
  private port: number;
  private rooms: Room[];

  constructor() {
    this.port = 8080;
    this._app = express();
    this.server = createServer(this._app);
    this.rooms = [];
    this.listen();
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      logger.info(`Server is listening on port ${this.port}`);
      socketManagement(this.server, this.rooms);
    });
  }

  get app(): express.Application {
    return this._app;
  }
}
