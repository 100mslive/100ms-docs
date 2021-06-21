import React from 'react';

interface Props {}

const SearchModal: React.FC<Props> = () => {
    const temp = ``;
    return (
        <div className="search-modal">
            Search Modal Here AHAHA
            <style jsx>{`
                .search-modal {
                    max-width: 600px;
                    height: 400px;
                    width: 100%;
                    position: absolute;
                    top: 20%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    border-radius: 5px;
                    border: 1px solid var(--accents2);
                    background-color: var(--background);
                    z-index: 10;
                }
            `}</style>
        </div>
    );
};

export default SearchModal;
