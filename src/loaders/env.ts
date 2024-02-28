export class Env {
    static names = [
        'NODE_ENV',
        'PORT',
        /**
         * Database related
         */
        'SQL_DATABASE',
        'SQL_HOST',
        'SQL_USERNAME',
        'SQL_PASSWORD',
        'SQL_URL',
        'QUEUE_URL',

        /**
         * Service related
         */
        'DOMAIN',
        'WEB_DOMAIN',
        'EMBED_DOMAIN_SHARE',
        'EMBED_DOMAIN',

        'JWT_EXPIRES_IN',
        'REFRESH_EXPIRES_IN',

        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET',
        'GOOGLE_TOKEN_URL',
        'GOOGLE_ROOT_URL',

        'LINKEDIN_CLIENT_ID',
        'LINKEDIN_CLIENT_SECRET',
        'LINKEDIN_TOKEN_URL',
        'LINKEDIN_ROOT_URL',

        /**
         * Node related
         */
        'PORT',
        'NODE_ENV',
        'PROJECT_NAME',
        'DOMAIN',
        'API_DOMAIN',
        'WEB_DOMAIN',
        'COOKIE_SECRET',
        'COOKIE_SAMESITE',
        'SENTRY_DSN',
        'SERVICE_NAME',
        'REDIS_URI',
        'GOOGLE_PROJECT_ID',
        'GOOGLE_LOG_CREDENTIALS',

        'JWT_ALGORITHM',
        'JWT_PUBLIC_KEY',
        'JWT_PRIVATE_KEY',
    ] as const;

    static variable: Record<(typeof Env.names)[number], string>;

    static Loader(): void {
        Env.variable = Env.loadAll(Env.names);
    }

    static loadAll(names: readonly string[]): Record<string, string> {
        const variables: Record<string, string> = {};
        names.forEach((name) => {
            const value = process.env[name];
            if (typeof value !== 'undefined') {
                variables[name] = value;
            }
        });
        return variables;
    }
}
