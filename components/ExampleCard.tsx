import * as reactIcons from '@100mslive/react-icons';
import { Box, Flex, HorizontalDivider, Text } from '@100mslive/react-ui';

interface Props extends React.ComponentPropsWithoutRef<typeof Box> {
    title: string;
    description: string;
    icons?: (keyof typeof reactIcons)[];
    showIcon?: boolean;
    tags?: string[];
    as?: React.ElementType;
}

export default function ExampleCard({
    title,
    description,
    icons = [],
    showIcon = true,
    tags = [],
    css = {},
    ...rest
}: Props) {
    return (
        <Box
            css={{
                backgroundImage:
                    'linear-gradient(279.91deg, rgba(19, 22, 27, 0.8) 37.76%, rgba(23, 27, 33, 0.8) 91.22%)',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0px 16px 56px rgba(0, 0, 0, 0.05)',
                ...css
            }}
            {...rest}>
            <Text variant="h6" css={{ color: '$textHighEmp', mb: '$2' }}>
                {title}
            </Text>
            <Text variant="body1" css={{ color: '$textMedEmp', fontWeight: '$regular' }}>
                {description}
            </Text>
            <HorizontalDivider css={{ backgroundColor: '$borderDefault', marginBlock: '$8' }} />
            <Flex justify="between">
                <IconList icons={icons} showIcon={showIcon} />
                <TagList tags={tags} />
            </Flex>
        </Box>
    );
}

type IconListProps = {
    icons: NonNullable<Props['icons']>;
    showIcon: Props['showIcon'];
};

function IconList({ icons, showIcon }: IconListProps) {
    if (!showIcon || icons.length === 0) {
        return null;
    }

    if (icons.length === 1) {
        const Icon = reactIcons[icons[0]];
        return (
            <Flex gap="2" css={{ color: '$textHighEmp' }}>
                <Icon />
                <Text>{icons[0].replace('Icon', '')}</Text>
            </Flex>
        );
    } else {
        return (
            <Flex as="ul" gap="2" css={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {icons.map((icon) => {
                    const Icon = reactIcons[icon];
                    return (
                        <Flex
                            as="li"
                            key={icon}
                            css={{
                                marginBottom: 0
                            }}>
                            <Icon />
                        </Flex>
                    );
                })}
            </Flex>
        );
    }
}

type TagListProps = {
    tags: NonNullable<Props['tags']>;
};

function TagList({ tags }: TagListProps) {
    return tags.length > 0 ? (
        <Flex as="ul" gap="2" css={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {tags.map((tag) => (
                <Box
                    as="li"
                    key={tag}
                    css={{
                        marginBottom: 0,
                        backgroundColor: '$secondaryDark',
                        borderRadius: '4px',
                        paddingBlock: '$1',
                        paddingInline: '$4'
                    }}>
                    <Text variant="body2" css={{ fontWeight: '$semiBold' }}>
                        {tag}
                    </Text>
                </Box>
            ))}
        </Flex>
    ) : null;
}
