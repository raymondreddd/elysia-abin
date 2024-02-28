import { Elysia, t } from "elysia"

export const AuthRouter = new Elysia({ prefix: '/auth' })
    .guard({
        body: t.Object({
            username: t.String(),
            email: t.String(),
            password: t.String()
        })
    })
    .post('/signup', ({ }) => {
        console.log('signup hit');
    })
    .guard({
        body: t.Object({
            username: t.String(),
            password: t.String()
        })
    })
    .post('/signin', ({ }) => { })
    .onError(({ error }) => {
        console.log('Error in auth:', error);
    })

