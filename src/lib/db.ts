import postgres from 'postgres';

export const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

const createUsersTable = async () => {
    try {
        const tableExists = await sql`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'users'
            ) as table_exists;
        `;

        if (tableExists[0].table_exists) {
            /* eslint-disable-next-line no-console */
            console.log('Table "users" already exists. Everything is OK.');

            return;
        }

        await sql`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
    } catch (err) {
        /* eslint-disable-next-line no-console */
        console.error('Error creating table:', err);
    }
};

export const checkDbConnection = async () => {
    try {
        const res = await sql`SELECT 1 as ok`;

        await createUsersTable();
        /* eslint-disable-next-line no-console */
        console.log('DB connection was success:', res);

        return res[0].ok === 1;
    } catch (err) {
        /* eslint-disable-next-line no-console */
        console.error('DB connection failed:', err);

        return false;
    }
};
