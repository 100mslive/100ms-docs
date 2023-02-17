import Link from 'next/link';
import { Flex, Box, Text } from '@100mslive/react-ui';

const Item = ({ title, subText, icon, link, release = false }) => (
    <Flex gap="2" css={{ color: '$textHighEmp' }}>
        {icon}
        <Box>
            <Link href={link}>
                <a>
                    <Text
                        variant="sm"
                        className={release ? 'mono' : ''}
                        css={{ color: '$primaryLight' }}>
                        {title}
                    </Text>
                </a>
            </Link>
            <Text
                variant="sm"
                className={release ? 'mono' : ''}
                css={
                    release
                        ? {
                              color: '$textMedEmp',
                              mb: '$8'
                          }
                        : {
                              color: '$textMedEmp',
                              mt: '$2',
                              mb: '$8',
                              maxWidth: '1/3'
                          }
                }>
                {subText}
            </Text>
        </Box>
    </Flex>
);

export default Item;
