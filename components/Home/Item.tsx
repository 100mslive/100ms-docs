import Link from 'next/link';
import { Flex, Box, Text } from '@100mslive/react-ui';

const Item = ({ title, subText, icon, link, release = false }) => (
    <Box css={{ mb: '$4' }}>
        <Link href={link}>
            <Flex
                gap="2"
                css={{
                    color: '$textHighEmp',
                    width: release ? '90%' : 'auto',
                    borderRadius: '$1',
                    cursor: 'pointer',
                    padding: release ? '$3 $4 $3 $6' : '$4 $4 $4 $6',
                    '&:hover': { backgroundColor: '$surfaceLight' }
                }}>
                {icon}
                <Box>
                    <Text
                        variant="sm"
                        className={release ? 'mono' : ''}
                        css={{ color: '$primaryLight', fontWeight: '$medium' }}>
                        {title}
                    </Text>
                    <Text
                        variant="sm"
                        className={release ? 'mono' : ''}
                        css={
                            release
                                ? {
                                      color: '$textMedEmp'
                                  }
                                : {
                                      color: '$textMedEmp',
                                      mb: '$2',
                                      maxWidth: '1/3'
                                  }
                        }>
                        {subText}
                    </Text>
                </Box>
            </Flex>
        </Link>
    </Box>
);

export default Item;
