import { Elysia } from "elysia";
import { AuthRouter } from "./api/auth";
import { UserRouter } from "./api/user";
import { cors } from '@elysiajs/cors';
import { rateLimit } from 'elysia-rate-limit';
import { logger } from '@bogeychan/elysia-logger';

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

    /**
     * @context Loaders  & Middlewares (plugins on all routes)
     * Intitialize using plugin, and using decorate
     * @throws
     * @description Cors
     * @description ratelimit: maximum 50 request from client under 60 seconds
     */

    app
        .use(cors())
        .use(rateLimit({
            duration: 60000,
            max: 50
        }))
        .use(
            logger({
                level: 'error'
            })
        )
    /**
     * @context Route handlers
     */
    app.group('/api',
        (app) => app
            .get('/', (ctx) => {
                console.log('Welcome to elysia API!');
            })
            .use(AuthRouter)
            .use(UserRouter)
    )
    process.on('SIGINT', app.stop);
    process.on('SIGTERM', app.stop);

    return { app };
}

export default Server;