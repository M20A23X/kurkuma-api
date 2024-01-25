import { Response } from 'express';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { HttpExceptionBody } from '@nestjs/common/interfaces/http/http-exception-body.interface';

import { Res, ServiceCode } from '#/types';

import { Exception } from '#/exceptions';

import { SERVICE_CODE_MESSAGE_DICT, SERVICE_CODE_STATUS_DICT } from '#/static';

const handleException = (exception: Error, host: ArgumentsHost): object => {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res: Response = ctx.getResponse<Response>();

    let serviceCode: ServiceCode = 'UNEXPECTED_ERROR';
    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let messageRaw: string = getMessageByServiceCode('UNEXPECTED_ERROR');

    if (exception instanceof Exception) {
        messageRaw = exception.message;
        serviceCode = exception.code;
        status = SERVICE_CODE_STATUS_DICT[serviceCode];
    } else {
        const exceptionCasted: HttpException = exception as HttpException;
        const res: string | object | undefined = exceptionCasted?.getResponse();
        if (typeof res === 'object') {
            const resCasted: HttpExceptionBody = res as HttpExceptionBody;
            messageRaw =
                resCasted.message instanceof Array
                    ? resCasted.message[0]
                    : resCasted.message;
            status = resCasted.statusCode;
        } else if (typeof res === 'string') messageRaw = res;
    }

    console.error(exception.stack);

    const json: Res = { message: `Error: ` + messageRaw };
    return res.status(status).json(json);
};

const getMessageByServiceCode = (code: ServiceCode, entity?: string) =>
    SERVICE_CODE_MESSAGE_DICT[code](entity);

export { handleException, getMessageByServiceCode };
