import Link from 'next/link';
import { Text } from '@100mslive/react-ui';

export const LinkItem = ({ reference, text, css = {} }) => (
    <Link passHref href={reference}>
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
    </Link>
);
