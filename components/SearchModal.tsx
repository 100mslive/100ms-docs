import React from 'react';
import SearchIcon from '@/assets/icons/SearchIcon';
import useSearch from '@/lib/useSearch';
import EnterIcon from '@/assets/icons/EnterIcon';

interface Props {
    docs: { url: string; title: string; description: string; nav: number; content: string }[];
    currentDocSlug: string;
}

const SearchModal: React.FC<Props> = ({ docs, currentDocSlug }) => {
    const [search, setSearch] = React.useState('');
    const inputRef = React.useRef();
    React.useEffect(() => {
        // @ts-ignore
        inputRef.current?.focus();
    }, []);
    const res = useSearch({
        search,
        folder: currentDocSlug,
        docs
    });
    return (
        <div className="search-modal">
            <div className="input-wrapper">
                <SearchIcon />
                <input
                    // @ts-ignore
                    ref={inputRef}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search docs"
                />
            </div>
            {res.length > 0 ? (
                <div className="res-ctx">
                    {res.map((e) => (
                        <a href={e.url} key={e.url}>
                            <div className="res-box">
                                <span>{e.title}</span>
                                <EnterIcon />
                            </div>
                        </a>
                    ))}
                </div>
            ) : null}
            <style jsx>{`
                .search-modal {
                    max-width: 600px;
                    width: 100%;
                    position: absolute;
                    top: 20%;
                    left: 50%;
                    transform: translate(-50%, 0%);
                    border-radius: 5px;
                    border: 1px solid var(--accents2);
                    background-color: var(--background);
                    z-index: 10;
                }
                .input-wrapper {
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid var(--accents2);
                }
                input {
                    margin-left: 1rem;
                }
                .res-ctx {
                    width: 100%;
                }
                .res-box:hover {
                    opacity: 1;
                }
                .res-box {
                    margin: 0.5rem 0;
                    padding: 0 2rem;
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    opacity: 0.6;
                }
                .res-box span {
                    margin-right: 1rem;
                }
                a {
                    color: inherit;
                    text-decoration: none;
                }
                a:hover {
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};

export default SearchModal;
