import React, { FormEventHandler } from 'react';
import styles from './style.module.scss';
import Form from 'components/Form';
import { IForm } from 'types/form';
import Label from 'components/Label';
import Select from 'components/Select';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import CheckBox from 'components/CheckBox';
import cn from 'classnames';

interface IProps extends IForm {
    control: Control<any>;
    errors: FieldErrors<any>;
    onSubmit?: FormEventHandler<any> | undefined;
    subtasks: Subtask[];
    status: Option[];
}

const TaskDetailForm: React.FC<IProps> = ({
                                              control, errors, onSubmit, subtasks,
                                              status, className, ...props
                                          }) => {
    return (
        <Form className={cn(styles.taskDetailForm, className)}
              variant={'none'}
              {...props}
        >
            <div>
                <Label>
                    Subtasks ({subtasks.filter(({ isCompleted }) => isCompleted).length} of {subtasks.length})
                </Label>
                <div className={styles.subtaskContainer}>
                    {subtasks.map((subtask, index) => (
                        <Controller key={index}
                                    control={control}
                                    name={`subtasks.${index}.value`}
                                    render={({ field: { onChange, value } }) => (
                                        <CheckBox onChange={onChange}
                                                  checked={value}
                                        >
                                            {subtask.title}
                                        </CheckBox>
                                    )}
                        />
                    ))}
                </div>
            </div>
            <div>
                <Label>
                    Current Status
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

export default TaskDetailForm;
