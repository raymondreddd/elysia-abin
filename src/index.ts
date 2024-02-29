// import Server from "./server";
import { Elysia } from "elysia";
import { AuthRouter } from "./api/auth";
import { UserRouter } from "./api/user";
import { cors } from '@elysiajs/cors';
import { rateLimit } from 'elysia-rate-limit';
import { logger } from '@bogeychan/elysia-logger';
import { isHtml } from '@elysiajs/html'
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";
import Database from "./loaders/database";
const port = process.env.PORT || 3400;

// (async () => {
//   Server()
//     .then(({ app }) => {
//       app.listen(port, () => {
//         console.log(
//           `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
//         );
//       })
//     })
// })();

(async () => {
  try {
    /**
     * @description Loaders
     * 
     */

    await Database.createConnection();
    const app = new Elysia();
    /**
     * @context Middlewares (plugins on all routes)
     * Intitialize using plugin, and using decorate
     * @description Cors
     * @description ratelimit: maximum 50 request from client under 60 seconds
     * @throws currently ratelimit is throwing error.use(rateLimit({
        duration: 60000,
        max: 50,
        responseMessage: 'Too many requests'
      }))
     */
    app
      .use(cors())
      .use(
        logger({
          level: 'info'
        })
      )
      // .onParse(async ({ request }, contentType) => {
      //   if (contentType === 'application/json') {
      //     return await request.json();
      //   }
      // })
      .onBeforeHandle(async ({ set, request }) => {
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

      .decorate('db', Database.instance)
      /**
       * @context Route handlers
       */
      .group('/api',
        (app) => app
          .use(
            jwt({
              name: 'jwt',
              secret: process.env.JWT_SECRET!
            })
          )
          .get('/', () => {
            return 'Welcome to Threads API';
          })
          .use(cookie())
          .use(AuthRouter)
          .use(UserRouter)
      )
      .onError(({ code }) => {
        if (code === 'NOT_FOUND') return 'Route not found :('
      })
      .listen(port, () => {
        console.log(
          `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
        );
      })
    process.on('SIGINT', app.stop);
    process.on('SIGTERM', app.stop);
  } catch (error) {
    console.log('error in server:', error)
  }
})();
