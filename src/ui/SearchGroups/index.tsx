'use client';

import {useState} from 'react';

export const SearchGroups = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <div className='relative w-full max-w-md'>
            <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                    </svg>
                </div>
                <input
                    type='text'
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder='Пошук групи...'
                    className='w-full pl-10 pr-10 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400 transition-all duration-200'
                />
                {searchQuery && (
                    <button
                        onClick={clearSearch}
                        className='absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors'
                    >
                        <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};
