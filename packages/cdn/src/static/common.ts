import * as process from 'process';

const port: number = parseInt(process.env.CDN_PORT ?? '5001');
const healthRoute: string = '/health';

const CDN = { port, healthRoute };

export { CDN };
