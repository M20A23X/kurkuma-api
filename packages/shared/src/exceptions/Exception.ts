import { ServiceCode } from '#/types';

export class Exception extends Error {
    public readonly code: ServiceCode;

    constructor(
        context: string,
        serviceCode: ServiceCode = 'UNEXPECTED_ERROR'
    ) {
        super(serviceCode);
        this.code = serviceCode;
    }
}
