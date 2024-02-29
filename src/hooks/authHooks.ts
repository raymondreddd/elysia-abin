import { Elysia } from 'elysia';
import User from '../schema/user';
import jwt from '@elysiajs/jwt';

export const isAuthenticated = (app: Elysia) =>
    app
        .use(
            jwt({
                name: 'jwt',
                secret: process.env.JWT_SECRET!
            })
        )
        .derive(async ({ cookie, jwt, set }) => {
            if (!cookie!.access_token) {
                set.status = 401;
                // set.redirect = '/auth/signin'
                return {
                    isLoggedIn: false,
                    message: "Unauthorized",
                    data: null,
                };
            }

            // extract access_token(jwt)
            const access_token = cookie.access_token.value;

            // verify jwt token
            const userId = await jwt.verify(access_token);

            if (!userId) {
                set.status = 401;
                return {
                    isLoggedIn: false,
                    message: "Unauthorized",
                    data: null,
                };
            }

            const user = await User.findById({ userId })
            if (!user) {
                set.status = 401;
                return {
                    isLoggedIn: false,
                    message: "Unauthorized",
                    data: null,
                };
            }
            return {
                isLoggedIn: true,
                user,
            };
        });


// Middleware to authenticate JWT tokens
// const authenticateJWT = ({ request }) => {
//     const authHeader = request.headers['authorization'];
//     if (authHeader) {
//         const token = authHeader.split(' ')[1];
//         try {
//             // Verify JWT token
//             const decoded = jwt.verify(token, Bun.env.JWT_SECRET);
//             // Attach user information to the request context
//             request.user = decoded;
//         } catch (error) {
//             // If token is invalid, return 401 (Unauthorized)
//             return { status: 401, body: 'Unauthorized' };
//         }
//     } else {
//         // If no authorization header is present, return 401 (Unauthorized)
//         return { status: 401, body: 'Unauthorized' };
//     }
// };