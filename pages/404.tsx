import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Text, Flex, Box } from '@100mslive/react-ui';
import Header from '@/components/Header';
import Badge from '@/components/Home/Badge';
import { SdkList } from '@/components/Home/MainCard';
import { ServerIcon } from '@100mslive/react-icons';

const NotFound = () => {
    const router = useRouter();
    const [renderComponents, setRenderComponents] = useState(false);
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const menuState = { menu, setMenu };

    const updatedList = [
        ...SdkList,
        {
            icon: <ServerIcon color="inherit" />,
            title: 'Server side',
            id: 'serverSide',
            link: '/server-side/v2/how--to-guides/make-api-calls'
        }
    ];

    useEffect(() => setRenderComponents(true), []);

    return renderComponents ? (
        <Box>
            <Header
                modal={modal}
                setModal={setModal}
                menuState={menuState}
                showReference={false}
                showMobileMenu={false}
            />
            <Flex justify="center" css={{ pt: '$20', px: '$12' }}>
                <Box>
                    <Text
                        variant="h3"
                        css={{
                            color: '$textHighEmp',
                            fontWeight: '$semiBold',
                            textAlign: 'center'
                        }}>
                        404
                    </Text>
                    <Text
                        variant="h5"
                        css={{ color: '$textHighEmp', my: '$4', textAlign: 'center' }}>
                        The page does not exist:
                    </Text>
                    <Text
                        className="mono"
                        css={{
                            textAlign: 'center',
                            color: '$textHighEmp',
                            fontSize: '$h6',
                            maxWidth: '45rem',
                            wordBreak: 'break-all',
                            mx: 'auto'
                        }}>
                        {router.asPath}
                    </Text>
                    <Flex
                        justify="center"
                        css={{
                            gap: '$6',
                            mt: '$18',
                            flexWrap: 'wrap',
                            w: '100%',
                            maxWidth: '600px',
                            mx: 'auto'
                        }}>
                        {updatedList.map((sdk) => (
                            <Badge key={sdk.id} {...sdk} />
                        ))}
                    </Flex>
                </Box>
            </Flex>
        </Box>
    ) : null;
};

export default NotFound;

NotFound.getLayout = function getLayout(page) {
    return page;
};
