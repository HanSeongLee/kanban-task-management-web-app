import React, { useEffect, useState } from 'react';
import Sidebar from 'components/Sidebar';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';

const SidebarContainer: React.FC = () => {
    const { query } = useRouter();
    const { id } = query;
    const { boards, closeSidebar, showSidebar, openAddNewBoardModal } = useAppStore();
    const [activeBoardId, setActiveBoardId] = useState(1);

    const onCreateNewBoard = () => {
        closeSidebar();
        openAddNewBoardModal();
    };

    useEffect(() => {
        if (!id) {
            setActiveBoardId(1);
            return ;
        }

        setActiveBoardId(Number(id));
        closeSidebar();
    }, [id]);

    return (
        <Sidebar open={showSidebar}
                 close={closeSidebar}
                 onCreateNewBoard={onCreateNewBoard}
                 boards={boards}
                 activeBoardId={activeBoardId}
        />
    );
};

export default SidebarContainer;
