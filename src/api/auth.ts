import { Elysia, t } from "elysia"
import User from "../models/user";
import jwt from "@elysiajs/jwt";
import AuthService from "../services/auth";

export const AuthRouter = new Elysia({ prefix: '/auth' })

    .use(
        jwt({
            name: 'jwt',
            secret: process.env.JWT_SECRET
        })
    )
    .guard({
        body: t.Object({
            username: t.String(),
            email: t.String(),
            password: t.String(),

        })
    })
    .post('/signup', async ({ body }) => {
        try {
            console.log('signup hit');
            const result = await AuthService.signup({
                username: body.username,
                email: body.email,
                password: body.password,
            })
        } catch (error) {

        }
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

