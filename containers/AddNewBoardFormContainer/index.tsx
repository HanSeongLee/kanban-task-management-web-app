import React from 'react';
import AddNewBoardForm from 'components/AddNewBoardForm';
import { useForm } from 'react-hook-form';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';

const AddNewBoardFormContainer: React.FC = () => {
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
        <AddNewBoardForm control={control}
                         errors={errors}
                         onSubmit={handleSubmit(onSubmit)}
        />
    );
};

export default AddNewBoardFormContainer;
