import * as path from 'path';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
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

import {
    HEALTH_DISK_THRESHOLD_PERCENT,
    LOCALHOST_URL,
    HEALTH_MEM_HEAP_THRESHOLD,
    HEALTH_MEM_RSS_THRESHOLD
} from '#shared/static';
import { CDN_PORT, HEALTH_ROUTE } from '#/static';

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

    @Get(HEALTH_ROUTE)
    @ApiOperation({ summary: 'Check CDN health' })
    @HealthCheck()
    async getCheckHealth(): PromiseRes<HealthCheckResult> {
        try {
            const healthRes: HealthCheckResult =
                await this._healthServices.check([
                    () =>
                        this._httpIndicator.pingCheck(
                            'ping',
                            `${LOCALHOST_URL}:${CDN_PORT}/`
                        ),
                    () =>
                        this._httpIndicator.responseCheck(
                            'response',
                            `${LOCALHOST_URL}:${CDN_PORT}/`,
                            (response) => response.status === HttpStatus.OK
                        ),
                    () =>
                        this._diskIndicator.checkStorage('storage', {
                            path: path.parse(process.cwd()).root,
                            thresholdPercent: HEALTH_DISK_THRESHOLD_PERCENT
                        }),
                    () =>
                        this._memoryIndicator.checkRSS(
                            'memory',
                            HEALTH_MEM_RSS_THRESHOLD
                        ),
                    () =>
                        this._memoryIndicator.checkHeap(
                            'memory',
                            HEALTH_MEM_HEAP_THRESHOLD
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
