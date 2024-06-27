import clsx from 'clsx';

import { Button } from './Button';

type Card = {
    title: string;
    image: string;
    description: string;
    background: string;
    onClick: () => void;
    buttonText: string;
};

type CardProps = {
    cards: Card[];
};

export const Cards = ({ cards }: CardProps) => {
    return (
        <div className={'flex justify-center items-center'}>
            <div className={'grid grid-cols-2 gap-8 w-8/12'}>
                {cards.map(
                    ({
                        title,
                        image,
                        description,
                        background,
                        onClick,
                        buttonText,
                    }) => (
                        <div
                            key={title}
                            className={clsx('rounded-md p-8', background)}
                        >
                            <img src={image} alt="Icon" width="120" />
                            <div className="my-8">
                                <div className="text-2xl font-bold mb-2">
                                    {title}
                                </div>
                                <div className={'text-xl'}>{description}</div>
                            </div>
                            <Button onClick={onClick}>{buttonText}</Button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};