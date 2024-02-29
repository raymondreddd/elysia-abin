import User, { SignupData } from "../schema/user";

export default class UserService {
    static async emailExist({
        email
    }: {
        email: string
    }) {
        try {
            const user = await User.findOne({ email });
            // Returns true if user exists, false otherwise
            return !!user;
        } catch (error) {
            console.error('Error checking email existence:', error);
            return false;
        }
    }

    static async usernameExist({
        username
    }: {
        username: string
    }) {
        try {
            const user = await User.findOne({ username });
            // Returns true if user exists, false otherwise
            return !!user;
        } catch (error) {
            console.error('Error checking username existence:', error);
            return false;
        }
    }

    // static async fetch friend
    // static async fetchFeed
    // static async following
    // static async followers (avatar, name)
}