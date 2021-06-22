import React from 'react';
import SearchIcon from '@/assets/icons/SearchIcon';
import useSearch from '@/lib/useSearch';
import EnterIcon from '@/assets/icons/EnterIcon';
import useClickOutside from '@/lib/useClickOutside';
import FocusTrap from 'focus-trap-react';

interface Props {
    docs: { url: string; title: string; description: string; nav: number; content: string }[];
    currentDocSlug: string;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal: React.FC<Props> = ({ docs, currentDocSlug, setModal }) => {
    const [search, setSearch] = React.useState('');
    const ref = React.useRef();
    const inputRef = React.useRef();
    // @ts-ignore
    useClickOutside(ref, () => setModal(false));
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
        // @ts-ignore
        <div className="search-modal" ref={ref}>
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
                <span className="esc">esc</span>
            </div>
            <FocusTrap>
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
            </FocusTrap>
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
                .esc {
                    color: var(--accents5);
                    border-radius: 5px;
                    padding: 0 8px;
                    border: 1px solid var(--accents3);
                }
                input {
                    width: 100%;
                    margin-left: 1rem;
                }
                .res-ctx {
                    width: 100%;
                }
                .res-box:hover {
                    opacity: 0.8;
                }
                .res-box {
                    margin: 0.5rem 0;
                    padding: 0 2rem;
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    opacity: 0.4;
                    background-color: var(--offset);
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
