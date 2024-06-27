import clsx from 'clsx';

type LayoutProps = {
    children: React.ReactNode;
    background: React.CSSProperties['color'];
};

export const Layout = ({ children, background }: LayoutProps) => {
    return (
        <section className={clsx('py-20 flex gap-4 flex-col', background)}>
            {children}
        </section>
    );
};