import {useState} from 'react';
import Cookies from 'js-cookie';

export const useSelectGroup = (groupId: string) => {
    const [loading, setLoading] = useState(false);

    const handleSelectGroup = () => {
        setLoading(true);

        Cookies.set('group', groupId);

        setTimeout(() => setLoading(false), 500);
    };

    return {
        handleSelectGroup,
        isSelectingGroup: loading
    };
};
