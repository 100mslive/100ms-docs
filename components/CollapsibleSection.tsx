import React, { ReactNode, useState } from 'react';
import { ChevronRightIcon } from '@100mslive/react-icons';

/*
Usage:

<Collapsible.Root title="Title for this section">
    
    <Collapsible.Preview>
        This will always be visible but is optional
    </Collapsible.Preview>
    
    <Collapsible.Content>
        This will be hidden after closing. Content should always be defined
    </Collapsible.Content>

</Collapsible.Root>
 */

const CollapsibleRoot = ({ title, children }: { title: string; children: ReactNode[] }) => {
    let [previewContent, mainContent] = children;
    if (!mainContent) {
        mainContent = previewContent;
        previewContent = '';
    }
    const [open, setOpen] = useState(true);
    return (
        <div style={{ margin: '1rem 0' }}>
            {/* eslint-disable-next-line */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--docs_text_primary)',
                    cursor: 'pointer'
                }}
                onClick={() => setOpen((prev) => !prev)}>
                <ChevronRightIcon
                    style={{
                        transform: `rotate(${open ? '-90' : '0'}deg)`,
                        transition: 'transform ease 0.2s'
                    }}
                />

                <h2 style={{ margin: 0 }}>{title}</h2>
            </div>
            {previewContent}
            <div style={{ height: open ? 'auto' : '0', overflowY: 'hidden' }}>{mainContent}</div>
        </div>
    );
};

const CollapsiblePreview = ({ children }: { children: ReactNode }) => (
    <div style={{ margin: '0.5rem 0' }}>{children}</div>
);

const CollapsibleContent = ({ children }: { children: ReactNode }) => (
    <div style={{ margin: '0.5rem 0' }}>{children}</div>
);

export const Collapsible = {
    Root: CollapsibleRoot,
    Preview: CollapsiblePreview,
    Content: CollapsibleContent
};
