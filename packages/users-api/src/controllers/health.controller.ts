import * as path from 'path';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
    DiskHealthIndicator,
    HealthCheck,
    HealthCheckResult,
    HealthCheckService,
    HttpHealthIndicator,
    MemoryHealthIndicator
} from '@nestjs/terminus';

import { PromiseRes } from '#shared/types';

import { SHARED } from '#shared/static';
import { USERS_API } from '#/static';

export interface IHealthController {
    get(): PromiseRes<string>;

    getCheckHealth(): PromiseRes<HealthCheckResult | unknown>;
}

@Controller('/')
export class HealthController implements IHealthController {
    constructor(
        private _healthServices: HealthCheckService,
        private _httpIndicator: HttpHealthIndicator,
        private _diskIndicator: DiskHealthIndicator,
        private _memoryIndicator: MemoryHealthIndicator
    ) {}

    @Get('/')
    @ApiOperation({ summary: 'Check' })
    async get(): PromiseRes<string> {
        return { message: 'Check', payload: 'payload' };
    }

    @Get(USERS_API.healthRoute)
    @ApiOperation({ summary: 'Check Healthy Studio API health' })
    @HealthCheck()
    async getCheckHealth(): PromiseRes<HealthCheckResult> {
        try {
            const healthRes: HealthCheckResult =
                await this._healthServices.check([
                    () =>
                        this._httpIndicator.pingCheck(
                            'ping',
                            `${SHARED.localhostUrl}:${USERS_API.port}/`
                        ),
                    () =>
                        this._httpIndicator.responseCheck(
                            'response',
                            `${SHARED.localhostUrl}:${USERS_API.port}/`,
                            (response) => response.status === HttpStatus.OK
                        ),
                    () =>
                        this._diskIndicator.checkStorage('storage', {
                            path: path.parse(process.cwd()).root,
                            thresholdPercent: SHARED.health.diskThresholdPercent
                        }),
                    () =>
                        this._memoryIndicator.checkRSS(
                            'memory',
                            SHARED.health.memoryRSSThreshold
                        ),
                    () =>
                        this._memoryIndicator.checkHeap(
                            'memory',
                            SHARED.health.memoryHeapThreshold
                        )
                ]);
            return {
                message: 'Successfully get health status',
                payload: healthRes
            };
        } catch (error: unknown) {
            throw new Error(error ? error['message'] : 'Healthcheck error');
        }
    }
}
