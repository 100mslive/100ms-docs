import { FilesIcon } from '@100mslive/react-icons';
import { Flex, Box, Text } from '@100mslive/react-ui';
import Item from './Item';
import { guides } from '../../guides';

const PopularGuides = () => (
    <Box css={{ w: '50%', '@xl': { w: '100%' } }}>
        <Text variant="h6" css={{ color: '$textHighEmp', mt: '0' }}>
            Popular how-to guides
        </Text>
        <Text variant="sm" css={{ color: '$textMedEmp', mt: '$2', mb: '$10' }}>
            Explore breadth of capabilities with popular guides
        </Text>
        <Flex direction="column">
            {guides.map((guide) => (
                <Item
                    key={guide.link}
                    title={guide.title}
                    subText={guide.subText}
                    link={guide.link}
                    icon={<FilesIcon style={{ marginTop: '0.15rem' }} />}
                />
            ))}
        </Flex>
    </Box>
);

export default PopularGuides;
