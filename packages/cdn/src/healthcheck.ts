import * as http from 'http';
import { SHARED } from '#shared/static';
import { CDN } from '#/static';

http.get(`${SHARED.localhostUrl}:${CDN.port}${CDN.healthRoute}`);
