import { Elysia } from "elysia";
import { AuthRouter } from "./api/auth";

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
     * @context Loaders 
     * Intitialize using plugin, and using decorate
     * @throws
     */


    /**
     * @context Middlewares
     */


    /**
     * @context Route handlers
     */
    app.group('/api',
        (app) => app
            .use(AuthRouter)
            .get('/', ({ }) => {
                console.log('Welcome to elysia API!')
            })
    );

    return { app };
}

export default Server;