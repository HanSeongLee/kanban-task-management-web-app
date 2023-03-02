import React, { InputHTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const Input: React.FC<IProps> = ({ error, className, ...props }) => {
    return (
        <div className={cn(styles.inputWrapper, {
            [styles.error]: error,
        }, className)}>
            <input className={styles.input}
                   {...props}
            />
            {error && (
                <div className={styles.errorMessage}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default Input;
