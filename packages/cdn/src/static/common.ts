import * as process from 'process';

const CDN_PORT: number = parseInt(process.env.CDN_PORT ?? '5001');
const HEALTH_ROUTE: string = '/health';

export { CDN_PORT, HEALTH_ROUTE };
