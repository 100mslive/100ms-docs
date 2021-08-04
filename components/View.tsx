import React from 'react';

const View = ({ id, code, img, children, preview }) => (
    <>
        {/* Desktop */}
        <div id={`view-${id}`} className="ctx guide-code-block" style={{ display: 'none' }}>
            {img ? <img width={550} src={img} alt="Code Block" /> : null}
            {code ? <>{children}</> : null}
            {preview ? <TabsComp preview={preview}>{children}</TabsComp> : null}
        </div>
        {/* Mobile */}
        <div className="mob">
            {img ? <img width={600} src={img} alt="Code Block" /> : null}
            {code ? <>{children}</> : null}
        </div>
        <style jsx>{`
            .ctx {
                width: 50%;
                height: 90vh;
                position: fixed;
                top: 2rem;
                right: 20rem;
                display: none;
                padding-left: 2.5rem;
                flex-direction: column;
                justify-content: center;
            }
            .mob {
                display: block;
            }
            .guide-code-block {
                max-width: 500px !important;
            }

            @media (min-width: 1024px) {
                .ctx {
                    display: flex;
                }
                .mob {
                    display: none;
                }
            }
            ::-webkit-scrollbar {
                width: 0px;
            }
            ::-webkit-scrollbar {
                height: 0px;
            }
            ::-webkit-scrollbar-thumb {
                outline: 0px;
            }
        `}</style>
    </>
);

export default View;

const TabsComp = ({ preview, children }) => {
    const [tab, setTab] = React.useState(false);
    return (
        <div>
            <button
                type="button"
                className={`px-2 py-1 round  ${!tab ? 'border border-gray-400' : ''}`}
                onClick={() => setTab(false)}>
                Code
            </button>
            <button
                type="button"
                className={`px-2 py-1 round  ${tab ? 'border border-gray-400' : ''}`}
                onClick={() => setTab(true)}>
                Preview
            </button>
            {!tab ? children : <img width={600} src={preview} alt="Code Block" />}
        </div>
    );
};
