import User, { UserDocumentCreate } from "../models/user";

export default class AuthService {
    async signup(data: UserDocumentCreate) {
        const newUser = new User();
        newUser.username = data.username;
        newUser.email = data.email;

        /**
         * @todo: 
         * 1. hash the password
         * 2. check if username exits 
         *  @throws: pick another one
         * 3. check if email exists
         *  @throws: email already exist
         */
        newUser.password = data.password;

        const savedUser = await newUser.save();



    }
}