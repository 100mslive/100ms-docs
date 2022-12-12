import React from 'react';
import { Flex, Box, Button, Text } from '@100mslive/react-ui';
import useClickOutside from '@/lib/useClickOutside';
import { currentUser } from '../lib/currentUser';

const emojis = [{ score: 1 }, { score: 2 }, { score: 3 }, { score: 4 }];

const Feedback = () => {
    const [showTextBox, setShowTextBox] = React.useState(false);
    const [clickedEmoji, setClickedEmoji] = React.useState(0);
    const [submitSuccessful, setSubmitSuccessful] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const feedBackRef = React.useRef<HTMLDivElement | null>();
    const inputRef = React.useRef<HTMLTextAreaElement | undefined>();

    React.useEffect(() => {}, []);

    // @ts-ignore
    useClickOutside(feedBackRef, () => setShowTextBox(false));

    return (
        // @ts-ignore
        <Box ref={feedBackRef} css={{ maxWidth: '200px', ml: '$8', mt: '$18' }}>
            <Text css={{ fontWeight: '$medium', color: '$textHighEmp', fontSize: '13px' }}>
                How helpful was this page?
            </Text>
            <Flex css={{ gap: '30px', p: '$9 0' }}>
                {emojis.map((emoji) => (
                    <span
                        title="Share your feedback!"
                        style={{ position: 'relative', width: '27px', height: '27px' }}
                        key={emoji.score}
                        onClick={() => {
                            setShowTextBox(true);
                            setClickedEmoji(emoji.score);
                            inputRef.current?.focus();
                            window.analytics.track('docs.feedback.rating', {
                                title: document.title,
                                referrer: document.referrer,
                                path: window.location.pathname,
                                rating: clickedEmoji,
                                timeStamp: new Date().toLocaleString(),
                                ...currentUser()
                            });
                        }}>
                        <img
                            className="emoji"
                            data-active={emoji.score === clickedEmoji}
                            src={`/emoji-${emoji.score}.png`}
                            style={{ position: 'absolute', top: '0', left: '0' }}
                            alt={`${emoji.score}`}
                        />
                    </span>
                ))}
            </Flex>
            {submitSuccessful ? (
                <Text css={{ color: '$textAccentHigh', fontWeight: '$semiBold', fontSize: '13px' }}>
                    Feedback successfully submitted. Thank you!
                </Text>
            ) : (
                <div className="bottomContent">
                    <textarea
                        maxLength={140}
                        placeholder="Please share your feedback"
                        cols={20}
                        rows={3}
                        // @ts-ignore
                        ref={inputRef}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        style={{
                            background: 'none',
                            fontSize: '13px',
                            marginBottom: '18px',
                            borderRadius: '4px'
                        }}
                    />
                    <Button
                        variant="primary"
                        css={{ ml: 'auto', fontSize: '$sm', padding: '$3 $6' }}
                        disabled={!message}
                        onClick={() => {
                            window.analytics.track('docs.feedback.message', {
                                title: document.title,
                                message,
                                referrer: document.referrer,
                                path: window.location.pathname,
                                rating: clickedEmoji,
                                timeStamp: new Date().toLocaleString(),
                                ...currentUser()
                            });
                            setSubmitSuccessful(true);
                        }}>
                        Submit
                    </Button>
                </div>
            )}

            <style jsx>{`
                .emoji {
                    filter: grayscale(100%);
                    transition: 200ms ease-in-out;
                }

                .emoji:hover {
                    filter: none;
                    cursor: pointer;
                    transform: scale(1.1);
                }

                img.emoji[data-active='true'] {
                    filter: none;
                    transform: scale(1.2);
                }

                .bottomContent {
                    display: flex;
                    flex-direction: column;
                    transform: scaleY(${showTextBox ? '1' : '0'});
                    visibility: ${showTextBox ? 'visible' : 'collapse'};
                    transition: transform 200ms ease;
                    margin-bottom: 16px;
                }

                textarea {
                    resize: none;
                }
            `}</style>
        </Box>
    );
};

export default Feedback;
