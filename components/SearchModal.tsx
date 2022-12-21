import React from 'react';
import { ChevronRightIcon } from '@100mslive/react-icons';
import { Box, Text } from '@100mslive/react-ui';
import useClickOutside from '@/lib/useClickOutside';
import Link from 'next/link';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
);

interface SearchModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Result = ({ searchResult }) => {
    const path = searchResult.link.replace(/-/g, ' ').split('/').slice(1);
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
        </Box>
    );
};

const ResultBox = ({ hits, setModal }) => (
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
            {hits.slice(0, 10).map((searchResult, i) => (
                <Box
                    key={searchResult.link}
                    css={{
                        borderColor: '$borderDefault',
                        '&:hover': { backgroundColor: '$surfaceLight' },
                        px: '$8',
                        py: '$8'
                    }}>
                    <Link href={searchResult.link} passHref>
                        <a id={`res-box-${i}`} className="res-box" onClick={() => setModal(false)}>
                            <Result searchResult={searchResult} />
                        </a>
                    </Link>
                </Box>
            ))}
        </Box>
    </Box>
);

const CustomHits = connectHits(ResultBox);

const SearchModal: React.FC<SearchModalProps> = ({ setModal }) => {
    const ref = React.createRef<HTMLDivElement>();

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
                    <SearchBox
                        translations={{ placeholder: 'Search through docs' }}
                        showLoadingIndicator
                    />

                    <CustomHits setModal={setModal} />
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
                    .res-box {
                        padding: 0.5rem 2rem;
                        min-height: 70px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px solid;
                        border-color: inherit;
                    }
                    .res-box div {
                        display: flex;
                        flex-direction: column;
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
