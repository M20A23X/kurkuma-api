type ServiceCode =
    | 'NO_TOKEN'
    | 'NO_SESSION'
    | 'SESSION_EXPIRED'
    | 'IP_CHANGED'
    | 'NOT_FOUND'
    | 'NOT_PROVIDED'
    | 'BAD_REQUEST'
    | 'UNACCEPTABLE_EXT'
    | 'UNACCEPTABLE_NAME'
    | 'ER_DUP_ENTRY'
    | 'ER_NO_REFERENCED_ROW_2'
    | 'PASSWORDS_DONT_MATCH'
    | 'UNEXPECTED_DB_ERROR'
    | 'UNEXPECTED_ERROR';

type Req<K extends string, V = object> = {
    [key in K]: V | null;
};

type ResMessage = { message: string };
type ResPayload<P> = { payload: P };
type Res<P = void> = P extends void ? ResMessage : ResMessage & ResPayload<P>;
type PromiseRes<P = void> = Promise<Res<P>>;

type MessagePayload = object | string | undefined;

export type { ServiceCode, Req, Res, PromiseRes, MessagePayload };
