import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean;
    closeModal: () => void;
}

const Modal: React.FC<IProps> = ({
                                     open, closeModal, className, children,
                                     ...props
                                 }) => {
    return (
        <div className={cn(styles.modal, {
            [styles.open]: open,
        }, className)}
             {...props}
        >
            <div className={styles.overlay}
                 onClick={closeModal}
            />

            <div className={styles.container}>
                <div className={styles.box}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
