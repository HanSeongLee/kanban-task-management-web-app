import type { NextPage } from 'next'
import styles from './style.module.scss';
import Header from 'components/commons/Header';
import CardColumnListContainer from 'containers/CardColumnListContainer';
import SidebarContainer from 'containers/SidebarContainer';
import ModalContainer from 'containers/ModalContainer';
import { useAppStore } from 'lib/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const { boards } = useAppStore();
    const router = useRouter();
    const { pathname, query: { id } } = router;

    useEffect(() => {
        if (!router.isReady || id) {
            return;
        }

        router.push({
            pathname,
            query: {
                ...router.query,
                id: boards[0].id,
            },
        });
    }, [boards, router]);

    return (
        <>
            <main className={styles.main}>

                <div className={styles.container}>
                    <SidebarContainer />
                    <div className={styles.content}>
                        <Header />
                        <CardColumnListContainer className={styles.cardColumnListContainer} />
                    </div>
                </div>

                <ModalContainer />
            </main>
        </>
    );
}

export default Home
