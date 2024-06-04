import React from 'react';
import { Text } from '@100mslive/react-ui';

const Subtitle = ({ subtitle }) => (
    <Text as="p" css={{ color: 'var(--gray9)', fontSize: '18px' }}>
        {subtitle}
    </Text>
);

export default Subtitle;
