import React, { ButtonHTMLAttributes } from 'react';
import styles from './style.module.scss';
import ToggleButton from 'components/ToggleButton/inde';
import cn from 'classnames';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    on: boolean;
}

const ThemeButton: React.FC<IProps> = ({ className, ...props }) => {
    return (
        <div className={cn(styles.themeButton)}>
            <img src={'/icons/icon-light-theme.svg'}
                 alt={'light theme'}
            />
            <ToggleButton {...props} />
            <img src={'/icons/icon-dark-theme.svg'}
                 alt={'dark theme'}
            />
        </div>
    );
};

export default ThemeButton;
