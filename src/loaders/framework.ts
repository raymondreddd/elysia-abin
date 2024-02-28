import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors';
import { rateLimit } from 'elysia-rate-limit';
import { logger } from '@bogeychan/elysia-logger';
import { jwt } from '@elysiajs/jwt';

/**
 * @context Setting middlewares and framewroks for server to use
 * 
 * @description Cors
 * @description ratelimit: maximum 50 request from client under 60 seconds
 */
export const plugin = new Elysia()
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
    .decorate('plugin', 'hi')
    .get('/plugin', ({ plugin }) => plugin)