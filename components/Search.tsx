import useSearch from '@/lib/useSearch';
import React, { useState } from 'react';
import SearchIcon from '@/assets/icons/SearchIcon';
import EnterIcon from '@/assets/icons/EnterIcon';

const Search = ({ docs, currentDocSlug }) => {
    const [search, setSearch] = useState('');
    const res = useSearch({
        search,
        folder: currentDocSlug,
        docs
    });
    return (
        <div className="search-ctx">
            <div className="wrapper">
                <SearchIcon />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Quick search for anything"
                />
            </div>
            {res.length > 0 ? (
                <div className="res-ctx">
                    {res.map((e) => (
                        <a href={e.url} key={e.url}>
                            <div className="res-box">
                                {e.title}
                                <EnterIcon />
                            </div>
                        </a>
                    ))}
                </div>
            ) : null}

            <style jsx>{`
                .search-ctx {
                    position: relative;
                }
                .wrapper {
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid var(--accents2);
                    height: 50px;
                    width: 500px;
                }
                input {
                    margin-left: 1rem;
                    width: 100%;
                    height: 50px;
                }
                .res-ctx {
                    background-color: var(--accents1);
                    width: 100%;
                    border-bottom-right-radius: 5px;
                    border-bottom-left-radius: 5px;
                    padding: 1rem 0.5rem;
                    z-index: 1000;
                    position: absolute;
                }
                .res-box:hover {
                    opacity: 1;
                }
                .res-box {
                    margin: 0.5rem 0;
                    border-radius: 5px;
                    width: 90%;
                    padding-left: 2rem;
                    padding-right: 1rem;
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: var(--offset);
                    opacity: 0.6;
                }
                a {
                    text-decoration: none;
                    color: inherit;
                }
            `}</style>
        </div>
    );
};

export default Search;
