import { FormGenerator } from '@homework-app/components/FormGenerator';
import { Card } from '@homework-app/components/landing/Card';
import { List } from '@homework-app/components/List';
import clsx from 'clsx';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

const vscodeProjectLink = `vscode://file/${__CWD__}`;

const cards = [
    {
        title: 'Transfer the project to TypeScript',
        text: 'Your first task involves transitioning this project from JavaScript to TypeScript.',
        link: '#typescript',
    },
    {
        title: 'Create a scalable List Component',
        text: 'Build a scalable React component to fetch and display key information (id, name, username, email, and phone) from an API in a list format.',
        link: '#list',
    },
    {
        title: 'Create a Form Generator Component',
        text: 'Build a versatile React component with validation, API hook, and form rendering capabilities. ',
        link: '#form',
    },
    {
        title: 'Create a Page Generator Component',
        text: 'Create a versatile React component for dynamic webpage construction, adapting to various layouts and components through received props.',
        link: '#page',
    },
];

export const Landing = () => {
    return (
        <section className="bg-cream min-h-screen grid grid-cols-1 lg:grid-cols-landing gap-16 place-content-center p-8 sm:p-16">
            <div className="flex flex-col gap-6 items-start self-center w-full">
                <h1 className="leading-normal text-3xl xl:text-5xl xl:leading-normal text-black">
                    Welcome to Fat Cat&#39;s{' '}
                    <span className={'text-primary'}>Homework Task Page</span>
                    -where curiosity meets opportunity.
                </h1>
                <p className={'text-gray80 text-2xl'}>
                    Don&#39;t hesitate to connect if you have any questions.
                </p>
                <a
                    className="flex items-center gap-2 rounded-lg px-4 py-2 bg-black text-white"
                    href={vscodeProjectLink}
                >
                    <span className={clsx('text-lg')}>Read docs</span>
                    <img src="/media/landing/arrow.svg" alt="" />
                </a>
            </div>
            <img
                className="max-w-[600px] lg:max-w-none w-full self-center justify-self-center"
                src="/media/landing/hero.svg"
                alt=""
            />
            <div className="col-span-full grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <Card key={card.title} {...card} />
                ))}
            </div>
            <div className="flex flex-col gap-6 items-start justify-start w-full">
                <h2 className="text-2xl text-black">Solutions</h2>
                <h3 className="text-lg text-black" id="typescript">
                    1. Transfer the project to TypeScript
                </h3>
                <span className="text-gray-80">
                    The project has been converted to TypeScript.
                </span>
                <h3 className="text-lg text-black" id="list">
                    2. Create a scalable List Component
                </h3>
                <div className={'w-full h-[500px] overflow-y-auto'}>
                    <List />
                </div>
                <h3 className="text-lg text-black" id="form">
                    3. Create a Form Generator Component
                </h3>
                <MyForm />
            </div>
        </section>
    );
};

// Define the validation schema
const MyFormSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    age: z.number().min(18, 'You must be at least 18 years old'),
});

// Define the form values type based on the schema
type MyFormValues = z.infer<typeof MyFormSchema>;

// Use the FormGenerator component
const MyForm = () => {
    // Render the form
    const renderForm = ({
        register,
        errors,
    }: {
        register: UseFormRegister<MyFormValues>;
        errors: FieldErrors<MyFormValues>;
    }) => (
        <div className="w-full flex flex-col gap-2">
            <div className={'flex flex-col gap-2'}>
                <label>First Name</label>
                <input className="border" {...register('firstName')} />
                {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
            <div className={'flex flex-col  gap-2'}>
                <label>Last Name</label>
                <input className="border" {...register('lastName')} />
                {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>
            <div className={'flex flex-col  gap-2'}>
                <label>Email</label>
                <input className="border" {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className={'flex flex-col  gap-2'}>
                <label>Age</label>
                <input
                    type="number"
                    className="border"
                    {...register('age', { valueAsNumber: true })}
                />
                {errors.age && <p>{errors.age.message}</p>}
            </div>
        </div>
    );

    // Submit handler function
    const onSubmit = (data: MyFormValues) => {
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <FormGenerator
            validationSchema={MyFormSchema}
            renderForm={renderForm}
            onSubmit={onSubmit}
        />
    );
};
