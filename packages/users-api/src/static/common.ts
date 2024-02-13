import * as process from 'process';

const port: number = parseInt(process.env.USERS_API_PORT ?? '5003');
const healthRoute: string = '/health';

const USERS_API = { port, healthRoute };

export { USERS_API };
