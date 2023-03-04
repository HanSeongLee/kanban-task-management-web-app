import React, { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';
import BoardForm from 'components/BoardForm';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const AddNewBoardFormContainer: React.FC = (props) => {
    const defaultValues = {
        name: '',
        columns: [
            {
                value: 'Todo',
            },
            {
                value: 'Doing',
            },
        ],
    };
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
    });
    const { addBoard, closeModal } = useAppStore();
    const router = useRouter();
    const { pathname } = router;

    const onSubmit = (data: object) => {
        const newId = addBoard(data as Board);
        closeModal();
        router.push({
            pathname,
            query: {
                id: newId,
            },
        });
    };

    return (
        <BoardForm title={'Add New Board'}
                   buttonName={'Create New Board'}
                   control={control}
                   errors={errors}
                   onSubmit={handleSubmit(onSubmit)}
                   {...props}
        />
    );
};

export default AddNewBoardFormContainer;
