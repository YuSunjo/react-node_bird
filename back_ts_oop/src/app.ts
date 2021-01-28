import express from 'express';
import 'reflect-metadata';
import { Container } from 'typedi';
import bodyParser from 'body-parser';
import {
  useExpressServer,
  useContainer as routingUseContainer,
} from 'routing-controllers';
import createDatabaseConnection from './config/database';
import dotenv from 'dotenv';
import path from 'path';
import { routingControllerOptions } from './config/RoutingConfig';
import { useSwagger } from './config/swagger';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setDatabase();
    this.setMiddlewares();
  }

  private setConfig(): void {
    dotenv.config({
      path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
    });
  }

  private async setDatabase(): Promise<void> {
    try {
      await createDatabaseConnection();
    } catch (error) {
      console.error(error);
    }
  }

  private setMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  public async createExpressServer(port: number): Promise<void> {
    routingUseContainer(Container);
    useExpressServer(this.app, routingControllerOptions);
    useSwagger(this.app);

    try {
      this.app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
