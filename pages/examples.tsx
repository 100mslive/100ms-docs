import Category, { CATEGORIES, Categories } from '@/components/Category';
import ExampleCard from '@/components/ExampleCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SegmentAnalytics from '@/components/SegmentAnalytics';
import TechnologySelect, { TECHNOLOGIES, Technologies } from '@/components/TechnologySelect';
// import { SearchIcon } from '@100mslive/react-icons';
import { Box, Flex, Text } from '@100mslive/react-ui';
import { useEffect, useMemo, useState } from 'react';

const categories: { text: Categories; textSmall?: string; icon: string }[] = [
    {
        text: 'All Categories',
        textSmall: 'All',
        icon: 'PlaylistIcon'
    },
    {
        text: 'Quickstarts',
        icon: 'PlayCircleIcon'
    },
    {
        text: 'Apps',
        icon: 'AllAppsIcon'
    },
    {
        text: 'Features',
        icon: 'WrenchIcon'
    },
    {
        text: 'Plugins',
        icon: 'RocketIcon'
    },
    {
        text: 'Extras',
        icon: 'BoxIcon'
    }
];

const examples: {
    title: string;
    description: string;
    url: string;
    tags: string[];
    categories: Exclude<Categories, 'All Categories'>[];
    technologies: Exclude<Technologies, 'All Technologies'>[];
}[] = [
    {
        title: 'Clubhouse Clone - React',
        description: 'A Clubhouse clone in React using 100ms React SDKs.',
        url: 'https://github.com/100mslive/clubhouse-clone-react',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT],
        tags: ['Web'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Slack Huddle Clone - React',
        description: 'A Slack Huddle clone in React using 100ms React SDKs.',
        url: 'https://github.com/100mslive/slack-huddle-clone',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT],
        tags: ['Web'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Discord Stages Clone - Next.js',
        description: 'A Discord Stages clone in Next.js using 100ms React SDKs.',
        url: 'https://github.com/100mslive/discord-stages-clone-100ms',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT, TECHNOLOGIES.NEXTJS],
        tags: ['Web'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Pose Detection - React',
        description:
            'A real time pose estimation app using React and Tensorflow.js using 100ms React SDKs.',
        url: 'https://github.com/100mslive/PosenetRealtime',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT],
        tags: ['Web', 'Tensorflow.js'],
        categories: [CATEGORIES.APPS, CATEGORIES.FEATURES]
    },
    {
        title: 'Virtual Events - Next.js',
        description:
            'A fully customizable virtual live events starter kit in Next.js using 100ms React SDKs.',
        url: 'https://github.com/100mslive/virtual-event-starter-kit',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT, TECHNOLOGIES.NEXTJS],
        tags: ['Web', 'Video Guide'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Telehealth App - Flutter',
        description:
            'A telehealth application that integrates 100ms Flutter SDK with the functionality of booking and joining an audio/visual appointment.',
        url: 'https://github.com/ygit/Telehealth_app/',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Quickstart - Flutter',
        description: 'A quick start video calling application using 100ms Flutter SDK.',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/flutter-quickstart-app',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Live Streaming - Flutter',
        description: ' A Flutter app to demonstrate live streaming using 100ms Flutter SDK.',
        url: 'https://github.com/adityathakurxd/live',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Callkit - Flutter',
        description: 'Flutter application for one-to-one calls using 100ms Flutter SDK.',
        url: 'https://github.com/Decoder07/hms-callkit-demo',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Omegle Clone - Flutter',
        description: 'An Omegle clone built with Flutter using 100ms Flutter SDK.',
        url: 'https://github.com/pushpam5/Omegle-Clone-100ms.git',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Thirdle - Flutter',
        description:
            'A multiplayer Wordle inspired game called Thirdle. Built using the 100ms Flutter SDK.',
        url: 'https://github.com/coder-with-a-bushido/thirdle/',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'Video Guide'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Flutter - GetX',
        description:
            'A sample app that contains the implementation of all the features provided by Flutter HMSSDK.',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/getx',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'GetX'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Flutter - MobX',
        description:
            'A sample app that contains the implementation of all the features provided by Flutter HMSSDK.',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/mobx',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'MobX'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Flutter - Bloc',
        description:
            'A sample app that contains the implementation of all the features provided by Flutter HMSSDK.',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/bloc',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'Bloc'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Flutter - Riverpod',
        description:
            'A sample app that contains the implementation of all the features provided by Flutter HMSSDK.',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/riverpod',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'Riverpod'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Clubhouse Clone - Flutter',
        description: 'A Clubhouse clone in Flutter using 100ms Flutter SDKs.',
        url: 'https://github.com/govindmaheshwari2/clubhouse_100ms/tree/starter',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Twitter Spaces - Android - Jetpack Compose',
        description: 'A simple Twitter spaces clone app with Jetpack compose using the 100ms SDK.',
        url: 'https://github.com/JoelKanyi/TwitterSpacesClone/tree/main',
        technologies: [TECHNOLOGIES.ANDROID],
        tags: ['Mobile', 'Jetpack Compose'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Android',
        description: 'An Android video conferencing app using 100ms SDK.',
        url: 'https://github.com/100mslive/100ms-android',
        technologies: [TECHNOLOGIES.ANDROID],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Android - Jetpack Compose',
        description: 'An Android video conferencing app using 100ms SDK.',
        url: 'https://github.com/100mslive/JetpackComposeSampleAndroid',
        technologies: [TECHNOLOGIES.ANDROID],
        tags: ['Mobile', 'Jetpack Compose'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Hello World - Android',
        description:
            'The bare minimum required to get a video call working end to end using the 100ms Android SDK.',
        url: 'https://github.com/100mslive/hello-world-android',
        technologies: [TECHNOLOGIES.ANDROID],
        tags: ['Mobile'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Sample App - iOS',
        description: 'An iOS video conferencing app using 100ms SDK.',
        url: 'https://github.com/100mslive/100ms-ios-sdk/tree/main/Example',
        technologies: [TECHNOLOGIES.IOS],
        tags: ['Mobile'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Screen Sharing - iOS',
        description:
            'A project demonstrating the screen sharing feature implementation with 100ms iOS SDK.',
        url: 'https://github.com/100mslive/100ms-ios-sdk/tree/main/ScreenSharingExample',
        technologies: [TECHNOLOGIES.IOS],
        tags: ['Mobile'],
        categories: [CATEGORIES.FEATURES]
    },
    {
        title: 'Clubhouse Clone - iOS ',
        description: 'A Clubhouse clone on iOS using 100ms SDKs in Swift.',
        url: 'https://github.com/100mslive/clubhouse-clone-ios-swift',
        technologies: [TECHNOLOGIES.IOS],
        tags: ['Mobile', 'Swift'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - React',
        description: 'A conferencing and streaming app built with 100ms SDK.',
        url: 'https://github.com/100mslive/100ms-web',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT],
        tags: ['Web'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - React Native',
        description: 'A sample app built with React Native using the 100ms React SDK.',
        url: 'https://github.com/100mslive/react-native-hms/tree/main/example',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT_NATIVE],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Quickstart - Svelte',
        description: 'A conferencing and streaming app built with Svelte using 100ms SDK.',
        url: 'https://github.com/100mslive/svelte-100ms',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.SVELTE],
        tags: ['Web'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Google Meet Clone - Flutter',
        description: 'A Google Meet clone built with Flutter using 100ms Flutter SDK.',
        url: 'https://github.com/100mslive/svelte-100ms',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Zoom Clone - Flutter',
        description: 'A Zoom clone built with Flutter using 100ms Flutter SDK.',
        url: 'https://github.com/govindmaheshwari2/zoom-example-app/tree/starter',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Whiteboard - Server',
        description: 'A collaborative whiteboard sample app by integrating with Pusher.',
        url: 'https://github.com/100mslive/whiteboard-server',
        technologies: [TECHNOLOGIES.NODEJS],
        tags: ['Server Side'],
        categories: [CATEGORIES.FEATURES, CATEGORIES.EXTRAS]
    },
    {
        title: 'Quickstart - JavaScript',
        description: 'A conferencing and streaming app built with JavaScript using 100ms SDK.',
        url: 'https://github.com/100mslive/100ms-examples/tree/main/web/js-quickstart',
        technologies: [TECHNOLOGIES.JAVASCRIPT],
        tags: ['Web', 'Vanilla JavaScript'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Quickstart - React',
        description: 'A conferencing and streaming app built with React using 100ms SDK.',
        url: 'https://github.com/100mslive/100ms-examples/tree/main/web/react-quickstart',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT],
        tags: ['Web'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Grayscale Filter',
        description: 'A demo on adding AR filters to an 100ms application.',
        url: 'https://github.com/triptu/100ms-face-filters',
        technologies: [TECHNOLOGIES.JAVASCRIPT],
        tags: ['Web', 'Jeeliz'],
        categories: [CATEGORIES.FEATURES, CATEGORIES.PLUGINS]
    }
];

export default function Examples() {
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const menuState = { menu, setMenu };
    const [, setCurrentTheme] = useState('dark');

    useEffect(() => {
        const updateTheme = (e) => setCurrentTheme(e.detail.theme);

        if (document) document.addEventListener('themeChanged', updateTheme);
        return () => document.removeEventListener('themeChanged', updateTheme);
    }, []);

    useEffect(() => {
        if (window) {
            setCurrentTheme(window.localStorage.theme || 'dark');
        }
    }, []);

    const [technology, setTechnology] = useState<Technologies>(TECHNOLOGIES.ALL_TECHNOLOGIES);
    const [category, setCategory] = useState<Categories>(CATEGORIES.ALL_CATEGORIES);
    // const [search, setSearch] = useState('');

    const filteredExamples = useMemo(() => {
        // if (search.length === 0) {
        //     return examples
        //         .filter(
        //             ({ categories }) =>
        //                 category === CATEGORIES.ALL_CATEGORIES ||
        //                 categories.indexOf(category) !== -1
        //         )
        //         .filter(
        //             ({ technologies }) =>
        //                 technology === TECHNOLOGIES.ALL_TECHNOLOGIES ||
        //                 technologies.indexOf(technology) !== -1
        //         );
        // }

        return examples
            .filter(
                ({ categories }) =>
                    category === CATEGORIES.ALL_CATEGORIES || categories.indexOf(category) !== -1
            )
            .filter(
                ({ technologies }) =>
                    technology === TECHNOLOGIES.ALL_TECHNOLOGIES ||
                    technologies.indexOf(technology) !== -1
            );
        //.filter(({ title }) => string_similarity(title, search) > 0.25)
        //.sort(
        //    (a, b) => string_similarity(b.title, search) - string_similarity(a.title, search)
        //);
    }, [category, technology]);

    return (
        <Flex direction="column" css={{ minHeight: '100vh' }}>
            <SegmentAnalytics options={{}} title="100ms Docs Examples" />
            <Header modal={modal} setModal={setModal} menuState={menuState} showReference={false} />

            <Flex
                align="center"
                direction="column"
                css={{
                    mx: 'auto',
                    width: '100%',
                    flexGrow: 1,
                    position: 'relative',
                    boxSizing: 'border-box',
                    maxWidth: '1512px',
                    paddingInline: '$14',
                    paddingBottom: '$24',
                    '@md': {
                        paddingInline: '$10',
                        paddingBottom: '$10'
                    }
                }}>
                <Box
                    as="img"
                    src="/docs/bg-example-transparent.png"
                    css={{
                        position: 'absolute',
                        top: '-370px',
                        pointerEvents: 'none'
                    }}></Box>

                <Flex
                    direction="column"
                    align="center"
                    css={{
                        maxWidth: '640px',
                        width: '100%',
                        marginBlock: '$24',
                        '@md': { marginBlock: '$10' }
                    }}>
                    <Box css={{ textAlign: 'center' }}>
                        <Text
                            variant="h3"
                            css={{
                                fontWeight: '$semiBold',
                                color: '$textPrimary',
                                marginBottom: '$2'
                            }}>
                            Examples
                        </Text>
                        <Text
                            variant="body1"
                            css={{ fontWeight: '$regular', color: '$textSecondary' }}>
                            Discover open source examples built with 100ms
                        </Text>
                    </Box>
                    {/*<Search
                        refine={setSearch}
                        css={{
                            width: '100%',
                            boxSizing: 'border-box',
                            marginTop: '$12',
                            '@md': {
                                display: 'none'
                            }
                        }}
                    />*/}
                </Flex>
                <Flex
                    direction={{ '@initial': 'row', '@md': 'column' }}
                    justify="center"
                    css={{
                        maxWidth: '1236px',
                        width: '100%',
                        gap: '43px'
                    }}>
                    <Flex
                        direction="column"
                        css={{
                            flexGrow: 1,
                            flexShrink: 0,
                            width: '260px',
                            maxWidth: '260px',
                            '@md': {
                                width: 'initial',
                                maxWidth: 'initial'
                            }
                        }}>
                        <TechnologySelect
                            css={{ marginBottom: '$10' }}
                            value={technology}
                            setValue={setTechnology}
                        />
                        <Flex
                            as="ul"
                            direction={{ '@initial': 'column', '@md': 'row' }}
                            css={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                gap: '$4',
                                overflow: 'auto'
                            }}>
                            {categories.map(({ icon, text, textSmall }) => (
                                <li key={text} style={{ marginBottom: 0, display: 'flex' }}>
                                    <Category
                                        active={text === category}
                                        as="button"
                                        icon={icon}
                                        text={text}
                                        textSmall={textSmall}
                                        css={{
                                            cursor: 'pointer',
                                            width: '100%',
                                            minWidth: 'max-content'
                                        }}
                                        onClick={() => setCategory(text)}
                                    />
                                </li>
                            ))}
                        </Flex>
                    </Flex>
                    <Box
                        css={{
                            display: 'grid',
                            minWidth: 0,
                            maxWidth: '928px',
                            gridTemplateColumns:
                                filteredExamples.length > 1
                                    ? 'repeat(auto-fit, minmax(min(100%, max(350px, 50% - 30px*1/2)), 1fr))'
                                    : '1fr 1fr',
                            columnGap: '30px',
                            rowGap: '40px',
                            flexGrow: 1,
                            '@md': {
                                rowGap: '16px',
                                gridTemplateColumns: '1fr'
                            }
                        }}>
                        {filteredExamples.map(({ description, technologies, tags, title, url }) => (
                            <ExampleCard
                                as="a"
                                //@ts-ignore
                                href={url}
                                target="_blank"
                                key={title}
                                technologies={technologies}
                                tags={tags}
                                description={description}
                                title={title}
                                css={{
                                    height: '152px',
                                    minWidth: filteredExamples.length === 1 ? '350px' : 0,
                                    '@md': {
                                        maxHeight: '142px'
                                    },
                                    '&:hover': {
                                        opacity: 1
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </Flex>
            </Flex>
            <Footer
                css={{ backgroundColor: 'var(--docs_bg_footer)', '.footer': { marginTop: 0 } }}
            />
        </Flex>
    );
}

/*const Search = ({ refine, css }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const debounceTimer = setTimeout(() => refine(searchTerm), 400);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    return (
        <Flex
            align="center"
            css={{
                color: '$textHighEmp',
                bg: '$surfaceDefault',
                padding: '$4 $6',
                border: '1px solid $borderLighter',
                borderRadius: '$1',
                ...css
            }}
            onClick={(e) => e.stopPropagation()}>
            <SearchIcon style={{ color: 'inherit', height: '24px', width: '24px' }} />
            <Text
                as="input"
                variant="body1"
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
                type="text"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                css={{
                    marginLeft: '16px',
                    backgroundColor: 'inherit',
                    outline: 'none',
                    border: 'none',
                    width: '100%',
                    fontWeight: '$regular'
                }}
            />
        </Flex>
    );
};

function get_bigrams(string) {
    let s = string.toLowerCase();
    let v = s.split('');
    for (let i = 0; i < v.length; i++) {
        v[i] = s.slice(i, i + 2);
    }
    return v;
}

function string_similarity(str1, str2) {
    if (str1.length > 0 && str2.length > 0) {
        const pairs1 = get_bigrams(str1);
        const pairs2 = get_bigrams(str2);
        const union = pairs1.length + pairs2.length;
        let hits = 0;
        for (let x = 0; x < pairs1.length; x++) {
            for (let y = 0; y < pairs2.length; y++) {
                if (pairs1[x] == pairs2[y]) hits++;
            }
        }
        if (hits > 0) return (2.0 * hits) / union;
    }
    return 0.0;
}*/
