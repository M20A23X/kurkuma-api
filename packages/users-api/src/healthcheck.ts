import * as http from 'http';
import { SHARED } from '#shared/static';
import { USERS_API } from '#/static';

http.get(`${SHARED.localhostUrl}:${USERS_API.port}${USERS_API.healthRoute}`);
