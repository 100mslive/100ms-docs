import { Text } from '@100mslive/react-ui';

const Tag = ({ text, css = {} }) => {
    return text ? (
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
    ) : null;
};

export default Tag;
