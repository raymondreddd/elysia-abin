import { Elysia, t } from "elysia"

export const UserRouter = new Elysia({ prefix: '/user' })
    .post('/', ({ }) => {
        console.log('signup hit');
    })
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

