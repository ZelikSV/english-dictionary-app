import LoginForm from '@/ui/LoginForm';
import RegisterForm from '@/ui/RegisterForm';
import Tabs from '@/ui/Tabs';
import {checkDbConnection} from "@/lib/db";

const LoginPage = async () => {
    await checkDbConnection();

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center p-6'>
            <div className='w-full max-w-md'>
                <Tabs
                    tabs={[
                        {
                            id: 'login',
                            label: 'Login',
                            content: <LoginForm />,
                            color: 'bg-gradient-to-r from-green-400 to-green-500'
                        },
                        {
                            id: 'register',
                            label: 'Register',
                            content: <RegisterForm />,
                            color: 'bg-gradient-to-r from-blue-400 to-blue-500'
                        }
                    ]}
                    defaultTab='login'
                />
            </div>
        </div>
    );
};

export default LoginPage;
