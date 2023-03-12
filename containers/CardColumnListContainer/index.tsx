import React, { HTMLAttributes, useMemo } from 'react';
import EmptyBoard from 'components/EmptyBoard';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';
import ColumnBoard from 'components/ColumnBoard';
import CardColumn from 'components/CardColumn';
import TaskCard from 'components/TaskCard';
import Link from 'next/link';
import NewColumnBox from 'components/NewColumnBox';
import { ModalID } from 'types/modal';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const CardColumnListContainer: React.FC<IProps> = (props) => {
    const router = useRouter();
    const { query: { id } } = router;
    const { boards, openModal } = useAppStore();
    const currentBoard = useMemo(() => {
        const board = boards.find(({ id: _id }) => _id === Number(id));
        if (!board) {
            return {
                name: '',
                columns: [],
            };
        }
        return board;
    }, [id, boards]);

    const onAddNewColumn = () => {
        openModal(ModalID.EDIT_BOARD);
    };

    return (
        <div {...props}>
            {currentBoard.columns.length === 0 ? (
                <EmptyBoard onAddNewColumn={onAddNewColumn} />
            ) : (
                <ColumnBoard>
                    {currentBoard.columns.map((column) => (
                        <li key={column.id}>
                            <CardColumn column={column}>
                                {column.tasks.map((task) => (
                                    <>
                                        {task && (
                                            <li key={task?.id}>
                                                <Link href={`/?id=${id}&taskId=${task?.id}`}>
                                                    <a>
                                                        <TaskCard task={task} />
                                                    </a>
                                                </Link>
                                            </li>
                                        )}
                                    </>
                                ))}
                            </CardColumn>
                        </li>
                    ))}
                    <li>
                        <NewColumnBox onClick={onAddNewColumn} />
                    </li>
                </ColumnBoard>
            )}
        </div>
    );
};

export default CardColumnListContainer;
