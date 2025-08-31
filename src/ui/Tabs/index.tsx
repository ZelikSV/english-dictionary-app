'use client';
import React, {useState, ReactNode} from 'react';

interface TabItem {
    id: string;
    label: string;
    content: ReactNode;
    color?: string;
}

interface TabsProps {
    tabs: TabItem[];
    defaultTab?: string;
    className?: string;
    tabsClassName?: string;
    contentClassName?: string;
}

const Tabs = ({
                  tabs,
                  defaultTab,
                  className = '',
                  tabsClassName = '',
                  contentClassName = ''
              }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const getTabButtonClass = (tabId: string, color?: string) => {
        const isActive = activeTab === tabId;
        const baseClass = 'flex-1 py-3 px-4 text-sm font-medium transition-all duration-200';

        if (isActive) {
            return `${baseClass} ${color || 'bg-gradient-to-r from-green-400 to-green-500'} text-white shadow-md`;
        }

        return `${baseClass} text-gray-600 hover:text-gray-800 hover:bg-white/50`;
    };

    const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

    return (
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden ${className}`}>
            <div className={`flex bg-gray-50/50 border-b border-gray-200/50 ${tabsClassName}`}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={getTabButtonClass(tab.id, tab.color)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className={`${contentClassName}`}>
                {activeTabContent}
            </div>
        </div>
    );
};

export default Tabs;
