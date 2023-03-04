import React, { HTMLAttributes } from 'react';
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
    const defaultValues = boards.find(({ id: _id }) => _id === Number(id));
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
    });

    const onSubmit = (data: object) => {
        editBoard(data as Board);
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
