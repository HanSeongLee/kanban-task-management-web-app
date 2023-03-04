import React, { FormEventHandler, HTMLAttributes } from 'react';
import styles from './style.module.scss';
import Form from 'components/Form';
import Input from 'components/Input';
import Label from 'components/Label';
import { Controller, useFieldArray } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import Button from 'components/Button';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLDivElement>, IForm {
    control: Control<any>;
    errors: FieldErrors<any>;
    onSubmit?: FormEventHandler<any> | undefined;
}

const BoardForm: React.FC<IProps> = ({
                                         control, errors, onSubmit, className,
                                         ...props
                                     }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'columns',
    });

    return (
        <Form className={cn(styles.boardForm, className)}
              onSubmit={onSubmit}
              {...props}
        >
            <div>
                <Label htmlFor={'name'}>
                    Board Name
                </Label>
                <Controller control={control}
                            name={'name'}
                            rules={{
                                required: 'Can’t be empty',
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <Input id={'name'}
                                       placeholder={'e.g. Web Design'}
                                       error={error?.message}
                                       {...field}
                                />
                            )}
                />
            </div>
            <div className={styles.boardColumnsContainer}>
                <Label>
                    Board Columns
                </Label>
                <ul className={styles.columnList}>
                    {fields.map((item, index) => (
                        <li className={styles.columnItem}
                            key={item.id}
                        >
                            <Controller control={control}
                                        name={`columns.${index}.value`}
                                        rules={{
                                            required: 'Can’t be empty',
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input className={styles.input}
                                                   error={error?.message}
                                                   {...field}
                                            />
                                        )}
                            />
                            <button className={styles.removeButton}
                                    type={'button'}
                                    onClick={() => remove(index)}
                            >
                                <img src={'/icons/icon-cross.svg'}
                                     alt={'remove'}
                                />
                            </button>
                        </li>
                    ))}
                </ul>
                <Button type={'button'}
                        variant={'secondary'}
                        onClick={_ => append({ value: '' })}
                >
                    + Add New Column
                </Button>
            </div>
        </Form>
    );
};

export default BoardForm;
