import { ChevronDownIcon, CodeIcon } from '@100mslive/react-icons';
import { Box, Text } from '@100mslive/react-ui';
import Chip from './Chip';
import { Listbox } from '@headlessui/react';
import { menuItem } from './Sidebar';


const ChipDropDown = ({ openFilter, setOpenFilter, platformFilter, setPlatformFilter, ALL_PLATFORMS }) => {
    const updatedMenuItem = [
        {
            name: ALL_PLATFORMS,
            icon: <CodeIcon />
        },
        ,
        ...menuItem
    ];
    
    return <Box>
        <Listbox
            value={platformFilter}
            onChange={(selection) => {
                setPlatformFilter(selection.name);
                setOpenFilter(false);
            }}>
            <Listbox.Button className="filter-dropdown">
                <Chip
                    innerContent={
                        <Text
                            variant="sm"
                            css={{
                                padding: '$2 $6',
                                color: '$textHighEmp',
                                whiteSpace: 'nowrap',
                                border: openFilter
                                    ? '1px solid $borderAccent'
                                    : '1px solid $borderLighter',
                                backgroundColor: openFilter ? '$primaryDefault' : '$surfaceDefault',
                                borderRadius: '$0',
                                display: 'flex',
                                fontWeight: '$semiBold',
                                alignItems: 'center',
                                '&:hover': {
                                    backgroundColor: openFilter
                                        ? '$primaryDefault'
                                        : '$surfaceLight'
                                }
                            }}>
                            {platformFilter || ALL_PLATFORMS}
                            <ChevronDownIcon height={16} width={16} style={{ marginLeft: '4px' }} />
                        </Text>
                    }
                    isActive={openFilter}
                    onClick={() => {
                        setOpenFilter((prev) => !prev);
                    }}
                />
            </Listbox.Button>

            <Listbox.Options className="dropdown-options filter-options">
                <Text
                    css={{
                        p: '$md',
                        fontWeight: '$semiBold',
                        color: '$textHighEmp',
                        borderBottom: '1px solid $borderLighter'
                    }}>
                    Technology
                </Text>
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
                            {m?.name}
                        </Text>
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    </Box>
};

export default ChipDropDown;
