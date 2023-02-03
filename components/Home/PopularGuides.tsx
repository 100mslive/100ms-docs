import Link from 'next/link';
import { FilesIcon } from '@100mslive/react-icons';
import { Flex, Box, Text } from '@100mslive/react-ui';
import { guides } from '../../guides';

const PopularGuides = () => (
    <Box css={{ w: '50%', '@xl': { w: '100%' } }}>
        <Text variant="h6" css={{ color: '$textHighEmp', mt: '0' }}>
            Popular how-to guides
        </Text>
        <Text variant="sm" css={{ color: '$textMedEmp', mt: '$2', mb: '$10' }}>
            Explore breadth of capabilities with popular guides
        </Text>
        {guides.map((guide) => (
            <Flex gap="2">
                <FilesIcon style={{ marginTop: '0.15rem' }} />
                <Box>
                    <Link href={guide.link}>
                        <a>
                            <Text variant="sm" css={{ color: '$primaryLight' }}>
                                {guide.title}
                            </Text>
                        </a>
                    </Link>
                    <Text
                        variant="sm"
                        css={{
                            color: '$textMedEmp',
                            mt: '$2',
                            mb: '$8',
                            maxWidth: '1/3'
                        }}>
                        {guide.subText}
                    </Text>
                </Box>
            </Flex>
        ))}
    </Box>
);

export default PopularGuides;
