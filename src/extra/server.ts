import { Elysia } from "elysia";
import { AuthRouter } from "./api/auth";
import { UserRouter } from "./api/user";
import { cors } from '@elysiajs/cors';
import { rateLimit } from 'elysia-rate-limit';
import { logger } from '@bogeychan/elysia-logger';
import { isHtml } from '@elysiajs/html'

/**
 * @context This file can be used to create a server
 * this will be utilized in testing locally, unit tests.
 * 
 * @todo: 
 * 1. Rate Limiter
 * 2. Helmet ?
 * 3. json parser
 */
const Server = async () => {
    const app = new Elysia();

    app
        /**
         * @context Middlewares (plugins on all routes)
         * Intitialize using plugin, and using decorate
         * @description Cors
         * @description ratelimit: maximum 50 request from client under 60 seconds
         */
        .use(cors())
        .use(rateLimit({
            duration: 60000,
            max: 50
        }))
        .use(
            logger({
                level: 'info'
            })
        )
        .onBeforeHandle(({ set, request }) => {
            // Apply authentication middleware for all routes except '/login'
            // ctx.log.info('before handle called');
            if (isHtml(request)) {
                set.headers['Content-Type'] = 'application/json';
            }
            console.log('before handle')
            // if (ctx.request.url !== 'api/auth/signin') {
            //     return authenticateJWT(ctx);
            // }
        })
        .decorate('db', 'c')
        /**
         * @context Route handlers
         */
        .group('/api',
            (app) => app
                .get('/', (ctx) => {
                    ctx.log.info('Welcome to elysia API!');
                })
                .use(AuthRouter)
                .use(UserRouter)
        )
        .onError(({ code }) => {
            if (code === 'NOT_FOUND') return 'Route not found :('
        })
    process.on('SIGINT', app.stop);
    process.on('SIGTERM', app.stop);

    return { app };
}

export default Server;