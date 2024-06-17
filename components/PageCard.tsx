import React, { useState } from 'react';
import { Flex, Text } from '@100mslive/react-ui';

import { DynamicIcon } from './Callout';

const PageCard = ({
    showCta = true,
    showImage = true,
    icon,
    color = '$textHighEmp',
    title,
    description
}) => {
    const [hover, setHover] = useState(false);

    return (
        <Flex
            direction="column"
            css={{
                background: 'var(--new_surface_light)',
                borderRadius: '16px',
                width: '40%',
                boxSizing: 'border-box',
                border: hover
                    ? '1px solid var(--new_border_default)'
                    : '1px solid var(--new_surface_lighter)',
                transition: 'border-color 0.3s'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            {showImage && (
                <img
                    width="100%"
                    src={'/guides/audio-room.png'}
                    alt="Page Card Image"
                    className={`image ${hover ? 'hover' : ''}`}
                    style={{
                        borderRadius: '16px 16px 0px 0px',
                        height: 'auto',

                        aspectRatio: '16/9',
                        padding: '0px !important'
                    }}
                />
            )}
            <Flex
                style={{
                    background: 'var(--selector_blue)',
                    width: 'fit-content',
                    marginLeft: '24px',
                    marginTop: '24px',
                    padding: '4px 8px',
                    textAlign: 'center',
                    borderRadius: '4px'
                }}>
                <Text
                    style={{
                        marginTop: '0 !important',
                        color: 'white',
                        lineHeight: '0.5rem',
                        padding: '4px 6px'
                    }}>
                    Tag Text
                </Text>
            </Flex>

            <Flex
                style={{
                    marginTop: '12px',
                    marginLeft: '22px',
                    textAlign: 'center'
                }}
                gap={'2'}
                align={'center'}>
                <DynamicIcon name={icon} color={color} />
                <Text
                    css={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: 'var(--white)',
                        marginTop: '0 !important',
                        paddingBottom: '0 !important'
                    }}>
                    {title}
                </Text>
            </Flex>
            <Text
                css={{
                    fontSize: '14px',
                    color: 'var(--text_med_emp)',
                    marginTop: '4px !important',
                    marginBottom: showCta ? '12px !important' : '24px !important',
                    paddingLeft: '24px'
                }}
                className={`description ${hover ? 'hover' : ''}`}>
                {description}
            </Text>
            {showCta && (
                <Flex
                    style={{
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        textAlign: 'center',
                        backgroundColor: 'var(--new_surface_lighter)',
                        borderRadius: '0px 0px 16px  16px'
                    }}>
                    <a
                        href="#"
                        className="cta"
                        style={{
                            color: '#66A1FF',
                            textDecoration: 'none',
                            paddingLeft: '24px'
                        }}>
                        Read More
                    </a>
                </Flex>
            )}
        </Flex>
    );
};

export default PageCard;
