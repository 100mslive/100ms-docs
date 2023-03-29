import * as reactIcons from '@100mslive/react-icons';
import { Box, Flex, HorizontalDivider, Text } from '@100mslive/react-ui';
import { Technologies, technologyIconMap } from './TechnologySelect';

interface Props extends React.ComponentPropsWithoutRef<typeof Box> {
    title: string;
    description: string;
    technologies?: Technologies[];
    showIcon?: boolean;
    tags?: string[];
    as?: React.ElementType;
}

export default function ExampleCard({
    title,
    description,
    technologies = [],
    showIcon = true,
    tags = [],
    css = {},
    ...rest
}: Props) {
    return (
        <Flex
            css={{
                boxSizing: 'content-box',
                backgroundImage:
                    'linear-gradient(279.91deg, rgba(19, 22, 27, 0.8) 37.76%, rgba(23, 27, 33, 0.8) 91.22%)',
                padding: '24px',
                paddingBottom: '16px',
                borderRadius: '16px',
                border: '1px solid var(--border_light)',
                boxShadow: '0px 16px 56px rgba(0, 0, 0, 0.05)',
                ...css
            }}
            direction="column"
            align="strech"
            {...rest}>
            <Box css={{ flexGrow: '1' }}>
                <Flex css={{ mb: '$2' }} justify="between">
                    <Text
                        variant="h6"
                        css={{
                            color: '$textHighEmp',

                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            '-webkit-line-clamp': 1,
                            '-webkit-box-orient': 'vertical'
                        }}>
                        {title}
                    </Text>
                    <Box
                        as="span"
                        css={{
                            color: '$textPrimary',
                            transform: 'translate(40%, -40%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '20px',
                            width: '20px'
                        }}>
                        <reactIcons.ExternalLinkIcon height={13.34} width={13.34} />
                    </Box>
                </Flex>
                <Text
                    variant="body1"
                    css={{
                        color: '$textMedEmp',
                        fontWeight: '$regular',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        '-webkit-line-clamp': 2,
                        '-webkit-box-orient': 'vertical'
                    }}>
                    {description}
                </Text>
            </Box>

            <HorizontalDivider css={{ backgroundColor: '$borderDefault', marginBlock: '$8' }} />

            <Flex justify="between" css={{ gap: '$8' }}>
                <IconList technologies={technologies} showIcon={showIcon} />
                <TagList tags={tags} title={title} />
            </Flex>
        </Flex>
    );
}

type IconListProps = {
    technologies: Technologies[];
    showIcon: Props['showIcon'];
};

function IconList({ technologies, showIcon }: IconListProps) {
    if (!showIcon || technologies.length === 0) {
        return null;
    }

    if (technologies.length === 1) {
        const technology = technologies[0];
        let Icon;
        const iconNameOrPath = technologyIconMap[technology].icon;
        if (typeof iconNameOrPath === 'string' && reactIcons[iconNameOrPath] !== undefined) {
            Icon = reactIcons[iconNameOrPath];
        } else {
            Icon = iconNameOrPath;
        }
        return (
            <Flex gap="2" css={{ color: '$textHighEmp' }}>
                <Icon />
                <Text>{technology}</Text>
            </Flex>
        );
    } else {
        return (
            <Flex as="ul" gap="2" css={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {technologies.map((technology) => {
                    let Icon;
                    const iconNameOrPath = technologyIconMap[technology].icon;
                    if (
                        typeof iconNameOrPath === 'string' &&
                        reactIcons[iconNameOrPath] !== undefined
                    ) {
                        Icon = reactIcons[iconNameOrPath];
                    } else {
                        Icon = iconNameOrPath;
                    }
                    return (
                        <Flex
                            as="li"
                            key={technology}
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
    title: string;
};

function TagList({ tags, title }: TagListProps) {
    return tags.length > 0 ? (
        <Flex as="ul" gap="2" css={{ listStyle: 'none', padding: 0, margin: 0, overflow: 'auto' }}>
            {tags.map((tag) => (
                <Box
                    onClick={() => {
                        window.analytics.track('examples.tag.clicked', {
                            tag,
                            title
                        });
                    }}
                    as="li"
                    key={tag}
                    css={{
                        marginBottom: 0,
                        backgroundColor: '$surfaceLighter',
                        borderRadius: '4px',
                        paddingBlock: '$1',
                        paddingInline: '$4',
                        border: '1px solid $borderDefault'
                    }}>
                    <Text
                        variant="body2"
                        css={{
                            fontWeight: '$semiBold',
                            whiteSpace: 'nowrap',
                            color: '$textPrimary'
                        }}>
                        {tag}
                    </Text>
                </Box>
            ))}
        </Flex>
    ) : null;
}
