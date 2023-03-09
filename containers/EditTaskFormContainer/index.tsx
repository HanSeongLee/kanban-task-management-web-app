import React, { HTMLAttributes, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';
import TaskForm from 'components/TaskForm';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const EditTaskFormContainer: React.FC = (props) => {
    const router = useRouter();
    const { query: { id, taskId } } = router;
    const {
        boards, getTaskById, getColumnByTaskId, editTask,
        openTaskDetailModal,
    } = useAppStore();
    const currentBoard = useMemo(() => {
        return boards.find(({ id: _id }) => _id === Number(id));
    }, [id, boards]);
    const status: Option[] = currentBoard?.columns.map(({ id, name }) => {
        return {
            label: name,
            value: `${id}`,
        };
    });
    const currentTask: Task | null = getTaskById(Number(taskId));
    const currentColumn: Column | null = getColumnByTaskId(Number(taskId));

    if (!currentTask || !currentColumn) {
        return <></>;
    }

    const defaultValues = {
        title: currentTask.title,
        description: currentTask.description,
        subtasks: currentTask.subtasks.map(({ id, title: value }) => {
            return {
                id,
                value,
            };
        }),
        status: `${currentColumn.id}`,
    };
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
    });

    const onSubmit = (data: object) => {
        const newTask: Task = {
            ...currentTask,
            subtasks: data.subtasks.map(({ id, value }) => {
                const subtask = currentTask.subtasks.find(({ id: _id }) => _id == id);
                return {
                    ...subtask,
                    title: value,
                };
            }),
            status: data.status,
        };
        editTask(Number(id), newTask);
        openTaskDetailModal();
    };

    return (
        <TaskForm title={'Edit Task'}
                  buttonName={'Save Changes'}
                  status={status}
                  control={control}
                  errors={errors}
                  onSubmit={handleSubmit(onSubmit)}
                  {...props}
        />
    );
};

export default EditTaskFormContainer;
