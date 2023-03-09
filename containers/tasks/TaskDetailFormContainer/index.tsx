import React, { useEffect, useMemo, useState } from 'react';
import TaskDetailForm from 'components/forms/TaskDetailForm';
import { useRouter } from 'next/router';
import { useAppStore } from 'lib/store';
import DropdownButton from 'components/commons/DropdownButton';
import { useForm } from 'react-hook-form';

const TaskDetailFormContainer: React.FC = () => {
    const router = useRouter();
    const { query: { id, taskId } } = router;
    const {
        boards, getTaskById, getColumnByTaskId, changeTaskStatus,
        updateTask, openEditTaskModal, openDeleteTaskModal
    } = useAppStore();
    const currentBoard = useMemo(() => {
        return boards.find(({ id: _id }) => _id === Number(id));
    }, [boards, id]);
    const currentColumn = getColumnByTaskId(Number(taskId));
    const currentTask = getTaskById(Number(taskId));
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const status: Option[] = currentBoard?.columns.map(({ id, name }) => {
        return {
            label: name,
            value: `${id}`,
        };
    });

    if (!currentColumn || !currentTask) {
        return (
            <></>
        );
    }

    const defaultValues = {
        subtasks: currentTask?.subtasks.map(({ isCompleted }) => {
            return {
                value: isCompleted,
            };
        }),
        status: status.find(({ label }) => label === currentColumn.name).value,
    };
    const { control, formState: { errors }, watch } = useForm({
        defaultValues,
    });

    const toggleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };

    const onEditTask = () => {
        openEditTaskModal();
        toggleOpenMenu();
    };

    const onDeleteTask = () => {
        openDeleteTaskModal();
        toggleOpenMenu();
    };

    useEffect(() => {
        const { unsubscribe } = watch((value) => {
            const newTask: Task = {
                ...currentTask,
                status: value.status,
            };
            if (currentColumn.id !== Number(value.status)) {
                changeTaskStatus(
                    Number(id),
                    currentColumn.id,
                    Number(value.status),
                    newTask.id,
                );
                return ;
            }

            updateTask(Number(id), {
                ...newTask,
                subtasks: currentTask.subtasks.map((subtask, index) => {
                    return {
                        ...subtask,
                        isCompleted: value.subtasks[index].value,
                    };
                }),
            });
        });
        return () => unsubscribe();
    }, [id, currentColumn, watch]);

    return (
        <TaskDetailForm control={control}
                        watch={watch}
                        errors={errors}
                        title={currentTask?.title || ''}
                        description={currentTask?.description}
                        subtasks={currentTask.subtasks}
                        status={status}
                        menu={(
                            <DropdownButton open={openMenu}
                                            toggleOpen={toggleOpenMenu}
                                            icon={'/icons/icon-vertical-ellipsis.svg'}
                                            height={'20px'}
                            >
                                <li onClick={onEditTask}>
                                    Edit Task
                                </li>
                                <li onClick={onDeleteTask}
                                    style={{
                                        color: 'var(--theme-danger-color)'
                                    }}
                                >
                                    Delete Task
                                </li>
                            </DropdownButton>
                        )}
        />
    );
};

export default TaskDetailFormContainer;
