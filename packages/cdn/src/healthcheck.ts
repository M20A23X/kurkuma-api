import * as http from 'http';
import { LOCALHOST_URL } from '#shared/static';
import { CDN_PORT, HEALTH_ROUTE } from '#/static';

http.get(`${LOCALHOST_URL}:${CDN_PORT}${HEALTH_ROUTE}`);
