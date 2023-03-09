import React, { HTMLAttributes } from 'react';
import styles from 'components/commons/Sidebar/style.module.scss';
import cn from 'classnames';
import ThemeButtonContainer from 'containers/ThemeButtonContainer';
import Link from 'next/link';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean;
    close: () => void;
    boards: Board[];
    activeBoardId: number;
    onCreateNewBoard: () => void;
}

const Sidebar: React.FC<IProps> = ({
                                       open, close, boards, activeBoardId,
                                       onCreateNewBoard, className, ...props
                                   }) => {
    return (
        <nav className={cn(styles.sidebar, {
            [styles.open]: open,
        }, className)}
             {...props}
        >
            <div className={styles.overlay}
                 onClick={close}
            />

            <div className={styles.box}>
                <div className={styles.body}>
                    <div className={styles.title}>
                        All Boards ({boards.length})
                    </div>
                    <ul className={styles.boardList}>
                        {boards.map(({ id, name }) => (
                            <li className={cn({
                                [styles.active]: id === activeBoardId,
                            })}
                                key={id}
                            >
                                <Link href={`/?id=${id}`}>
                                    <a>
                                        {name}
                                    </a>
                                </Link>
                            </li>
                        ))}
                        <li className={styles.createNewBoard}
                            onClick={onCreateNewBoard}
                        >
                            + Create New Board
                        </li>
                    </ul>
                </div>
                <div className={styles.footer}>
                    <ThemeButtonContainer />
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
