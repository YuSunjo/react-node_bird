import { getConnectionOptions, createConnection, useContainer } from 'typeorm';
import Container from 'typedi';
import config from '@src/config';

export default async function createDatabaseConnection() {
  try {
    useContainer(Container);
    const connectionOptions = await getConnectionOptions(config.server.env);
    await createConnection({ ...connectionOptions, name: 'default' });
  } catch (error) {
    console.error(error);
  }
}
