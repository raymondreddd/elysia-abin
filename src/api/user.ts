import { Elysia, t } from "elysia"
import { isAuthenticated } from "../hooks/authHooks";

export const UserRouter = new Elysia({ prefix: '/user' })
    /**
     * @description: This places a middleware, which authenticates cookie
     * 
     * if cookie is valid, it extends context to include `user` and `isLoggedIn` to true
     * 
     * else if cookie is invalid it extends context to `isLoggedIn` as false
     */
    .use(isAuthenticated)
    .get('/me', ({ }) => {
        /**
         * @description fetch user data of current user
         */
    })
    .get('/home', () => {

        /**
         * @description fetch threads of kind post of current user's followinf list
         */
        // const currentUser = await User.findById(currentUserId).populate({
        //     path: 'following',
        //     populate: {
        //         path: 'threads',
        //         match: { kind: 'post' } // Filter threads with kind: 'post'
        //     }
        // });

        // const threads = currentUser.following.flatMap(user => user.threads);
    })
    .onError(({ error }) => {
        console.log('Error in User:', error);
    })

