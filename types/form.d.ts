interface IForm {
    variant?: 'primary' | 'danger' | 'none';
    title: string;
    description?: string;
    buttonName: string;
    onCancel?: () => void;
}
