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
import TextArea from 'components/TextArea';
import Select from 'components/Select';

interface IProps extends HTMLAttributes<HTMLDivElement>, IForm {
    control: Control<any>;
    errors: FieldErrors<any>;
    onSubmit?: FormEventHandler<any> | undefined;
    status: Option[];
}

const TaskForm: React.FC<IProps> = ({
                                         control, errors, onSubmit, className,
                                         status, ...props
                                     }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'subtasks',
    });

    return (
        <Form className={cn(styles.taskForm, className)}
              onSubmit={onSubmit}
              {...props}
        >
            <div>
                <Label htmlFor={'title'}>
                    Title
                </Label>
                <Controller control={control}
                            name={'title'}
                            rules={{
                                required: 'Can’t be empty',
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <Input id={'title'}
                                       placeholder={'e.g. Take coffee break'}
                                       error={error?.message}
                                       {...field}
                                />
                            )}
                />
            </div>
            <div>
                <Label htmlFor={'description'}>
                    Description
                </Label>
                <Controller control={control}
                            name={'description'}
                            rules={{
                                required: 'Can’t be empty',
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextArea id={'description'}
                                          placeholder={'e.g. It’s always good to take a break. This ' +
                                              '15 minute break will  recharge the batteries ' +
                                              'a little.'}
                                          error={error?.message}
                                          {...field}
                                >
                                    {field.value}
                                </TextArea>
                            )}
                />
            </div>
            <div className={styles.subtaskColumnsContainer}>
                <Label>
                    Subtasks
                </Label>
                <ul className={styles.subtaskList}>
                    {fields.map((item, index) => (
                        <li className={styles.subtaskItem}
                            key={item.id}
                        >
                            <Controller control={control}
                                        name={`subtasks.${index}.value`}
                                        rules={{
                                            required: 'Can’t be empty',
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input className={styles.input}
                                                   error={error?.message}
                                                   placeholder={index % 2 === 0 ? 'e.g. Make coffee' : 'e.g. Drink coffee & smile'}
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
                    + Add New Subtask
                </Button>
            </div>
            <div>
                <Label htmlFor={'status'}>
                    Status
                </Label>
                <Controller control={control}
                            name={'status'}
                            render={({ field }) => (
                                <Select id={'status'}
                                        options={status}
                                        {...field}
                                />
                            )}
                />
            </div>
        </Form>
    );
};

export default TaskForm;
