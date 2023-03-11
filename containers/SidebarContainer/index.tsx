import React, { useEffect, useState } from 'react';
import Sidebar from 'components/commons/Sidebar';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';

const SidebarContainer: React.FC = () => {
    const { query } = useRouter();
    const { id } = query;
    const { boards, closeSidebar, toggleSidebar, showSidebar, openAddNewBoardModal } = useAppStore();
    const [activeBoardId, setActiveBoardId] = useState(1);

    const onCreateNewBoard = () => {
        openAddNewBoardModal();

        if (window.innerWidth < 767) {
            closeSidebar();
        }
    };

    useEffect(() => {
        if (!id) {
            setActiveBoardId(1);
            return ;
        }

        setActiveBoardId(Number(id));
        if (window.innerWidth < 767) {
            closeSidebar();
        }
    }, [id]);

    return (
        <Sidebar open={showSidebar}
                 toggleSidebar={toggleSidebar}
                 onCreateNewBoard={onCreateNewBoard}
                 boards={boards}
                 activeBoardId={activeBoardId}
        />
    );
};

export default SidebarContainer;
