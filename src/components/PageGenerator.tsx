import React from 'react';

import * as Components from '.';

type ComponentPropsMap = {
    [K in keyof typeof Components]: React.ComponentProps<
        (typeof Components)[K]
    >;
};

type ComponentType = keyof typeof Components;

interface ComponentProps<T extends ComponentType> {
    type: T;
    props: ComponentPropsMap[T];
}

interface SectionProps<T extends ComponentType> {
    type: T;
    props: ComponentPropsMap[T];
    components: ComponentProps<T>[];
}

interface PageGeneratorProps<T extends ComponentType> {
    data: SectionProps<T>[];
}

const PageGenerator = <T extends ComponentType>({
    data,
}: PageGeneratorProps<T>) => {
    return (
        <div>
            {data.map((section, index) => {
                const SectionLayout = Components[
                    section.type
                ] as React.ElementType;

                if (!SectionLayout) {
                    return null;
                }

                return (
                    <SectionLayout
                        key={index}
                        {...(section.props as ComponentPropsMap)}
                    >
                        {section.components.map((component, compIndex) => {
                            const ComponentType = Components[
                                component.type
                            ] as React.ElementType;

                            if (!ComponentType) {
                                return null;
                            }

                            return (
                                <ComponentType
                                    key={compIndex}
                                    {...(component.props as ComponentPropsMap)}
                                />
                            );
                        })}
                    </SectionLayout>
                );
            })}
        </div>
    );
};

export default PageGenerator;