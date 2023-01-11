import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronRightIcon, SearchIcon } from '@100mslive/react-icons';
import { Flex, Box, Text } from '@100mslive/react-ui';
import useClickOutside from '@/lib/useClickOutside';
import Link from 'next/link';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectHits, connectSearchBox } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
);

interface SearchModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Result = ({ searchResult }) => {
    const path = searchResult.link.replace(/-/g, ' ').split('/').slice(1);
    path[0] = searchResult.platformName;

    return (
        <Box css={{ w: '100%' }}>
            <Text
                css={{
                    color: '$textHighEmp',
                    fontWeight: '$semiBold'
                }}>
                {searchResult.title}
                <Text
                    css={{
                        display: 'inline',
                        color: 'inherit',
                        fontWeight: 'inherit',
                        backgroundColor: '$surfaceLighter',
                        p: '$1 $2',
                        whiteSpace: 'nowrap',
                        borderRadius: '0.25rem',
                        marginLeft: '0.5rem'
                    }}>
                    {searchResult.platformName}
                </Text>
            </Text>
            <Text
                variant="sm"
                css={{
                    color: '$textDisabled',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    mt: '0.5rem'
                }}>
                {path.map((text, id) =>
                    id === path.length - 1 ? (
                        text
                    ) : (
                        <>
                            <span style={{ whiteSpace: 'nowrap' }}>{text}</span>
                            <ChevronRightIcon style={{ width: '10px', height: '14px' }} />
                        </>
                    )
                )}
            </Text>
            <Text
                dangerouslySetInnerHTML={{
                    __html: `${searchResult['_snippetResult']?.content?.value}`
                }}
            />
        </Box>
    );
};

const ResultBox = ({ hits, setModal, searchTerm, setHitsCount, activeResult }) => {
    setHitsCount(hits?.length || 0);
    activeResult.current = -1;
    return (
        <Box>
            {hits?.length && searchTerm ? (
                <Box
                    css={{
                        position: 'relative',
                        top: '$8',
                        backgroundColor: '$surfaceDefault',
                        border: '1px solid',
                        borderColor: '$borderDefault',
                        borderRadius: '$1',
                        px: '$4',
                        py: '$3'
                    }}>
                    <Box
                        css={{
                            maxHeight: '60vh',
                            overflow: 'auto'
                        }}>
                        {hits.map((searchResult, i) => (
                            <Box
                                id={`res-box-${i}`}
                                key={searchResult.link}
                                css={{
                                    borderColor: '$borderDefault',
                                    '&:hover': { backgroundColor: '$surfaceLight' },
                                    px: '$8',
                                    py: '$8',
                                    borderRadius: '$0'
                                }}
                                onClick={() => {
                                    window.analytics.track('docs.search.result.clicked', {
                                        totalNumberOfResults: hits?.length,
                                        textInSearch: searchTerm || '',
                                        rankOfSearchResult: i + 1,
                                        locationOfSearchResult: searchResult.url,
                                        referrer: document.referrer,
                                        path: window.location.hostname,
                                        pathname: window.location.pathname
                                    });
                                    setModal(false);
                                }}>
                                <Link href={searchResult.link} passHref>
                                    <a>
                                        <Result searchResult={searchResult} />
                                    </a>
                                </Link>
                            </Box>
                        ))}
                    </Box>
                </Box>
            ) : null}
            {hits?.length === 0 && searchTerm ? (
                <Flex
                    justify="center"
                    align="center"
                    direction="column"
                    css={{
                        position: 'relative',
                        top: '$8',
                        py: '$12',
                        backgroundColor: '$surfaceDefault',
                        border: '1px solid',
                        borderColor: '$borderDefault',
                        borderRadius: '$1',
                        px: '$4'
                    }}>
                    <Image alt="No results" src="/docs/frown.svg" height={48} width={48} />
                    <Text
                        css={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '$textDisabled',
                            fontWeight: '$medium',
                            mt: '$8'
                        }}>
                        <span>Couldn't find anything for</span>
                        <Text
                            css={{
                                fontWeight: 'bold',
                                color: '$textHighEmp',
                                wordWrap: 'break-word'
                            }}>
                            &nbsp;"{searchTerm.slice(0, 25)} {searchTerm.length > 25 ? '...' : ''}"
                        </Text>
                    </Text>
                </Flex>
            ) : null}
        </Box>
    );
};

const Search = ({ refine, setSearchTerm, searchTerm }) => {
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
                padding: '12px 16px',
                border: '2.5px solid $primaryDefault',
                borderRadius: '0.5rem',
                margin: '0 auto',
                height: '20px'
            }}
            onClick={(e) => e.stopPropagation()}>
            <SearchIcon style={{ color: 'inherit', height: '30px', width: '30px' }} />
            <input
                placeholder="Search 100ms documentation"
                value={searchTerm}
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
                type="text"
                autoFocus
                style={{
                    marginLeft: '13px',
                    backgroundColor: 'inherit',
                    outline: 'none',
                    border: 'none',
                    height: '24px',
                    width: '100%',
                    fontWeight: '500',
                    fontSize: '15px'
                }}
            />
            <Flex align="center" gap="2">
                <Flex
                    align="center"
                    css={{
                        fontWeight: '$semiBold',
                        fontSize: '$sm',
                        backgroundColor: '$surfaceLight',
                        color: '$textMedEmp',
                        borderRadius: '4px',
                        padding: '0 4px'
                    }}>
                    esc
                </Flex>
                <Text variant="xs" css={{ whiteSpace: 'nowrap', color: '$textMedEmp' }}>
                    to close
                </Text>
            </Flex>
        </Flex>
    );
};

const CustomSearchBox = connectSearchBox(Search);
const CustomHits = connectHits(ResultBox);

const SearchModal: React.FC<SearchModalProps> = ({ setModal }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = React.useState('');
    const activeResult = useRef(-1);
    const [hitsCount, setHitsCount] = useState(0);

    React.useEffect(() => {
        const handleNavigation = (e) => {
            if (e.code === 'Enter' && activeResult.current !== -1) {
                const ele = document.getElementById(`res-box-${activeResult.current}`)
                    ?.children[0] as HTMLAnchorElement;
                if (ele) ele.click();
            }

            if (e.code === 'ArrowUp') {
                if (activeResult.current === 0) {
                    activeResult.current = hitsCount - 1;
                    const top = document.getElementById(`res-box-0`);
                    if (top) top.style.backgroundColor = 'var(--surface_default)';
                } else activeResult.current -= 1;

                const ele = document.getElementById(`res-box-${activeResult.current}`);
                ele?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                if (ele) {
                    ele.style.backgroundColor = 'var(--surface_light)';
                    ele.focus();
                }
                const prev = document.getElementById(`res-box-${activeResult.current + 1}`);
                if (prev) prev.style.backgroundColor = 'var(--surface_default)';
            } else if (e.code === 'ArrowDown') {
                if (activeResult.current >= hitsCount - 1) {
                    activeResult.current = 0;
                    const last = document.getElementById(`res-box-${hitsCount - 1}`);
                    if (last) last.style.backgroundColor = 'var(--surface_default)';
                } else activeResult.current += 1;

                const ele = document.getElementById(`res-box-${activeResult.current}`);
                ele?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                if (ele) {
                    ele.style.backgroundColor = 'var(--surface_light)';
                    ele.focus();
                }
                const prev = document.getElementById(`res-box-${activeResult.current - 1}`);
                if (prev) prev.style.backgroundColor = 'var(--surface_default)';
            }
        };
        if (window) window.addEventListener('keydown', handleNavigation);
        return () => window.removeEventListener('keydown', handleNavigation);
    }, [hitsCount, searchTerm]);

    useClickOutside(ref, () => {
        window.analytics.track('docs.search.dismissed', {
            textInSearch: searchTerm || '',
            totalNumberOfResults: hitsCount,
            referrer: document.referrer,
            path: window.location.hostname,
            pathname: window.location.pathname,
            href: window.location.href
        });
        setModal(false);
    });

    return (
        <Box
            css={{
                position: 'fixed',
                left: '0',
                top: '0',
                height: '100vh',
                width: '100vw',
                bg: 'rgba(0, 0, 0, 0.8)'
            }}>
            <div className="search-modal" ref={ref}>
                <InstantSearch
                    searchClient={searchClient}
                    indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX}>
                    <CustomSearchBox setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
                    <CustomHits
                        setModal={setModal}
                        searchTerm={searchTerm}
                        setHitsCount={setHitsCount}
                        activeResult={activeResult}
                    />
                </InstantSearch>

                <style jsx>{`
                    .search-modal {
                        max-width: 600px;
                        width: 100%;
                        position: absolute;
                        top: 112px;
                        left: 50%;
                        height: 48px;
                        border-radius: 8px;
                        transform: translateX(-50%);
                        background-color: var(--gray1);
                    }
                    a {
                        color: inherit;
                        text-decoration: none;
                    }
                    @media screen and (max-width: 600px) {
                        .search-modal {
                            width: 90%;
                            top: 24px;
                        }
                    }
                `}</style>
            </div>
        </Box>
    );
};

export default SearchModal;
