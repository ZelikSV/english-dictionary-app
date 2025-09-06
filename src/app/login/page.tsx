import LoginForm from '@/ui/LoginForm';
import {checkDbConnection} from '@/lib/db';
import React from 'react';

const LoginPage = async () => {
    await checkDbConnection();

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center p-6'>
            <LoginForm />
        </div>

    );
};

export default LoginPage;
