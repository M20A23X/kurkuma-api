import * as http from 'http';
import { SHARED } from '#shared/static';
import { HEALTHY_STUDIO } from '#/static';

http.get(
    `${SHARED.localhostUrl}:${HEALTHY_STUDIO.port}${HEALTHY_STUDIO.healthRoute}`
);
