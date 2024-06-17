import React from 'react';
import { Flex, Text, Button } from '@100mslive/react-ui';
import { DynamicIcon } from './Callout';
import { ArrowRightIcon } from '@100mslive/react-icons';

const InfoTileLayout = ({ title, imageSrc, imageLeft = true, children }) => {
    return (
        <Flex
            align="center"
            justify="between"
            css={{
                width: '100%',
                color: 'var(--white)',
                borderRadius: '8px',
                gap: '20px',
                flexDirection: imageLeft ? 'row-reverse' : 'row'
            }}>
            <img
                src={'/info-image.png'}
                alt="Illustration"
                style={{ width: '420px', height: 'auto', borderRadius: '8px', padding: '20px' }}
            />
            <Flex direction="column" css={{ flex: 1 }}>
                <Text css={{ fontSize: '24px', fontWeight: 'bold' }}>{title}</Text>
                <Flex direction="column" css={{ margin: '20px 0' }}>
                    {children}
                </Flex>
                <Flex direction="row" css={{ alignContent: 'center' }}>
                    <Text
                        css={{
                            alignSelf: 'flex-start',
                            color: 'var(--selector_blue)',
                            cursor: 'pointer',
                            '&:hover': { color: 'var(--white)' }
                        }}>
                        View All
                    </Text>
                    <ArrowRightIcon color="var(--selector_blue)" height={20} width={20} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export const InfoTile = ({ icon, color = '$textHighEmp', text, title }) => {
    return (
        <Flex align="center" css={{ marginBottom: '10px' }}>
            <Flex
                css={{
                    padding: '10px',
                    marginRight: '10px',
                    borderRadius: '5px',
                    border: '1px solid var(--gray4)'
                }}>
                <DynamicIcon name={icon} color={color} />
            </Flex>
            <Flex direction="column" justify={'center'}>
                <Text css={{ fontSize: '16px' }}>{title}</Text>
                <Text
                    css={{
                        marginTop: '0px !important',
                        fontSize: '12px',
                        color: 'var(--text_med_emp)'
                    }}>
                    {text}
                </Text>
            </Flex>
        </Flex>
    );
};

export default InfoTileLayout;
