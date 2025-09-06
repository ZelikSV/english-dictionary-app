import {NextResponse} from 'next/server';
import bcrypt from 'bcrypt';
import {sql} from '@/lib/db';

export const POST = async (req: Request) => {
    try {
        const {email, password, username} = await req.json();

        if (!email || !password) {
            return NextResponse.json({error: 'Email and password are required'}, {status: 400});
        }

        const existing = await sql`SELECT id FROM users WHERE email = ${email}`;

        if (existing.length > 0) {
            return NextResponse.json({error: 'User already exists'}, {status: 400});
        }

        const hashed = await bcrypt.hash(password, 10);
        const rows = await sql`
      INSERT INTO users (email, username, password)
      VALUES (${email}, ${username}, ${hashed})
      RETURNING id, email, username
    `;
        const user = rows[0];

        return NextResponse.json({user});
    } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error(e);

        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
};
