import React, { ReactNode, useState } from 'react';
import { ChevronRightIcon, ComputerIcon, InfoIcon, LayoutIcon } from '@100mslive/react-icons';

/*
Usage:

<CollapsibleStep title="Second last release" number={1} open={true} platform="Dashboard">
    ....
</CollapsibleStep>
 */

const getPlatformIcon = {
    Dashboard: <LayoutIcon height={20} width={20} />,
    Client: <ComputerIcon height={20} width={20} />
};

export const CollapsibleStep = ({
    number,
    title,
    platform,
    open = false,
    children
}: {
    number: number;
    platform: string;
    open: boolean;
    title: string;
    children: ReactNode[];
}) => {
    const [openStep, setOpenStep] = useState(open);
    return (
        <div
            style={{
                padding: '1.5rem 0',
                border: '1px solid var(--docs_border_strong)',
                borderLeft: 'none',
                borderRight: 'none'
            }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    color: 'var(--docs_text_primary)'
                }}>
                <div style={{ display: 'flex', width: '100%', gap: '0.5rem' }}>
                    <span
                        style={{
                            borderRadius: '50%',
                            height: '1.5rem',
                            width: '1.5rem',
                            background: 'var(--new_surface_light)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        {number}
                    </span>

                    <h2 style={{ margin: 0 }}>{title}</h2>
                </div>
                {/* eslint-disable-next-line */}
                <div
                    onClick={() => setOpenStep((prev) => !prev)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        cursor: 'pointer'
                    }}>
                    {platform ? (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '14px',
                                color: 'var(--text_med_emp)'
                            }}>
                            {getPlatformIcon[platform] || <InfoIcon />} {platform}
                        </div>
                    ) : (
                        ''
                    )}

                    <ChevronRightIcon
                        height={20}
                        width={20}
                        style={{
                            transform: `rotate(${openStep ? '-90' : '90'}deg)`,
                            transition: 'transform ease 0.2s'
                        }}
                    />
                </div>
            </div>

            <div style={{ height: openStep ? 'auto' : '0', overflowY: 'hidden' }}>{children}</div>
        </div>
    );
};
