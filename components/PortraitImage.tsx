import { Flex } from '@100mslive/react-ui';

export const PortraitImage = ({
    src = '',
    alt = '',
    height = '450',
    width = '200'
}: {
    src: string;
    alt: string;
    height: string;
    width: string;
}) => (
    <Flex align="center" justify="center" css={{ w: '100%', my: '$xs' }}>
        <img src={src} alt={alt} height={height} width={width} />
    </Flex>
);
