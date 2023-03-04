import React, { FormHTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Button from 'components/Button';

interface IProps extends FormHTMLAttributes<HTMLFormElement>, IForm {

}

const Form: React.FC<IProps> = ({
                                    variant, title, description, buttonName,
                                    onCancel, className, children, ...props
                                }) => {
    return (
        <form className={cn(styles.form, {
            [styles.danger]: variant === 'danger',
        }, className)}
              {...props}
        >
            <h3 className={styles.title}>
                {title}
            </h3>
            {description && (
                <p className={styles.description}>
                    {description}
                </p>
            )}

            {children && (
                <div className={styles.container}>
                    {children}
                </div>
            )}

            <div className={styles.buttonContainer}>
                {variant === 'primary' && (
                    <Button type={'submit'}>
                        {buttonName}
                    </Button>
                )}
                {variant === 'danger' && (
                    <>
                        <Button type={'submit'}
                                variant={'danger'}
                        >
                            {buttonName}
                        </Button>
                        <Button variant={'secondary'}
                                onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </>
                )}
            </div>
        </form>
    );
};

Form.defaultProps = {
    variant: 'primary',
};

export default Form;
