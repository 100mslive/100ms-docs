import * as Select from '@radix-ui/react-select';
import * as reactIcons from '@100mslive/react-icons';
import { styled } from '@100mslive/react-ui';

export const TECHNOLOGIES = {
    ALL_TECHNOLOGIES: 'All Technologies',
    FLUTTER: 'Flutter',
    ANDROID: 'Android',
    REACT_NATIVE: 'React Native',
    IOS: 'iOS',
    NEXTJS: 'NextJS',
    SVELTE: 'Svelte',
    JAVASCRIPT: 'JavaScript',
    VUEJS: 'VueJS',
    REACT: 'React'
} as const;

export type Technologies = typeof TECHNOLOGIES[keyof typeof TECHNOLOGIES];

export const technologyIconMap: Record<
    Technologies,
    {
        icon: keyof typeof reactIcons;
    }
> = {
    [TECHNOLOGIES.ALL_TECHNOLOGIES]: {
        icon: 'LayersIcon'
    },
    [TECHNOLOGIES.FLUTTER]: {
        icon: 'FlutterIcon'
    },
    [TECHNOLOGIES.ANDROID]: {
        icon: 'AndroidIcon'
    },
    [TECHNOLOGIES.REACT_NATIVE]: {
        icon: 'ReactIcon'
    },
    [TECHNOLOGIES.IOS]: {
        icon: 'AppleIcon'
    },
    [TECHNOLOGIES.NEXTJS]: {
        icon: 'NextJsIcon'
    },
    [TECHNOLOGIES.SVELTE]: {
        icon: 'BoxIcon'
    },
    [TECHNOLOGIES.JAVASCRIPT]: {
        icon: 'JavascriptIcon'
    },
    [TECHNOLOGIES.VUEJS]: {
        icon: 'BoxIcon'
    },
    [TECHNOLOGIES.REACT]: {
        icon: 'ReactIcon'
    }
};

const SelectTrigger = styled(Select.Trigger, {
    border: '1px solid #2D3440',
    backgroundColor: '$surfaceDefault',
    borderRadius: '$1',
    display: 'flex',
    alignItems: 'center',
    gap: '$8',
    padding: '$6 $8',
    '& .technology-icon-open, & .technology-icon-close': {
        display: 'none'
    },
    '&[data-state=closed] .technology-icon-open': {
        display: 'block'
    },
    '&[data-state=open] .technology-icon-close': {
        display: 'block'
    },

    '&[data-state=open]': {
        color: '$textDisabled'
    }
});

const SelectContent = styled(Select.Content, {
    gap: '$2',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '$surfaceLight',
    borderRadius: '$1',
    width: 'var(--radix-select-trigger-width)',
    paddingBlock: '$4'
});

const SelectItem = styled(Select.Item, {
    display: 'flex',
    gap: '$8',
    alignItems: 'center',
    padding: '$4 $8',
    '&[data-highlighted]': {
        backgroundColor: '$secondaryDefault',
        outline: 'none'
    }
});

type Props = {
    css?: React.ComponentPropsWithRef<typeof SelectTrigger>['css'];
    value: Technologies;
    setValue: (technology: Technologies) => void;
};

export default function TechnologySelect({ css, value, setValue }: Props) {
    const CurrentValueIcon = reactIcons[technologyIconMap[value].icon];

    return (
        <Select.Root value={value} onValueChange={setValue}>
            <SelectTrigger css={css}>
                <CurrentValueIcon />
                <Select.Value asChild>
                    <span style={{ flexGrow: 1, textAlign: 'left' }}>{value}</span>
                </Select.Value>
                <Select.Icon asChild className="technology-icon-open">
                    <reactIcons.ChevronDownIcon />
                </Select.Icon>
                <Select.Icon asChild className="technology-icon-close">
                    <reactIcons.ChevronUpIcon />
                </Select.Icon>
            </SelectTrigger>
            <Select.Portal>
                <SelectContent position="popper" sideOffset={16} align="center">
                    <Select.Viewport>
                        {Object.values(TECHNOLOGIES).map((technology) => {
                            const Icon = reactIcons[technologyIconMap[technology].icon];
                            return (
                                <SelectItem value={technology}>
                                    <Icon />
                                    <Select.ItemText asChild>
                                        <span style={{ flexGrow: 1, textAlign: 'left' }}>
                                            {technology}
                                        </span>
                                    </Select.ItemText>
                                    <Select.ItemIndicator asChild>
                                        <reactIcons.CheckCircleIcon />
                                    </Select.ItemIndicator>
                                </SelectItem>
                            );
                        })}
                    </Select.Viewport>
                </SelectContent>
            </Select.Portal>
        </Select.Root>
    );
}
