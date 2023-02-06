import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Text, Box } from '@100mslive/react-ui';
import { menuItem } from '@/components/Sidebar';

const NotFound = () => {
    const router = useRouter();

    return (
        <Box css={{ maxWidth: '500px', pt: '$40', mx: 'auto', px: '$12' }}>
            <Text variant="h3" css={{ color: '$textAccentHigh', fontWeight: '$semiBold' }}>
                404
            </Text>
            <Text variant="h6" css={{ color: '$textAccentHigh', mt: '$8' }}>
                {router.asPath} does not exist
            </Text>
            <Text
                css={{
                    color: '$textAccentHigh',
                    fontWeight: '$semiBold',
                    mt: '$8'
                }}>
                Refer these links instead:
            </Text>
            <ul style={{ marginTop: '1rem' }}>
                {menuItem.map((item) => (
                    <Link key={item.link} href={item.link} passHref>
                        <a style={{ width: 'max-content' }}>
                            <li>
                                <Text css={{ color: '$primaryLight', w: 'max-content' }}>
                                    {item.name}
                                </Text>
                            </li>
                        </a>
                    </Link>
                ))}
            </ul>
        </Box>
    );
};

export default NotFound;

NotFound.getLayout = function getLayout(page) {
    return page;
};
