'use client';
import {clsx} from 'clsx';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {HomeIcon, ChevronRightIcon, ArrowLeftIcon} from '@heroicons/react/24/outline';

interface Breadcrumb {
    label: string;
    href: string;
    active?: boolean;
}

interface BreadcrumbsProps {
    breadcrumbs: Breadcrumb[];
    showBackButton?: boolean;
}

const Breadcrumbs = ({breadcrumbs, showBackButton = true}: BreadcrumbsProps) => {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    return (
        <div className='flex items-center justify-between mb-8'>
            <nav aria-label='Breadcrumb' className='flex items-center space-x-2'>
                {showBackButton && (
                    <button
                        onClick={handleBack}
                        className='p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md border border-gray-200/50 hover:border-gray-300/50 transition-all duration-200 group'
                        title='Повернутись назад'
                    >
                        <ArrowLeftIcon className='w-5 h-5 text-gray-600 group-hover:text-gray-800' />
                    </button>
                )}

                <Link
                    href='/'
                    className='p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md border border-gray-200/50 hover:border-gray-300/50 transition-all duration-200 group'
                    title='На головну'
                >
                    <HomeIcon className='w-5 h-5 text-gray-600 group-hover:text-green-600' />
                </Link>

                <ol className='flex items-center space-x-2'>
                    {breadcrumbs.map(breadcrumb => (
                        <li key={breadcrumb.href} className='flex items-center space-x-2'>
                            {breadcrumbs.length > 1 && <ChevronRightIcon className='w-4 h-4 text-gray-400' /> }
                            <Link
                                href={breadcrumb.href}
                                className={clsx(
                                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                                    breadcrumb.active
                                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/60 backdrop-blur-sm'
                                )}
                            >
                                {breadcrumb.label}
                            </Link>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumbs;
