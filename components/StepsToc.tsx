import React, { useMemo } from 'react';
import { Box, Text } from '@100mslive/react-ui';

export type TocItem = {
    slug: string;
    title: string;
    description: string;
};

export default function StepsToc({
    parentId,
    descriptions = []
}: {
    parentId: string;
    descriptions: string[];
}) {
    // props from mdx gets converted to a string
    if (typeof descriptions === 'string') {
        const descriptionString = descriptions as string;
        descriptions = JSON.parse(descriptionString) as string[];
    }

    const parentIdHash = parentId ? `#${parentId}` : '';
    const toc = useMemo(() => {
        const list: TocItem[] = [];
        if (typeof window !== 'undefined') {
            const ids = document.querySelectorAll(`${parentIdHash} h3`);
            ids.forEach((t, idx) =>
                list.push({
                    title: t.textContent ?? '',
                    slug: t.id,
                    description: descriptions[idx] ?? ''
                })
            );
        }
        return list;
    }, [descriptions, parentIdHash]);

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
                    key={item.slug}
                    as="a"
                    href={`#${item.slug}`}
                    css={{
                        textDecoration: 'none',
                        backgroundColor: 'var(--docs_bg_card)',
                        color: 'var(--docs_text_secondary)',
                        borderRadius: 'var(--docs_border_radius_s)',
                        border: '1px solid var(--docs_border_default)',
                        padding: '20px',
                        '&:hover': {
                            borderColor: 'var(--docs_primary_light)'
                        }
                    }}>
                    <Box
                        css={{
                            borderRadius: '50%',
                            backgroundColor: 'var(--docs_bg_code_highlight)',
                            marginBottom: '10px',
                            height: '40px',
                            width: '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {index + 1}
                    </Box>
                    <Text variant="lg">{item.title}</Text>
                    <Text css={{ marginTop: '15px' }}>{item.description}</Text>
                </Box>
            ))}
        </Box>
    );
}
