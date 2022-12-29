import { Box, Text } from '@100mslive/react-ui';
import { useEffect, useState } from 'react';

export type TocItem = {
    slug: string;
    title: string;
};

export default function StepsToc({ parentId }) {
    const [toc, setToc] = useState<TocItem[]>([]);
    const parentIdHash = parentId ? `#${parentId}` : '';
    useEffect(() => {
        const list: TocItem[] = [];
        const ids = document.querySelectorAll(`${parentIdHash} h3`);
        ids.forEach((t) =>
            list.push({
                title: t.textContent || '',
                slug: t.id
            })
        );
        setToc(list);
    }, []);
    return (
        <Box
            as="section"
            css={{
                display: 'grid',
                gap: '20px',
                gridTemplateColumns:
                    'repeat(auto-fit, minmax(min(100%/1, max(270px, 100%/3)), 1fr))',
                marginBottom: '20px'
            }}>
            {toc.map((item, index) => (
                <Box
                    as="a"
                    href={`#${item.slug}`}
                    css={{
                        textDecoration: 'none',
                        height: '200px',
                        backgroundColor: 'var(--docs_bg_card)',
                        borderRadius: 'var(--docs_border_radius_s)',
                        border: '1px solid var(--docs_border_default)',
                        padding: '20px',
                        '&:hover': {
                            borderColor: 'var(--docs_primary_light)'
                        }
                    }}>
                    {/*<Box
                        css={{
                            borderRadius: '50%',
                            backgroundColor: 'var(--docs_bg_header)',
                            height: '20px',
                            width: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {index + 1}
                    </Box>*/}
                    <Text variant="lg">{item.title}</Text>
                </Box>
            ))}
        </Box>
    );
}
