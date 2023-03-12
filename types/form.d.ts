import { ReactNode } from 'react';

interface IForm {
    variant?: 'primary' | 'danger' | 'none';
    title: string;
    description?: string;
    buttonName?: string;
    onCancel?: () => void;
    menu?: ReactNode;
}

interface IAddBoardForm {
    name: string;
    columns: {
        value: string;
    }[];
}

interface IEditBoardForm {
    name: string;
    columns: {
        id: number;
        value: string;
    }[];
}

interface IAddTaskForm {
    title: string;
    description: string;
    subtasks: {
        value: string;
    }[];
    status: string;
}

interface IEditTaskForm {
    title: string;
    description: string;
    subtasks: {
        id: number;
        value: string;
    }[];
    status: string;
}

interface IDetailTaskForm {
    subtasks: {
        value: boolean;
    }[];
    status: string;
}
