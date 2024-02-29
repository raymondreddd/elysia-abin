// import jwt, {
//     Algorithm,
//     JwtPayload,
//     SignOptions,
//     VerifyOptions
// } from 'jsonwebtoken';


// export class Jwt {
//     static create<T extends { [key: string]: unknown }>({
//         options = {},
//         content
//     }: {
//         content: T;
//         options?: SignOptions;
//     }): string {
//         const private_key =
//             process.env.NODE_ENV !== 'production'
//                 ? process.env.JWT_PRIVATE_KEY
//                 : process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');
//         return jwt.sign({ content }, private_key, {
//             algorithm: process.env.JWT_ALGORITHM as Algorithm,
//             issuer: process.env.DOMAIN,
//             ...options
//         });
//     }

//     static verify(
//         token: string,
//         options: VerifyOptions = {}
//     ): string | JwtPayload {
//         const public_key =
//             process.env.NODE_ENV !== 'production'
//                 ? process.env.JWT_PUBLIC_KEY
//                 : process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n');
//         return jwt.verify(token, public_key, {
//             algorithms: [process.env.JWT_ALGORITHM as Algorithm],
//             ...options
//         });
//     }
// }
