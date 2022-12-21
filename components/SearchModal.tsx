import React from 'react';
import { ChevronRightIcon } from '@100mslive/react-icons';
import { Box, Text } from '@100mslive/react-ui';
import useClickOutside from '@/lib/useClickOutside';
import Link from 'next/link';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const NEXT_PUBLIC_ALGOLIA_APP_ID = '5UAX3T19GE';
const NEXT_PUBLIC_ALGOLIA_INDEX = 'test';
const NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY = '6b2fcf18157b00a2c7f33452512da0ba';

const searchClient = algoliasearch(NEXT_PUBLIC_ALGOLIA_APP_ID, NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY);

interface SearchModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ResultBoxProps {
    title: string;
    url: string;
}

const ResultBox: React.FC<ResultBoxProps> = ({ title, url }) => {
    const path = url.replace(/-/g, ' ').split('/').slice(1);

    const platform = {
        javascript: 'JavaScript',
        flutter: 'Flutter',
        android: 'Android',
        'react native': 'React Native',
        ios: 'iOS',
        'server side': 'Server-side',
        'api reference': 'API Reference'
    };

    path[0] = platform[path[0]];

    return (
        <Box css={{ w: '100%' }}>
            <Text
                css={{
                    color: '$textHighEmp',
                    fontWeight: '$semiBold'
                }}>
                {title}
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
                    {path[0]}
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
                <InstantSearch searchClient={searchClient} indexName={NEXT_PUBLIC_ALGOLIA_INDEX}>
                    <SearchBox
                        translations={{ placeholder: 'Search through docs' }}
                        showLoadingIndicator
                    />
                    <Hits />
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
