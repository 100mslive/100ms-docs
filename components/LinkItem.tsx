import UtmLinkWrapper from './UtmLinkWrapper';
import { Text } from '@100mslive/react-ui';

export const LinkItem = ({ reference, text, css = {} }) => (
    <UtmLinkWrapper passHref href={reference}>
        <Text
            as="a"
            variant="sm"
            css={{
                pl: '$12',
                my: '$8',
                color: 'var(--docs_text_primary)',
                display: 'block',
                ...css
            }}>
            {text}
        </Text>
    </UtmLinkWrapper>
);
