import { Elysia, t } from "elysia"
import User from "../schema/user";
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";
import AuthService from "../services/auth";
import UserService from "../services/user";
import { isAuthenticated } from "../hooks/authHooks";

const singupDTO = t.Object({
    name: t.String({
        minLength: 4,
        maxLength: 15
    }),
    username: t.String({
        minLength: 4,
        maxLength: 15
    }),
    email: t.String(),
    password: t.String({
        minLength: 6,
        maxLength: 20
    })
})

/**
 * @important username can be either username or email
 */
const singinDTO = t.Object({
    username: t.String(),
    password: t.String({
        minLength: 6,
        maxLength: 20
    })
})

// new Elysia({ prefix: '/auth' })

// (app: Elysia) =>
// app.group("/auth", (app) =>
// app
//     .post(
export const AuthRouter = (app: Elysia) =>
    app.group("/auth", (app) =>
        app
            .use(cookie())
            .use(
                jwt({
                    name: 'jwt',
                    secret: process.env.JWT_SECRET!
                })
            )
            .post(
                '/signup'
                , async ({ body, set }) => {
                    console.log('signup hit');

                    /**
                     * @context before creating run checks
                     * @check 1: if email exist
                     * @check 2: if username exists
                     */
                    const emailCheck = await UserService.emailExist({ email: body.email });

                    if (emailCheck) {
                        set.status = 400;
                        return {
                            status: false,
                            data: null,
                            message: 'Email already exists.'
                        }
                    }

                    // check 2
                    const usernameCheck = await UserService.usernameExist({ username: body.username });

                    if (usernameCheck) {
                        set.status = 400;
                        return {
                            status: false,
                            data: null,
                            message: 'Username already exists. Pick another username.'
                        }
                    }

                    console.log(emailCheck, usernameCheck);

                    const result = await AuthService.signup({
                        name: body.name,
                        username: body.username,
                        email: body.email,
                        password: body.password,
                    });

                    if (!result) {
                        return {
                            status: false,
                            message: 'SomethingWentWrong'
                        }
                    }

                    return {
                        status: true,
                        content: {
                            data: result
                        }
                    };
                },
                //this is local hook for this route, vlaidation schema
                {
                    body: singupDTO
                }
            )
            /**
             * @description Signins user and return cookie with user id 
            * @param username: username OR email
            * @param password: plain password
            * @returns true and cookie
            */
            .post(
                '/signin',
                async ({ body, set, cookie, jwt, setCookie }) => {
                    console.log('signin hit');

                    const user = await AuthService.signin({
                        username: body.username,
                        password: body.password,
                    });

                    console.log('user sign in:', user)

                    if (!user) {
                        set.status = 400;
                        return {
                            success: false,
                            data: null,
                            message: "Invalid credentials",
                        };
                    }

                    const accessToken = await jwt.sign({
                        userId: user.id,
                    });

                    const COOKIE_EXPIRES_IN = Bun.env.COOKIE_EXPIRES_IN || 604800;
                    const cookieAge = typeof COOKIE_EXPIRES_IN === 'number' ? COOKIE_EXPIRES_IN : parseInt(COOKIE_EXPIRES_IN);

                    // Ensure that cookie.access_token is properly initialized
                    // if (!cookie.access_token) {
                    //     cookie.access_token = {}; // Initialize if it doesn't exist
                    // }

                    setCookie('access_token', accessToken, {
                        httpOnly: true,
                        maxAge: cookieAge
                    });
                    // cookie.access_token.set({
                    //     value: accessToken,
                    //     httpOnly: true,
                    //     maxAge: cookieAge
                    // });

                    return {
                        status: true,
                        content: {
                            data: user
                        }
                    };
                },
                {
                    body: singinDTO,
                }
            )
            .get(
                '/signout',
                /**
                 * @todo Check if cookie exists
                 * @param  cookie
                 */
                ({ cookie }) => {
                    if (cookie.access_token) {
                        // If it exists, log a message indicating that the cookie exists
                        delete cookie.access_token;
                        return {
                            status: true
                        };
                        console.log('Access token cookie exists');
                    } else {
                        // If it doesn't exist, log a message indicating that the cookie doesn't exist
                        console.log('Access token cookie does not exist');
                        return {
                            sattus: false
                        };
                    }
                })
            .onError(({ error }) => {
                console.log('Error in auth:', error);
            })
    )
