import React from 'react';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';
import Note from './Note';

const sampleCode = `
  <>
  <Note type="success">
    <p>
    <b>Don't have the time to write your own token generation service?</b>
    </p>
    <p>
    We have put together a quickstart app server guide that will setup & deploy your token generation service in a few minutes
    </p>
  </Note>
  </>
`;

const CodeEditor = () => (
    <div className="editor">
        <LiveProvider scope={{ Note }} code={sampleCode}>
            <div className="live-editor">
                <div className="badge">Live Editor</div>
                <LiveEditor />
            </div>
            <div className="live-preview">
                <div className="badge">Preview</div>
                <LiveError />
                <LivePreview />
            </div>
        </LiveProvider>
        <style jsx>{`
            .editor {
                border-radius: 5px;
                border: 1px solid var(--accents2);
            }
            .live-editor {
                padding-top: 2rem;
                position: relative;
            }
            .live-preview {
                position: relative;
                padding: 2rem 1.5rem;
                min-height: 200px;
                border-top: 1px solid var(--accents2);
            }
            .badge {
                opacity: 0.8;
                top: 0;
                left: 0;
                position: absolute;
                border-right: 1px solid var(--accents2);
                border-bottom: 1px solid var(--accents2);
                padding: 5px;
            }
        `}</style>
    </div>
);

export default CodeEditor;
