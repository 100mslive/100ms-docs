import React, { useRef, useState } from 'react';
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
                    __html: `${searchResult['_snippetResult']?.content?.value}...`
                }}
            />
        </Box>
    );
};

const ResultBox = ({ hits, setModal, searchTerm, setHitsCount, activeResult }) => {
    setHitsCount(hits.length);
    activeResult.current = -1;
    return (
        <Box>
            {hits.length && searchTerm ? (
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
                                onClick={() => setModal(false)}>
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
        </Box>
    );
};

const Search = ({ currentRefinement, refine, setSearchTerm }) => (
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
            value={currentRefinement}
            onChange={(event) => {
                refine(event.target.value);
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

const CustomSearchBox = connectSearchBox(Search);
const CustomHits = connectHits(ResultBox);

const SearchModal: React.FC<SearchModalProps> = ({ setModal }) => {
    const ref = React.createRef<HTMLDivElement>();
    const [searchTerm, setSearchTerm] = React.useState('');
    const activeResult = useRef(-1);
    const [hitsCount, setHitsCount] = useState(0);

    React.useEffect(() => {
        const handleNavigation = (e) => {
            // Up
            if (e.keyCode === 38) {
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
            } else if (e.keyCode === 40) {
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
    }, [hitsCount]);

    useClickOutside(ref, () => {
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
                    <CustomSearchBox setSearchTerm={setSearchTerm} />
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
