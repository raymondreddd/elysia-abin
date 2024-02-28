import { Elysia, t } from "elysia"

export const UserRouter = new Elysia({ prefix: '/user' })
    .post('/', ({ }) => {
        console.log('signup hit');
    })
    .get('/me', ({ }) => {
    })
    .onError(({ error }) => {
        console.log('Error in User:', error);
    })

