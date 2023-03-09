import React, { HTMLAttributes, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';
import BoardForm from 'components/BoardForm';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const EditBoardFormContainer: React.FC = (props) => {
    const router = useRouter();
    const { query: { id } } = router;
    const { boards, editBoard, closeModal } = useAppStore();
    const currentBoard: Board = useMemo(() => {
        return boards.find(({ id: _id }) => _id === Number(id));
    }, [id, boards]);
    const defaultValues = {
        name: currentBoard.name,
        columns: currentBoard.columns.map(({ id, name: value }) => {
            return {
                id,
                value,
            };
        }),
    };
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
    });

    const onSubmit = (data: object) => {
        const { name }: { name: string } = data;
        const columns: Column[] = data.columns.map(({ id, value }) => {
            const column = currentBoard.columns.find(({ id: _id }) => _id === id);

            if (!id || !column) {
                return {
                    name: value,
                    tasks: [],
                }
            }
            return {
                ...column,
                name: value,
            };
        });
        editBoard({
            id: Number(id),
            name,
            columns,
        });
        closeModal();
    };

    return (
        <BoardForm title={'Edit Board'}
                   buttonName={'Save Changes'}
                   control={control}
                   errors={errors}
                   onSubmit={handleSubmit(onSubmit)}
                   {...props}
        />
    );
};

export default EditBoardFormContainer;
