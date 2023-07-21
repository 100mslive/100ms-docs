import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@100mslive/react-icons';
import { Flex, Text } from '@100mslive/react-ui';
import { titleCasing } from '../lib/utils';

const references = {
    Web: '/api-reference/javascript/v2/home/content',
    Android: '/api-reference/android/v2/index.html',
    'React Native': '/api-reference/react-native/v2/modules.html',
    Flutter:
        'https://pub.dev/documentation/hmssdk_flutter/latest/hmssdk_flutter/hmssdk_flutter-library.html',
    iOS: '/api-reference/ios/v2/documentation/hmssdk'
    // 'Server side': ''
};

const PlatformAccordion = ({
    title,
    icon,
    data,
    openPlatformAccordion,
    setOpenPlatformAccordion,
    id
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (openPlatformAccordion !== id) setOpen(false);
    });

    return (
        <div>
            <div
                onClick={() => {
                    setOpen((prev) => !prev);
                    setOpenPlatformAccordion(id);
                }}
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
                    // For when all children are accordions
                    <Link
                        passHref
                        href={`${
                            data['v2'][item][Object.keys(data['v2'][item])[0]]?.url ||
                            data['v2'][item][Object.keys(data['v2'][item])[0]][
                                Object.keys(data['v2'][item][Object.keys(data['v2'][item])[0]])[0]
                            ].url
                        }`}
                        key={`${title}-${item}`}>
                        <Text
                            as="a"
                            variant="sm"
                            css={{
                                pl: '$12',
                                my: '$8',
                                color: 'var(--docs_text_primary)',
                                display: 'block'
                            }}>
                            {titleCasing(item)}
                        </Text>
                    </Link>
                ))}
                {title !== 'Server side' ? (
                    <Link passHref href={references[title]}>
                        <Text
                            as="a"
                            variant="sm"
                            css={{
                                pl: '$12',
                                my: '$8',
                                color: 'var(--docs_text_primary)',
                                display: 'block'
                            }}>
                            API Reference
                        </Text>
                    </Link>
                ) : null}
            </div>
        </div>
    );
};

export default PlatformAccordion;
