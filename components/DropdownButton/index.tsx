import React, { ButtonHTMLAttributes, useState } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
}

const DropdownButton: React.FC<IProps> = ({ icon, className, children, ...props }) => {
    const [open, setOpen] = useState<boolean>(false);

    const onToggleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className={cn(styles.dropdownButton, {
            [styles.open]: open,
        }, className)}
        >
            <div className={styles.overlay}
                 onClick={onToggleOpen}
            />
            <button className={styles.button}
                    onClick={onToggleOpen}
                    {...props}
            >
                <img className={styles.icon}
                     src={icon}
                     alt={''}
                />
            </button>

            <div className={styles.listWrapper}>
                <ul className={styles.list}>
                    {children}
                </ul>
            </div>
        </div>
    );
};

export default DropdownButton;
