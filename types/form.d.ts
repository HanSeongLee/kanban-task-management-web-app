import { ReactNode } from 'react';

interface IForm {
    variant?: 'primary' | 'danger' | 'none';
    title: string;
    description?: string;
    buttonName?: string;
    onCancel?: () => void;
    menu?: ReactNode;
}
