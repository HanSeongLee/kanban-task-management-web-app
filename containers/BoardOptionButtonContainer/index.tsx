import React, { HTMLAttributes, useMemo, useState } from 'react';
import DropdownButton from 'components/DropdownButton';
import Button from 'components/Button';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const BoardOptionButtonContainer: React.FC<IProps> = (props) => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const { boards, openDeleteBoardModal, openEditBoardModal, openAddNewTaskModal } = useAppStore();
    const router = useRouter();
    const { query: { id } } = router;
    const currentBoard = useMemo(() => {
        return boards.find((({ id: _id }) => _id === Number(id)));
    }, [id, boards]);

    const toggleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };

    const onAddNewTask = () => {
        openAddNewTaskModal();
    };

    const onEditBoard = () => {
        openEditBoardModal();
        toggleOpenMenu();
    };

    const onDeleteBoard = () => {
        if (boards.length === 1) {
            return;
        }

        openDeleteBoardModal();
        toggleOpenMenu();
    };

    return (
        <div {...props}>
            <Button icon={'/icons/icon-add-task-mobile.svg'}
                    round
                    disabled={currentBoard?.columns?.length === 0}
                    onClick={onAddNewTask}
            >
                + Add New Task
            </Button>

            <DropdownButton open={openMenu}
                            toggleOpen={toggleOpenMenu}
                            icon={'/icons/icon-vertical-ellipsis.svg'}
            >
                <li onClick={onEditBoard}>
                    Edit Board
                </li>
                <li onClick={onDeleteBoard}
                    aria-disabled={boards.length === 1}
                    style={{
                        color: 'var(--theme-danger-color)'
                    }}
                >
                    Delete Board
                </li>
            </DropdownButton>
        </div>
    );
};

export default BoardOptionButtonContainer;
