const Error = ()=> (<div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-6'>
        <div className='bg-white shadow-lg rounded-xl p-10 max-w-md w-full text-center'>
            <div className='flex justify-center mb-6'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z' />
                </svg>

            </div>
            <h1 className='text-3xl font-bold text-red-600 mb-4'>Failed to Sign In</h1>
            <p className='text-gray-600 mb-6'>
                We couldn’t sign you in. Please check your credentials and try again.
            </p>
        </div>
    </div>);

export default Error;
