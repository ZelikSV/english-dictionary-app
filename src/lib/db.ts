import postgres from 'postgres';

import {log} from '@/lib/logger';

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
            log.info('Table "users" already exists. Everything is OK.');

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
        log.info('✅ Users table created');
    } catch (err) {
        log.error('Error creating users table:', err);
    }
};

const createWordsGroupsTable = async () => {
    try {
        const tableExists = await sql`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'words_groups'
            ) as table_exists;
        `;
        if (tableExists[0].table_exists) {
            log.info('Table "words_groups" already exists. Everything is OK.');
            return;
        }
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        await sql`
            CREATE TABLE words_groups (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(255) NOT NULL,
                user_id INTEGER NOT NULL,
                words UUID[] DEFAULT '{}',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `;
        log.info('✅ Words_groups table created');
    } catch (err) {
        log.error('Error creating words_groups table:', err);
    }
};

const createWordsTable = async () => {
    try {
        const tableExists = await sql`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'words'
            ) as table_exists;
        `;
        if (tableExists[0].table_exists) {
            log.info('Table "words" already exists. Everything is OK.');
            return;
        }
        await sql`
            CREATE TABLE words (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                en VARCHAR(500) NOT NULL,
                ua VARCHAR(500) NOT NULL,
                group_id UUID,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (group_id) REFERENCES words_groups(id) ON DELETE CASCADE
            );
        `;
        log.info('✅ Words table created');
    } catch (err) {
        log.error('Error creating words table:', err);
    }
};
// NOTE The method can be used for making initial DB settings
// Need to think about where i can put it in NEXTJS
export const setupDatabase = async () => {
    try {
        const res = await sql`SELECT 1 as ok`;
        log.info('DB connection was success:', res);

        await createUsersTable();
        await createWordsGroupsTable();
        await createWordsTable();

        log.info('✅ All tables created successfully');
    } catch (err) {
        log.error('DB connection failed:', err);
    }
};
