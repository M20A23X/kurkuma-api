import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { handleException } from '#shared/utils';

@Catch()
export class ExceptionFilterImpl implements ExceptionFilter {
    public catch(exception: Error, host: ArgumentsHost): object {
        return handleException(exception, host);
    }
}
