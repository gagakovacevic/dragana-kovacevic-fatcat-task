import clsx from 'clsx';

export const Layout = ({
    children,
    background,
}: {
    children: React.ReactNode;
    background: React.CSSProperties;
}) => {
    return <section className={clsx('py-20', background)}>{children}</section>;
};
