type Req<K extends string, V = object> = {
    [key in K]: V | null;
};

type ResMessage = { message: string };
type ResPayload<P> = { payload: P };
type Res<P = void> = P extends void ? ResMessage : ResMessage & ResPayload<P>;
type PromiseRes<P = void> = Promise<Res<P>>;

export type { Req, Res, PromiseRes };
