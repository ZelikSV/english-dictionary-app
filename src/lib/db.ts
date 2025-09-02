import postgres from 'postgres';

export const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

export const checkDbConnection = async () => {
    try {
        const res = await sql`SELECT 1 as ok`;
        /* eslint-disable-next-line no-console */
        console.log('DB connection was success:', res);

        return res[0].ok === 1;
    } catch (err) {
        /* eslint-disable-next-line no-console */
        console.error('DB connection failed:', err);

        return false;
    }
};
