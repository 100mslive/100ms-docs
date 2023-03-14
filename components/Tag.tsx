import { Text } from '@100mslive/react-ui';

const Tag = ({ text, css = {} }) => (
    <Text
        variant="xs"
        css={{
            backgroundColor: '$surfaceLighter',
            borderRadius: '$0',
            whiteSpace: 'nowrap',
            color: '$textPrimary',
            fontWeight: '$semiBold',
            px: '$xs',
            py: '$2',
            ...css
        }}>
        {text}
    </Text>
);

export default Tag;
