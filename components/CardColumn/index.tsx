import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const CardColumn: React.FC<IProps> = ({
                                  column: { name, tasks }, className, children, ...props
                              }) => {
    return (
        <div className={cn(styles.cardColumn, className)}
             {...props}
        >
            <div className={styles.title}>
                {name} ({tasks?.length})
            </div>

            <ul className={styles.cardList}>
                {children}
            </ul>
        </div>
    );
};

export default CardColumn;
