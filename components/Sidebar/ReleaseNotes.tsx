import React from 'react';
import UtmLinkWrapper from '../UtmLinkWrapper';

const ReleaseNotes = ({ dataObj }) => {
    const isActive = window && window.location.href.includes(dataObj.url);

    return (
        <UtmLinkWrapper prefetch={false} href={dataObj.url || ''} key={`${dataObj.url}-rel-notes`}>
            <a
                className="opaque-link"
                style={{
                    cursor: 'pointer',
                    padding: '0.25rem 0',
                    color: isActive
                        ? 'var(--docs_text_primary)'
                        : 'var(--hms-ui-colors-textMedEmp)',
                    fontWeight: '600',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginTop: 'var(--hms-ui-space-8)'
                }}>
                {dataObj.title}
            </a>
        </UtmLinkWrapper>
    );
};

export default ReleaseNotes;
