// FormGenerator.tsx
import React from 'react';

import {
    useForm,
    SubmitHandler,
    FieldErrors,
    FieldValues,
    UseFormRegister,
} from 'react-hook-form';
import { z, ZodSchema } from 'zod';

interface FormGeneratorProps<T extends FieldValues> {
    validationSchema: ZodSchema<T>;
    renderForm: (props: {
        register: UseFormRegister<T>;
        errors: FieldErrors<T>;
    }) => React.ReactNode;
    onSubmit: (data: T) => void;
}

export const FormGenerator = <T extends FieldValues>({
    validationSchema,
    renderForm,
    onSubmit,
}: FormGeneratorProps<T>) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<T>({
        resolver: (data) => {
            try {
                const parsedData = validationSchema.parse(data);
                return { values: parsedData, errors: {} };
            } catch (e) {
                const errors: FieldErrors<T> = {};
                if (e instanceof z.ZodError) {
                    e.errors.forEach((error) => {
                        if (error.path) {
                            errors[error.path.join('.') as keyof T] = {
                                type: error.message,
                                message: error.message,
                            } as FieldErrors<T>[keyof T];
                        }
                    });
                }
                return { values: {}, errors };
            }
        },
    });

    const onSubmitHandler: SubmitHandler<T> = (data) => {
        onSubmit(data);
    };

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            {renderForm({ register, errors })}
            <button
                className="py-2 px-4 bg-gray-300 rounded-md my-4 hover:brightness-105 transition-all"
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};
