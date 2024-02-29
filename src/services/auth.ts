import User, { SigninData, SignupData } from "../schema/user";
import bcrypt from 'bcrypt';

export default class AuthService {
    static async signup(data: SignupData) {
        try {
            const newUser = new User();
            newUser.name = data.name;
            newUser.username = data.username;
            newUser.email = data.email;

            const hashedPassword = await this.hashDataBun(data.password);
            newUser.password = hashedPassword;
            const savedUser = await newUser.save();

            console.log('hashed pass:', hashedPassword)

            const { id, name, username, email } = savedUser;

            return { id, name, username, email };
        } catch (error) {
            console.log(`Error in signup: ${error}`);
            return false;
        }
    }

    static async signin(data: SigninData) {
        try {
            const { username, password } = data;

            if (!username) {
                throw new Error('Provide email or username')
            }

            let user = await User.findOne({ username }, { _id: 1, username: 1, password: 1 });

            // If username field is actually email
            if (!user) {
                user = await User.findOne({ email: username }, { _id: 1, username: 1, password: 1 });
            }

            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await this.verifyHashBun({ data: password, hash: user.password });

            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            return {
                id: user.id
            };
        } catch (error) {
            console.log(`Error in signup: ${error}`);
            return false;
        }
    }

    // can be used to hash email
    static async hashData(data: string) {
        try {
            console.log('inside hashData');
            const saltRounds = 10; // Number of salt rounds
            let hashedData;
            // await bcrypt
            //     .genSalt(saltRounds)
            //     .then(salt => {
            //         console.log('Salt: ', salt)
            //         return bcrypt.hash(data, salt)
            //     })
            //     .then(hash => {
            //         console.log('Hash: ', hash)
            //     })
            //     .catch(err => console.error(err.message))
            const res = await bcrypt.hash(data, saltRounds);
            console.log('hashedata:', hashedData, 'res:', res)
            return hashedData;
        } catch (error) {
            console.error('Error hashing :', error);
            throw error;
        }
    }

    static async hashDataBun(data: string) {
        try {
            const hashedData = Bun.password.hash(data)
            return hashedData;
        } catch (error) {
            console.error('Error hashing :', error);
            throw error;
        }
    }

    /**
     * @description This function uses bcrypt to compare two hashes
     * @param data: for example password user logins with
     * @param hashedData data from database to comapre to
     * @returns boolean
     */
    static async verify({
        data,
        hashedData
    }: {
        data: string,
        hashedData: string
    }): Promise<Boolean> {
        try {
            const isMatch = await bcrypt.compare(data, hashedData);
            return isMatch;
        } catch (error) {
            console.error('Error verifying hashed:', error);
            throw error;
        }
    }

    static async verifyHashBun({
        data,
        hash
    }: {
        data: string,
        hash: string
    }): Promise<Boolean> {
        try {
            const isMatch = await Bun.password.verify(data, hash);
            return isMatch;
        } catch (error) {
            console.error('Error verifying hashed:', error);
            throw error;
        }
    }
}