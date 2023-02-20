import categories from '@/common/categories';
import examples from '@/common/examples';
import Category, { CATEGORIES, Categories } from '@/components/Category';
import ExampleCard from '@/components/ExampleCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SegmentAnalytics from '@/components/SegmentAnalytics';
import Sidebar from '@/components/Sidebar';
import TechnologySelect, { TECHNOLOGIES, Technologies } from '@/components/TechnologySelect';
import { getAllDocs, getNavfromDocs } from '@/lib/mdxUtils';
// import { SearchIcon } from '@100mslive/react-icons';
import { Box, Button, Flex, Text } from '@100mslive/react-ui';
import { useEffect, useMemo, useState } from 'react';

export default function Examples({ allNav }) {
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
        <Flex direction="column" css={{ minHeight: '100vh', overflow: "hidden" }}>
            <SegmentAnalytics options={{}} title="100ms Docs Examples" />
            <Header
                modal={modal}
                setModal={setModal}
                menuState={menuState}
                showReference={false}
                onHomePage
            />

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
                    paddingInline: menu ? 0 : '$14',
                    paddingBottom: menu ? 0 : '$24',
                    '@md': {
                        paddingInline: menu ? 0 : '$10',
                        paddingBottom: menu ? 0 : '$10'
                    }
                }}>
                <Box css={{ width: '100%' }}>
                    <Sidebar
                        menuState={menuState}
                        allNav={allNav}
                        nav={{}}
                        css={{ '@md': { position: 'initial' } }}
                        hideOnDesktop
                    />
                </Box>
                {!menu ? (
                    <>
                        <Box
                            as="img"
                            src="/docs/bg-example-transparent.png"
                            css={{
                                zIndex: 1,
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
                                    position: 'relative',
                                    flexGrow: 1,
                                    flexShrink: 0,
                                    width: '260px',
                                    maxWidth: '260px',
                                    '@md': {
                                        width: 'initial',
                                        maxWidth: 'initial'
                                    }
                                }}>
                                <Box css={{ position: 'sticky', top: '105px', zIndex: 0 }}>
                                    <TechnologySelect
                                        css={{ marginBottom: '$10', width: '100%' }}
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
                                            <li
                                                key={text}
                                                style={{ marginBottom: 0, display: 'flex' }}>
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
                                </Box>
                            </Flex>
                            <Box
                                css={{
                                    display: 'grid',
                                    minWidth: 0,
                                    maxWidth: '928px',
                                    gridTemplateColumns:
                                        filteredExamples.length === 0
                                            ? '1fr'
                                            : filteredExamples.length > 1
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
                                {filteredExamples.length > 0 ? (
                                    filteredExamples.map(
                                        ({ description, technologies, tags, title, url }) => (
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
                                                onClick={() =>
                                                    window.analytics.track('example.clicked', {
                                                        title,
                                                        exampleRepo: url,
                                                        page: window?.location?.pathname
                                                    })
                                                }
                                                css={{
                                                    boxSizing: 'border-box',
                                                    height: '198px',
                                                    minWidth:
                                                        filteredExamples.length === 1 ? '350px' : 0,
                                                    '&:hover': {
                                                        opacity: 1
                                                    }
                                                }}
                                            />
                                        )
                                    )
                                ) : (
                                    <Flex
                                        direction="column"
                                        align="center"
                                        css={{
                                            padding: '0 32px',
                                            borderRadius: '$3',
                                            border: '1px solid $borderDefault',
                                            width: '100%',
                                            height: 'max-content',
                                            textAlign: 'center'
                                        }}>
                                        <Text
                                            variant="h6"
                                            css={{
                                                fontWeight: '$semiBold',
                                                color: '$textHighEmp',
                                                marginTop: '64px',
                                                marginBottom: '8px'
                                            }}>
                                            {category !== CATEGORIES.ALL_CATEGORIES
                                                ? `Sorry, we currently do not have ${category.toLowerCase()} built
                                    with ${technology} yet`
                                                : `Sorry, we currently do not have examples built with ${technology} yet`}
                                        </Text>
                                        <Text
                                            css={{
                                                marginBottom: '48px',
                                                color: '$textMedEmp'
                                            }}>{`Discover all of the other examples we have for ${technology}`}</Text>
                                        <Button
                                            onClick={() => setCategory(CATEGORIES.ALL_CATEGORIES)}
                                            css={{
                                                marginBottom: '56px'
                                            }}>{`View All ${technology} Examples`}</Button>
                                    </Flex>
                                )}
                            </Box>
                        </Flex>
                    </>
                ) : null}
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

export const getStaticProps = async () => {
    const allDocs = getAllDocs();
    const navItems = getNavfromDocs(allDocs);

    return {
        props: {
            allNav: navItems,
            nav: {}
        }
    };
};
