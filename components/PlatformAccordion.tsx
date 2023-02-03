import { useState } from 'react';
import { ChevronDownIcon } from '@100mslive/react-icons';
import { Flex, Text } from '@100mslive/react-ui';
import { titleCasing } from '../lib/utils';

const PlatformAccordion = ({ title, icon, data }) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div
                onClick={() => setOpen((prev) => !prev)}
                className="plat-accordion"
                style={{
                    minWidth: '240px',
                    width: '100%'
                }}>
                <Flex gap="2">
                    <Flex css={{ color: '$primaryLight' }}>{icon}</Flex>
                    <Text css={{ color: '$textHighEmp', fontWeight: '$semiBold' }}>{title}</Text>
                </Flex>
                <Flex css={{ color: open ? '$textMedEmp' : '$textHighEmp' }}>
                    <ChevronDownIcon
                        style={{
                            color: 'inherit',
                            transition: 'all 0.3s ease',
                            transform: open ? 'rotateZ(-180deg)' : ''
                        }}
                    />
                </Flex>
            </div>

            <div className={`plat-accordion-content ${open ? 'active-plat-accordion' : ''}`}>
                {Object.keys(data['v2']).map((item) => (
                    <a
                        href={data['v2'][item][Object.keys(data['v2'][item])[0]].url}
                        key={`${title}-${item}`}>
                        <Text variant="sm" css={{ pl: '$12', my: '$8', color: "var(--docs_text_primary)" }}>
                            {titleCasing(item)}
                        </Text>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default PlatformAccordion;
