import { useState } from 'react';
import { ChevronDownIcon } from '@100mslive/react-icons';
import { Flex, Text } from '@100mslive/react-ui';

const PlatformAccordion = ({ title, icon }) => {
    const [open, setOpen] = useState(false);
    return (
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
            <Flex css={{ color: '$textPrimary' }}>
                <ChevronDownIcon
                    style={{
                        transition: 'all 0.3s ease',
                        transform: open ? 'rotateZ(-180deg)' : ''
                    }}
                />
            </Flex>
            <style jsx={true}>
                {`
                    .plat-accordion {
                        display: flex;
                        justify-content: space-between;
                        padding: 0.5rem 0;
                        margin: 1rem 0;
                        cursor: pointer;
                    }

                    .plat-accordion:hover {
                        opacity: 0.75;
                    }

                    @media screen and (max-width: 768px) {
                        .plat-accordion {
                            width: 100vw;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default PlatformAccordion;
