import React, { HTMLAttributes } from 'react';
import DropdownButton from 'components/DropdownButton';
import Button from 'components/Button';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const BoardOptionButtonContainer: React.FC<IProps> = (props) => {
    const onAddNewTask = () => {
        // TODO: implement here.
    };

    const onEditBoard = () => {
        // TODO: implement Here.
    };

    const onDeleteBoard = () => {
        // TODO: implement Here.
    };

    return (
        <div {...props}>
            <Button icon={'/icons/icon-add-task-mobile.svg'}
                    round
                    disabled
                    onClick={onAddNewTask}
            >
                + Add New Task
            </Button>

            <DropdownButton icon={'/icons/icon-vertical-ellipsis.svg'}>
                <li onClick={onEditBoard}>
                    Edit Board
                </li>
                <li onClick={onDeleteBoard}
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
