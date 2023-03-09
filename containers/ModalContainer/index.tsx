import React, { useEffect } from 'react';
import Modal from 'components/commons/Modal';
import { useAppStore } from 'lib/store';
import { ModalID } from 'types/modal';
import AddNewBoardFormContainer from 'containers/boards/AddNewBoardFormContainer';
import DeleteBoardFormContainer from 'containers/boards/DeleteBoardFormContainer';
import EditBoardFormContainer from 'containers/boards/EditBoardFormContainer';
import AddNewTaskFormContainer from 'containers/tasks/AddNewTaskFormContainer';
import TaskDetailFormContainer from 'containers/tasks/TaskDetailFormContainer';
import DeleteTaskFormContainer from 'containers/tasks/DeleteTaskFormContainer';
import { useRouter } from 'next/router';
import EditTaskFormContainer from 'containers/tasks/EditTaskFormContainer';

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
