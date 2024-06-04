import React from 'react';
import { Text } from '@100mslive/react-ui';

const Subtitle = ({ content }) => (
    <Text as="p" css={{ color: 'var(--gray9)', fontSize: '18px' }}>
        {content}
    </Text>
);

export default Subtitle;
