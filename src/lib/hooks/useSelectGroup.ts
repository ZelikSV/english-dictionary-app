import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Global state to track the selected group across all components
let globalSelectedGroupId: string | null = null;
let globalListeners: ((selectedId: string | null) => void)[] = [];

const notifyListeners = (selectedId: string | null) => {
  globalSelectedGroupId = selectedId;
  globalListeners.forEach(listener => listener(selectedId));
};

export const useSelectGroup = (groupId: string) => {
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    // Initialize from cookie
    const selectedGroupId = Cookies.get('group') || null;
    globalSelectedGroupId = selectedGroupId;
    setIsSelected(selectedGroupId === groupId);

    // Listen for global changes
    const listener = (selectedId: string | null) => {
      setIsSelected(selectedId === groupId);
    };

    globalListeners.push(listener);

    return () => {
      globalListeners = globalListeners.filter(l => l !== listener);
    };
  }, [groupId]);

  const handleSelectGroup = () => {
    setLoading(true);

    Cookies.set('group', groupId);
    notifyListeners(groupId);

    setTimeout(() => setLoading(false), 500);
  };

  return {
    handleSelectGroup,
    isSelectingGroup: loading,
    isSelected,
  };
};
