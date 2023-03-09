import React, { AnchorHTMLAttributes } from 'react';
import styles from 'components/commons/Logo/style.module.scss';
import Link from 'next/link';
import cn from 'classnames';

interface IProps extends AnchorHTMLAttributes<HTMLAnchorElement> {

}

const Logo: React.FC<IProps> = ({ className, ...props }) => {
    return (
        <Link href={'/'}>
            <a className={cn(styles.logo, className)}
               {...props}
            >
                <h1>
                    <img src={'/logo-mobile.svg'}
                         alt={'kanban'}
                    />
                </h1>
            </a>
        </Link>
    );
};

export default Logo;
