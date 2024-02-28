import { Elysia } from "elysia"

export const AuthRouter = new Elysia({ prefix: "/auth" })
    .get('/signup', ({ }) => { })
    .post('/signin', ({ }) => { })

