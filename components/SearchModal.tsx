import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchIcon, ArrowRightIcon } from '@100mslive/react-icons';
import { Flex, Box, Text } from '@100mslive/react-ui';
import useClickOutside from '@/lib/useClickOutside';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectHits, connectSearchBox } from 'react-instantsearch-dom';
import Tag from './Tag';
import { titleCasing } from '@/lib/utils';

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
);

const searchInfoItems = [
    {
        title: 'to navigate',
        content: [
            <ArrowRightIcon height={16} width={16} style={{ transform: 'rotate(-90deg)' }} />,
            <ArrowRightIcon height={16} width={16} style={{ transform: 'rotate(90deg)' }} />
        ]
    },
    {
        title: 'to select',
        content: [
            <span
                style={{
                    fontSize: '14px',
                    height: '16px',
                    padding: '2px',
                    paddingTop: '1px'
                }}>
                &#x23CE;
            </span>
        ]
    },
    { title: 'to close', content: ['esc'] }
];

interface SearchModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Result = ({ searchResult }) => {
    const path = searchResult.link.replace(/-/g, ' ').split('/').slice(3);
    return (
        <Box
            css={{
                maxWidth: '100%',
                pl: '$lg',
                pr: '$xs'
            }}>
            <Flex justify="between" align="start" gap="2">
                <Text
                    css={{
                        color: '$textHighEmp',
                        fontWeight: '$semiBold'
                    }}>
                    {searchResult.title}
                </Text>
                <Flex align="center" gap="2">
                    <Tag text={searchResult.platformName} />
                    <Tag text={searchResult.type} />
                </Flex>
            </Flex>

            <Text
                variant="xs"
                css={{
                    color: 'var(--docs_search_result_breadcrumb)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    mt: '$1',
                    mb: '$xs'
                }}>
                {path.map((text, id) => (
                    <span style={{ whiteSpace: 'nowrap' }}>
                        {id === 0 ? '' : '\u00A0'}
                        {id === path.length - 1
                            ? titleCasing(text.split('#')[0])
                            : `${titleCasing(text)} >`}
                    </span>
                ))}
            </Text>
            <Text
                variant="sm"
                css={{
                    fontSize: '13px',
                    color: '$textMedEmp'
                }}
                dangerouslySetInnerHTML={{
                    // eslint-disable-next-line no-underscore-dangle
                    __html: `${searchResult._snippetResult?.content?.value}`
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
                        pt: '$2',
                        pr: '$2'
                    }}>
                    <Box
                        css={{
                            maxHeight: '60vh',
                            overflow: 'auto',
                            maxWidth: '100%'
                        }}>
                        {hits.map((searchResult, i: number) => (
                            <>
                                <Box
                                    id={`res-box-${i}`}
                                    key={searchResult.link}
                                    css={{
                                        '&:hover': { backgroundColor: '$surfaceLight' },
                                        maxWidth: '100%',
                                        py: '$8',
                                        borderRadius: '$0'
                                    }}
                                    onClick={() => {
                                        window.analytics.track('docs.search.result.clicked', {
                                            totalNumberOfResults: hits?.length,
                                            textInSearch: searchTerm || '',
                                            rankOfSearchResult: i + 1,
                                            locationOfSearchResult: searchResult.link,
                                            referrer: document.referrer,
                                            path: window.location.hostname,
                                            pathname: window.location.pathname
                                        });
                                        setModal(false);
                                    }}>
                                    <Link href={searchResult.link} passHref>
                                        <a style={{ color: 'inherit', textDecoration: 'none' }}>
                                            <Result searchResult={searchResult} />
                                        </a>
                                    </Link>
                                </Box>
                                <Box
                                    css={{ backgroundColor: '$borderDefault', w: '100%', h: '1px' }}
                                />
                            </>
                        ))}
                    </Box>
                    <Flex
                        gap="4"
                        css={{
                            py: '$4',
                            px: '$md',
                            boxShadow: '0 -32px 32px -8px var(--docs_search_result_shadow)',
                            borderTop: '1px solid $borderDefault'
                        }}>
                        {searchInfoItems.map((searchInfoItem) => (
                            <InfoItem
                                title={searchInfoItem.title}
                                content={searchInfoItem.content}
                            />
                        ))}
                    </Flex>
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
                // eslint-disable-next-line jsx-a11y/no-autofocus
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
                boxSizing: 'content-box',
                position: 'fixed',
                left: '0',
                top: '0',
                height: '100vh',
                width: '100vw',
                bg: 'rgba(0, 0, 0, 0.8)'
            }}>
            <div
                className="search-modal"
                style={{
                    maxWidth: '600px',
                    width: '80%',
                    position: 'absolute',
                    top: '112px',
                    left: '50%',
                    height: '3rem',
                    borderRadius: '0.5rem',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--gray1)'
                }}
                ref={ref}>
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
            </div>
        </Box>
    );
};

export default SearchModal;

const InfoItem = ({ title, content }) => (
    <Flex gap="2" align="center">
        {content.map((item) => (
            <Flex
                gap="1"
                align="center"
                justify="center"
                css={{
                    backgroundColor: '$surfaceLight',
                    borderRadius: '$1',
                    p: '$2',
                    fontWeight: '$semiBold',
                    color: '$textHighEmp',
                    fontSize: '$xs'
                }}>
                {item}
            </Flex>
        ))}
        <Text variant="xs" css={{ color: '$textMedEmp' }}>
            {title}
        </Text>
    </Flex>
);
