import * as Select from '@radix-ui/react-select';
import * as reactIcons from '@100mslive/react-icons';
import { styled } from '@100mslive/react-ui';
import NodeJsIcon from '@/assets/icons/NodeJsIcon';

export const TECHNOLOGIES = {
    ALL_TECHNOLOGIES: 'All Technologies',
    REACT: 'React',
    JAVASCRIPT: 'JavaScript',
    FLUTTER: 'Flutter',
    ANDROID: 'Android',
    IOS: 'iOS',
    NEXTJS: 'NextJS',
    REACT_NATIVE: 'React Native',
    SVELTE: 'Svelte',
    NODEJS: 'Node.js'
} as const;

export type Technologies = typeof TECHNOLOGIES[keyof typeof TECHNOLOGIES];

export const technologyIconMap: Record<
    Technologies,
    {
        icon: keyof typeof reactIcons | React.ReactNode;
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
    [TECHNOLOGIES.REACT]: {
        icon: 'ReactIcon'
    },
    [TECHNOLOGIES.NODEJS]: {
        icon: NodeJsIcon
    }
};

const SelectTrigger = styled(Select.Trigger, {
    border: '1px solid $borderLighter',
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
    maxHeight: 'var(--radix-select-content-available-height)',
    paddingBlock: '$4',
    boxSizing: 'border-box'
});

const SelectItem = styled(Select.Item, {
    display: 'flex',
    gap: '$8',
    alignItems: 'center',
    padding: '$4 $8',
    '&[data-highlighted]': {
        backgroundColor: '$surfaceLighter',
        outline: 'none'
    }
});

type Props = {
    css?: React.ComponentPropsWithRef<typeof SelectTrigger>['css'];
    value: Technologies;
    setValue: (technology: Technologies) => void;
    onOpenChange?: (opened: boolean) => void;
};

export default function TechnologySelect({ css, value, setValue, onOpenChange }: Props) {
    let CurrentValueIcon;
    const iconNameOrPath = technologyIconMap[value].icon;
    if (typeof iconNameOrPath === 'string' && reactIcons[iconNameOrPath] !== undefined) {
        CurrentValueIcon = reactIcons[iconNameOrPath];
    } else {
        CurrentValueIcon = iconNameOrPath;
    }

    return (
        <Select.Root value={value} onValueChange={setValue} onOpenChange={onOpenChange}>
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
                <SelectContent position="popper" sideOffset={16} align="start">
                    <Select.Viewport>
                        {Object.values(TECHNOLOGIES).map((technology) => {
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
                                <SelectItem value={technology} key={technology}>
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
