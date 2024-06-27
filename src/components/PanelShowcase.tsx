export const PanelShowcase = ({
    items,
}: {
    items: {
        title: string;
        description: string;
        image: string;
    }[];
}) => {
    return (
        <div className={'flex justify-center items-center'}>
            <div
                className={
                    'grid grid-cols-3 gap-8 w-8/12 justify-center items-center'
                }
            >
                {items.map(({ title, description, image }) => (
                    <div
                        key={title}
                        className="flex flex-col gap-2 justify-center items-center text-center"
                    >
                        <img src={image} width="50" height="50" alt="Icon" />
                        <div className={'text-xl font-bold'}>{title}</div>
                        <div>{description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};