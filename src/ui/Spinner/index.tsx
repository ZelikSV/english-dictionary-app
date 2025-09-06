import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'blue' | 'gray' | 'white' | 'green' | 'red';
    className?: string;
    text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
                                             size = 'md',
                                             color = 'blue',
                                             className = '',
                                             text
                                         }) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12'
    };

    const colors = {
        blue: 'border-blue-500',
        gray: 'border-gray-500',
        white: 'border-white',
        green: 'border-green-500',
        red: 'border-red-500'
    };

    const spinnerClasses = `
    ${sizes[size]} 
    ${colors[color]}
    border-2 
    border-t-transparent 
    rounded-full 
    animate-spin
    ${className}
  `.trim().replace(/\s+/g, ' ');

    if (text) {
        return (
            <div className='flex items-center space-x-3'>
                <div className={spinnerClasses}></div>
                <span className='text-gray-600'>{text}</span>
            </div>
        );
    }

    return <div className={spinnerClasses}></div>;
};

export default Spinner;
