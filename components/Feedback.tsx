import React from 'react';
import { Flex, Box, Text } from '@100mslive/react-ui';

const emojis = [
    { image: '1', score: 1 },
    { image: '2', score: 2 },
    { image: '3', score: 3 },
    { image: '4', score: 4 }
];

const Feedback = () => (
    <Box>
        <Text variant="body2" css={{ fontWeight: '$medium' }}>
            How helpful was this page?
        </Text>
        <Flex>
            {emojis.map((emoji) => (
                <span key={emoji.score} onClick={}>
                    emoji.image
                </span>
            ))}
        </Flex>
    </Box>
);

export default Feedback;
