import React from 'react';
import { SearchIcon, ChevronRightIcon } from '@100mslive/react-icons';
import { Flex, Box, Text } from '@100mslive/react-ui';
import useClickOutside from '@/lib/useClickOutside';
import useKeyPress from '@/lib/useKeyPress';
import useSearch from '@/lib/useSearch';
import Link from 'next/link';

interface SearchModalProps {
    docs: { url: string; title: string; description: string; nav: number; content: string }[];
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

const SearchModal: React.FC<SearchModalProps> = ({ docs, setModal }) => {
    const paletteTrack = React.useRef(-1);
    const [search, setSearch] = React.useState('');
    const ref = React.createRef<HTMLDivElement>();
    const inputRef = React.createRef<HTMLInputElement>();

    const res = useSearch({
        search,
        docs
    });

    useClickOutside(ref, () => {
        if (inputRef.current)
            window.analytics.track('docs.search.dismissed', {
                textInSearch: inputRef.current?.value || '',
                totalNumberOfResults: res.length,
                referrer: document.referrer,
                path: window.location.hostname,
                pathname: window.location.pathname,
                href: window.location.href
            });
        setModal(false);
    });

    // reset if result is 0
    if (res.length === 0) {
        paletteTrack.current = -1;
    }

    const downKeyPressed = useKeyPress('ArrowDown');
    const upKeyPressed = useKeyPress('ArrowUp');
    if (downKeyPressed) {
        // reset to top
        if (paletteTrack.current >= res.length - 1) {
            paletteTrack.current = 0;
            const last = document.getElementById(`res-box-${res.length - 1}`);
            if (last) last.style.backgroundColor = 'var(--surface_default)';
        } else paletteTrack.current += 1;

        const ele = document.getElementById(`res-box-${paletteTrack.current}`);
        if (ele) {
            ele.style.backgroundColor = 'var(--surface_light)';
            ele.focus();
        }
        const prev = document.getElementById(`res-box-${paletteTrack.current - 1}`);
        if (prev) prev.style.backgroundColor = 'var(--surface_default)';
    }
    if (upKeyPressed) {
        // on top
        if (paletteTrack.current === 0) {
            paletteTrack.current = res.length - 1;
            const top = document.getElementById(`res-box-0`);
            if (top) top.style.backgroundColor = 'var(--surface_default)';
        } else paletteTrack.current -= 1;

        const ele = document.getElementById(`res-box-${paletteTrack.current}`);
        if (ele) {
            ele.style.backgroundColor = 'var(--surface_light)';
            ele.focus();
        }
        const prev = document.getElementById(`res-box-${paletteTrack.current + 1}`);
        if (prev) prev.style.backgroundColor = 'var(--surface_default)';
    }
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
                        ref={inputRef}
                        value={search}
                        type="text"
                        autoFocus
                        onChange={(e) => setSearch(e.target.value)}
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
                {res.length > 0 ? (
                    <Box
                        css={{
                            position: 'relative',
                            top: '$8',
                            backgroundColor: '$surfaceDefault',
                            border: '1px solid',
                            borderColor: '$borderDefault',
                            borderRadius: '$1',
                            px: '$2',
                            py: '$3 '
                        }}>
                        <Box
                            css={{
                                maxHeight: '60vh',
                                overflow: 'auto'
                            }}>
                            {res.map((searchResult, i) => (
                                <Box
                                    key={searchResult.url}
                                    css={{
                                        borderColor: '$borderDefault',
                                        '&:hover': { backgroundColor: '$surfaceLight' }
                                    }}>
                                    <Link href={searchResult.url} passHref>
                                        <a
                                            id={`res-box-${i}`}
                                            className="res-box"
                                            onClick={() => {
                                                window.analytics.track(
                                                    'docs.search.result.clicked',
                                                    {
                                                        totalNumberOfResults: res.length,
                                                        textInSearch:
                                                            inputRef?.current?.value || '',
                                                        rankOfSearchResult: i + 1,
                                                        locationOfSearchResult: searchResult.url,
                                                        referrer: document.referrer,
                                                        path: window.location.hostname,
                                                        pathname: window.location.pathname
                                                    }
                                                );
                                                setModal(false);
                                            }}>
                                            <ResultBox
                                                title={searchResult.title}
                                                url={searchResult.url}
                                            />
                                        </a>
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ) : null}
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
