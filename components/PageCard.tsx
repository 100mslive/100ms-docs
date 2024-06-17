import React, { useState } from 'react';
import { Flex, Text } from '@100mslive/react-ui';

import { DynamicIcon } from './Callout';
import { ArrowRightIcon } from '@100mslive/react-icons';

const PageCard = ({
    showCta = true,
    showTag = false,
    showImage = false,
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
                        padding: '0px !important',
                        transition: 'transform 0.3s',
                        transform: hover ? 'translateY(9rem)' : 'translateY(0)'
                    }}
                />
            )}

            <Flex
                style={{
                    marginTop: '12px',
                    marginLeft: '22px',
                    transition: 'transform 0.3s',
                    transform: showImage
                        ? hover
                            ? 'translateY(-12rem)'
                            : 'translateY(0)'
                        : 'translateY(0)'
                }}
                direction={'column'}>
                {showTag && (
                    <Flex
                        style={{
                            background: 'var(--selector_blue)',
                            width: 'fit-content',
                            marginTop: showImage ? '24px' : '0',
                            padding: '4px 8px',
                            textAlign: 'center',
                            borderRadius: '4px',
                            alignItems: 'center'
                        }}>
                        <Text
                            css={{
                                margin: '0 !important',
                                color: 'white',
                                lineHeight: '0.5rem',
                                padding: '4px 8px',
                                fontSize: '14px',
                                fontWeight: '600'
                            }}>
                            Tag Text
                        </Text>
                    </Flex>
                )}
                <Flex
                    style={{
                        textAlign: 'center',
                        marginTop: '12px'
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
                        marginBottom: showCta ? '12px !important' : '24px !important'
                    }}
                    className={`description ${hover ? 'hover' : ''}`}>
                    {description}
                </Text>
            </Flex>
            {showCta && (
                <Flex
                    gap={1}
                    style={{
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        backgroundColor: 'var(--new_surface_lighter)',
                        borderRadius: '0px 0px 16px  16px'
                    }}>
                    <a
                        href="#"
                        className="cta"
                        style={{
                            textDecoration: 'none',
                            paddingLeft: '24px'
                        }}>
                        <Flex
                            gap={1}
                            style={{
                                alignItems: 'center'
                            }}>
                            <Text
                                css={{
                                    color: 'var(--selector_blue)',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    margin: '0 !important',
                                    padding: '0 !important'
                                }}>
                                Read More
                            </Text>
                            <ArrowRightIcon
                                height="16px"
                                width="16px"
                                color="var(--selector_blue)"
                            />
                        </Flex>
                    </a>
                </Flex>
            )}
        </Flex>
    );
};

export default PageCard;
