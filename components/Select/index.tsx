import React, { InputHTMLAttributes, useState } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    options: Option[];
}

const Select: React.FC<IProps> = ({ options, className, value, onChange, ...props }) => {
    const [open, setOpen] = useState<boolean>(false);

    const onToggleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className={cn(styles.select, {
            [styles.open]: open,
        }, className)}
             onClick={onToggleOpen}
        >
            <input className={styles.input}
                   {...props}
                   value={options.find(({ value: _value }) => _value === value).label}
                   disabled
            />

            <div className={styles.overlay}
                 onClick={onToggleOpen}
            />
            <div className={styles.listWrapper}>
                <ul className={styles.list}>
                    {options.map(({ label, value }, index) => (
                        <li className={styles.item}
                            key={index}
                            onClick={_ => {
                                if (onChange) {
                                    onChange(value);
                                }
                            }}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Select;
