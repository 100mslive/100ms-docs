import Category, { CATEGORIES, Categories } from '@/components/Category';
import ExampleCard from '@/components/ExampleCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SegmentAnalytics from '@/components/SegmentAnalytics';
import { SearchIcon } from '@100mslive/react-icons';
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
        icon: 'PlayCircleIcon',
        textSmall: undefined
    },
    {
        text: 'Apps',
        icon: 'AllAppsIcon',
        textSmall: undefined
    },
    {
        text: 'Features',
        icon: 'WrenchIcon',
        textSmall: undefined
    },
    {
        text: 'Plugins',
        icon: 'RocketIcon',
        textSmall: undefined
    },
    {
        text: 'Extras',
        icon: 'BoxIcon',
        textSmall: undefined
    }
];

const examples: {
    title: string;
    description: string;
    url: string;
    icons: React.ComponentProps<typeof ExampleCard>['icons'];
    tags: string[];
    categories: Exclude<Categories, 'All Categories'>[];
}[] = [
    {
        title: 'React Clubhouse Clone 1',
        description: 'A Clubhouse clone in React using 100ms React SDKs.',
        url: 'https://github.com/100mslive/clubhouse-clone-react',
        icons: ['JavascriptIcon', 'ReactIcon', 'AndroidIcon'],
        tags: ['App', 'Advance'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'React Clubhouse Clone 2',
        description: 'A Clubhouse clone in React using 100ms React SDKs.',
        url: 'https://github.com/100mslive/clubhouse-clone-react',
        icons: ['ReactIcon'],
        tags: ['App', 'Advance'],
        categories: [CATEGORIES.EXTRAS]
    },
    {
        title: 'React Clubhouse Clone 3',
        description: 'A Clubhouse clone in React using 100ms React SDKs.',
        url: 'https://github.com/100mslive/clubhouse-clone-react',
        icons: ['JavascriptIcon', 'ReactIcon'],
        tags: ['App', 'Advance'],
        categories: [CATEGORIES.FEATURES]
    },
    {
        title: 'React Clubhouse Clone 4',
        description: 'A Clubhouse clone in React using 100ms React SDKs.',
        url: 'https://github.com/100mslive/clubhouse-clone-react',
        icons: ['JavascriptIcon', 'ReactIcon'],
        tags: ['App', 'Advance'],
        categories: [CATEGORIES.APPS, CATEGORIES.EXTRAS, CATEGORIES.PLUGINS]
    },
    {
        title: 'React Clubhouse Clone 5',
        description: 'A Clubhouse clone in React using 100ms React SDKs.',
        url: 'https://github.com/100mslive/clubhouse-clone-react',
        icons: ['JavascriptIcon', 'ReactIcon'],
        tags: ['App', 'Advance'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'React Clubhouse Clone 6',
        description: 'A Clubhouse clone in React using 100ms React SDKs.',
        url: 'https://github.com/100mslive/clubhouse-clone-react',
        icons: ['JavascriptIcon', 'ReactIcon'],
        tags: ['App', 'Advance'],
        categories: [CATEGORIES.APPS, CATEGORIES.EXTRAS]
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

    const [category, setCategory] = useState<Categories>(CATEGORIES.ALL_CATEGORIES);

    const [search, setSearch] = useState('');
    const filteredExamples = useMemo(
        () =>
            search.length > 0
                ? examples.filter(({ title, categories }) => {
                      const categoryMatch =
                          category === CATEGORIES.ALL_CATEGORIES
                              ? true
                              : categories.indexOf(category) !== -1;
                      return string_similarity(title, search) > 0.2 && categoryMatch;
                  })
                : examples.filter(({ categories }) =>
                      category === CATEGORIES.ALL_CATEGORIES
                          ? true
                          : categories.indexOf(category) !== -1
                  ),
        [search, category]
    );

    return (
        <>
            <SegmentAnalytics options={{}} title="100ms Docs Examples" />
            <Header modal={modal} setModal={setModal} menuState={menuState} showReference={false} />

            <Flex
                justify="center"
                align="center"
                direction="column"
                css={{
                    mx: 'auto',
                    paddingInline: '$14',
                    paddingBottom: '$14',
                    '@md': {
                        paddingInline: '$10',
                        paddingBottom: '$10'
                    }
                }}>
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
                            Explore what's possible with some example applications
                        </Text>
                    </Box>
                    <Search
                        refine={setSearch}
                        css={{
                            width: '100%',
                            boxSizing: 'border-box',
                            marginTop: '$12',
                            '@md': {
                                display: 'none'
                            }
                        }}
                    />
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
                            maxWidth: '260px',
                            '@md': {
                                maxWidth: 'initial'
                            }
                        }}>
                        Dropdown
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
                            gridTemplateColumns: '1fr 1fr',
                            columnGap: '30px',
                            rowGap: '40px',
                            flexGrow: 1,
                            '@md': {
                                rowGap: '24px',
                                gridTemplateColumns: '1fr'
                            }
                        }}>
                        {filteredExamples.map(({ description, icons, tags, title, url }) => (
                            <ExampleCard
                                as="a"
                                //@ts-ignore
                                href={url}
                                target="_blank"
                                key={title}
                                icons={icons}
                                tags={tags}
                                description={description}
                                title={title}
                                css={{
                                    height: 'max-content',
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
        </>
    );
}

const Search = ({ refine, css }) => {
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
                border: '1px solid #2C333F',
                borderRadius: '0.5rem',
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
}
