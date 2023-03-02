import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import Button from 'components/Button';
import cn from 'classnames';
import Container from 'components/Container';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    onAddNewColumn: () => void;
}

const EmptyBoard: React.FC<IProps> = ({ onAddNewColumn, className, ...props }) => {
    return (
        <Container className={cn(styles.emptyBoard, className)}
                   {...props}
        >
            <h2 className={styles.title}>
                This board is empty. Create a new column to get started.
            </h2>
            <Button round
                    onClick={onAddNewColumn}
            >
                + Add New Column
            </Button>
        </Container>
    );
};

export default EmptyBoard;