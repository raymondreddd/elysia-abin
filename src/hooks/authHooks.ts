import { Context } from 'elysia';

export const isAuthenticated = async (ctx: Context<any>) => {
    // verify jwt
    //   const session = await getSession(ctx.request);
    //   if (!session) {
    //     ctx.set.status = 401;
    //     return 'Unauthorized';
    //   }
};