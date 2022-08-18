/* eslint-disable react/react-in-jsx-scope */
import {
    AndroidIcon,
    AppleIcon,
    ComputerIcon,
    FlutterIcon,
    JavascriptIcon,
    ReactIcon
} from '@100mslive/react-icons';
import { Box, Flex, Text } from '@100mslive/react-ui';
import DropDownOption from './DropDownOption';

const HomeDropDown = ({ setDropDownSelection }) => {
    const mobileSDK = [
        {
            icon: <AndroidIcon />,
            title: 'Android',
            id: 'android'
        },
        {
            icon: <AppleIcon />,
            title: 'iOS',
            id: 'ios'
        },
        {
            icon: <FlutterIcon />,
            title: 'Flutter',
            id: 'flutter'
        },
        {
            icon: <ReactIcon />,
            title: 'React Native',
            id: 'react-native'
        }
    ];
    return (
        <Flex
            className="dropdown-wrapper"
            onClick={(e) => e.preventDefault()}
            css={{
                position: 'absolute',
                zIndex: '10',
                top: '58px',
                backgroundColor: '$surfaceDefault',
                padding: '24px',
                borderRadius: '16px',
                gap: '$8'
            }}>
            <Box>
                <Text variant="overline">WEB</Text>
                <DropDownOption
                    title="JavaScript"
                    icon={<JavascriptIcon />}
                    setDropDownSelection={setDropDownSelection}
                />

                <DropDownOption
                    title="React"
                    icon={<ReactIcon />}
                    setDropDownSelection={setDropDownSelection}
                />
            </Box>

            <Box>
                <Text variant="overline">MOBILE</Text>
                {mobileSDK.map((tech) => (
                    <DropDownOption
                        key={tech.id}
                        title={tech.title}
                        icon={tech.icon}
                        setDropDownSelection={setDropDownSelection}
                    />
                ))}
            </Box>

            <Box>
                <Text variant="overline">SERVER</Text>
                <DropDownOption
                    title="Serverside"
                    icon={
                        <ComputerIcon
                            style={{
                                color: 'white'
                            }}
                        />
                    }
                    setDropDownSelection={setDropDownSelection}
                />
            </Box>
        </Flex>
    );
};

export default HomeDropDown;
