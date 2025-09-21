const WordGroupCardSkeleton = () => {
    return (
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 flex flex-col h-80 animate-pulse'>
            <div className='flex items-center justify-between mb-4 min-h-[2rem]'>
                <div className='flex items-center space-x-3 flex-1 min-w-0'>
                    <div className='w-3 h-3 bg-gray-300 rounded-full flex-shrink-0'></div>
                    <div className='h-5 bg-gray-300 rounded flex-1 max-w-[200px]'></div>
                </div>
                <div className='flex items-center space-x-2 flex-shrink-0 ml-3'>
                    <div className='w-8 h-8 bg-gray-200 rounded-lg'></div>
                    <div className='w-8 h-8 bg-gray-200 rounded-lg'></div>
                </div>
            </div>

            <div className='bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-3 mb-4'>
                <div className='flex items-baseline'>
                    <div className='h-8 w-8 bg-gray-300 rounded'></div>
                    <div className='h-4 w-12 bg-gray-300 rounded ml-2'></div>
                </div>
            </div>

            <div className='flex-1 flex flex-col'>
                <div className='flex flex-wrap gap-2 mb-4 h-20 overflow-hidden'>
                    {Array.from({ length: Math.floor(Math.random() * 4) + 3 }).map((_, index) => (
                        <div
                            key={index}
                            className='bg-gray-300 rounded-full h-6 h-fit'
                            style={{ width: `${Math.floor(Math.random() * 60) + 40}px` }}
                        ></div>
                    ))}
                    <div className='bg-gray-250 rounded-full h-6 w-12 h-fit'></div>
                </div>
            </div>

            <div className='w-full bg-gray-300 py-3 rounded-xl mt-auto h-12'></div>
        </div>
    );
};

const WordGroupCardsGridSkeleton = ({ count = 3 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <WordGroupCardSkeleton key={index} />
            ))}
        </div>
    );
};

export { WordGroupCardSkeleton, WordGroupCardsGridSkeleton };
