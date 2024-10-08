import React, { useRef } from 'react';
import { ChevronDownIcon, CodeIcon } from '@100mslive/react-icons';
import { Box, Text } from '@100mslive/react-ui';
import { Listbox } from '@headlessui/react';
import useClickOutside from '@/lib/useClickOutside';
import { getUpdatedPlatformName } from '@/lib/utils';
import Chip from './Chip';
import { menuItem } from './Sidebar';
import { AppAnalytics } from '../lib/publishEvents';

const ChipDropDown = ({
    openFilter,
    setOpenFilter,
    platformFilter,
    setPlatformFilter,
    ALL_PLATFORMS
}) => {
    const updatedMenuItem = [
        {
            name: ALL_PLATFORMS,
            key: 'all-platforms',
            icon: <CodeIcon />
        },
        ...menuItem
    ];
    const optionsRef = useRef<any>(null);
    const buttonRef = useRef<any>(null);

    useClickOutside(optionsRef, () => {
        setOpenFilter(false);
        buttonRef?.current.blur();
    });

    return (
        <Box ref={optionsRef}>
            <Listbox
                value={platformFilter}
                onChange={(selection) => {
                    AppAnalytics.track('platform.changed', {
                        title: document.title,
                        referrer: document.referrer,
                        path: window.location.hostname,
                        pathname: window.location.pathname,
                        href: window.location.href,
                        platformSelected: selection.name
                    });
                    setPlatformFilter(selection.name);
                    setOpenFilter(false);
                    buttonRef?.current.blur();
                }}>
                <Listbox.Button
                    onFocusCapture={() => buttonRef?.current.blur()}
                    ref={buttonRef}
                    className="filter-dropdown">
                    <Chip
                        innerContent={
                            <Text
                                variant="sm"
                                css={{
                                    padding: '$2 $6',
                                    color: '$textHighEmp',
                                    whiteSpace: 'nowrap',
                                    border: '1px solid $primaryDefault',
                                    backgroundColor: openFilter
                                        ? '$primaryDisabled'
                                        : '$primaryDark',
                                    borderRadius: '$0',
                                    display: 'flex',
                                    fontWeight: '$semiBold',
                                    alignItems: 'center',
                                    '&:hover': {
                                        backgroundColor: openFilter
                                            ? '$primaryDisabled'
                                            : '$primaryDefault'
                                    }
                                }}>
                                {getUpdatedPlatformName(platformFilter || ALL_PLATFORMS)}
                                <ChevronDownIcon
                                    height={16}
                                    width={16}
                                    style={{
                                        marginLeft: '4px',
                                        transform: openFilter ? 'rotate(180deg)' : 'none'
                                    }}
                                />
                            </Text>
                        }
                        isActive={openFilter}
                        onClick={() => {
                            setOpenFilter((prev: boolean) => !prev);
                        }}
                    />
                </Listbox.Button>

                <Listbox.Options className="dropdown-options filter-options">
                    {updatedMenuItem.map((m) => (
                        <Listbox.Option
                            key={m?.name}
                            value={m}
                            className={({ active }) =>
                                `${
                                    active
                                        ? 'dropdown-option dropdown-option-active'
                                        : 'dropdown-option'
                                }`
                            }>
                            {m?.icon}
                            <Text variant="sm" css={{ marginLeft: '$md', color: '$textHighEmp' }}>
                                {getUpdatedPlatformName(m?.name)}
                            </Text>
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </Box>
    );
};

export default ChipDropDown;
