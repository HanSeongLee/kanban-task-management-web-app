import React, { useEffect } from 'react';
import Modal from 'components/Modal';
import { useAppStore } from 'lib/store';
import { ModalID } from 'types/modal';
import AddNewBoardFormContainer from 'containers/AddNewBoardFormContainer';
import DeleteBoardFormContainer from 'containers/DeleteBoardFormContainer';
import EditBoardFormContainer from 'containers/EditBoardFormContainer';
import AddNewTaskFormContainer from 'containers/AddNewTaskFormContainer';
import TaskDetailFormContainer from 'containers/TaskDetailFormContainer';
import DeleteTaskFormContainer from 'containers/DeleteTaskFormContainer';
import { useRouter } from 'next/router';
import EditTaskFormContainer from 'containers/EditTaskFormContainer';

const ModalContainer: React.FC = () => {
    const { modalId, showModal, closeModal, openTaskDetailModal } = useAppStore();
    const router = useRouter();
    const { pathname, query: { id, taskId } } = router;

    const onCloseModal = () => {
        if (id && taskId) {
            router.push({
                pathname,
                query: {
                    id,
                },
            }, undefined, {
                scroll: false,
            });
        }
        closeModal();
    };

    useEffect(() => {
        if (!id || !taskId) {
            return;
        }

        openTaskDetailModal();
    }, [id, taskId]);

    return (
        <Modal open={showModal}
               closeModal={onCloseModal}
        >
            {modalId === ModalID.ADD_NEW_BOARD && (<AddNewBoardFormContainer />)}
            {modalId === ModalID.DELETE_BOARD && (<DeleteBoardFormContainer />)}
            {modalId === ModalID.EDIT_BOARD && (<EditBoardFormContainer />)}
            {modalId === ModalID.ADD_NEW_TASK && (<AddNewTaskFormContainer />)}
            {modalId === ModalID.TASK_DETAIL && (<TaskDetailFormContainer />)}
            {modalId === ModalID.DELETE_TASK && (<DeleteTaskFormContainer />)}
            {modalId === ModalID.EDIT_TASK && (<EditTaskFormContainer />)}
        </Modal>
    );
};

export default ModalContainer;
