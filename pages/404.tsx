import { useRouter } from 'next/router';
import { useState } from 'react';
import { Text, Flex, Box } from '@100mslive/react-ui';
import Header from '@/components/Header';
import Badge from '@/components/Home/Badge';
import { SdkList } from '@/components/Home/MainCard';

const NotFound = () => {
    const router = useRouter();
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const menuState = { menu, setMenu };
    return (
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
                    <Text variant="h3" css={{ color: '$textHighEmp', fontWeight: '$semiBold' }}>
                        404
                    </Text>
                    <Text variant="h5" css={{ color: '$textHighEmp', mt: '$8' }}>
                        Couldn't find the page you were looking for:
                    </Text>
                    <Text className="mono" variant="h6" css={{ mt: '$8' }}>
                        {router.asPath.slice(1)}
                    </Text>
                    <Text
                        variant="h6"
                        css={{
                            color: '$textHighEmp',
                            mt: '$20'
                        }}>
                        Refer these links:
                    </Text>
                    <Flex css={{ gap: '$10', mt: '$8', flexWrap: 'wrap', w: '100%' }}>
                        {SdkList.map((sdk) => (
                            <Badge key={sdk.id} {...sdk} />
                        ))}
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default NotFound;

NotFound.getLayout = function getLayout(page) {
    return page;
};
