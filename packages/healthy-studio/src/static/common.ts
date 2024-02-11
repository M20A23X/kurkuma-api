import * as process from 'process';

const port: number = parseInt(process.env.HEALTHY_STUDIO_API_PORT ?? '5002');
const healthRoute: string = '/health';

const HEALTHY_STUDIO = { port, healthRoute };

export { HEALTHY_STUDIO };
