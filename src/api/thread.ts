import { Elysia, t } from "elysia"
import { isAuthenticated } from "../hooks/authHooks";

export const ThreadRouter = new Elysia({ prefix: '/thread' })
    .post(
        '/',
        async ({ }) => {
            console.log('signup hit');
        },
        {
            beforeHandle: [isAuthenticated],
        }
    )
    .get('/me', ({ }) => {
    })
    .onError(({ error }) => {
        console.log('Error in Thread:', error);
    })

