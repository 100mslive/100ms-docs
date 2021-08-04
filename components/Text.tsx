import React from 'react';

const Text = ({ id, children, toc }) => (
    <>
        <div id={`text-${id}`} className="text-guide guide-page" data-toc={toc}>
            {children}
            <style jsx>{`
                .text-guide {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                @media (min-width: 1024px) {
                    .text-guide {
                        height: 100vh;
                    }
                }
            `}</style>
        </div>
    </>
);

export default Text;
