import clsx from 'clsx';

export const Button = (
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
    return (
        <button
            className={clsx(
                'rounded-lg px-4 py-2 bg-black text-white',
                props.className
            )}
            {...props}
        >
            {props.children}
        </button>
    );
};
