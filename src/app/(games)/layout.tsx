import NoEmptyWordsPage from '@/ui/NoWordsSelected';
import {IWordGroup} from '@/types';

const GamesLayout = ({children, group}: { children: React.ReactNode; group:IWordGroup | undefined}) => {
    if (!group) {
        return <NoEmptyWordsPage />;
    }

    return (
        <>
            {children}
        </>
    );
};

export default GamesLayout;
