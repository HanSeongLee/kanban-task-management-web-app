import React, { HTMLAttributes } from 'react';
import styles from 'components/commons/Header/style.module.scss';
import Container from 'components/commons/Container';
import cn from 'classnames';
import Logo from 'components/commons/Logo';
import BoardOptionButtonContainer from 'containers/BoardOptionButtonContainer';
import BoardTitleBarContainer from 'containers/BoardTitleBarContainer';

interface IProps extends HTMLAttributes<HTMLHeadElement> {

}

const Header: React.FC<IProps> = ({ className, ...props }) => {
    return (
        <header className={cn(styles.header, className)}
                {...props}
        >
            <Container className={styles.container}>
                <div className={styles.leftSide}>
                    <Logo />
                    <div className={styles.divider} />
                    <BoardTitleBarContainer />
                </div>

                <BoardOptionButtonContainer className={styles.buttonContainer} />
            </Container>
        </header>
    );
};

export default Header;
