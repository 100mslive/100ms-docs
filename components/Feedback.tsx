import React from 'react';
import { Flex, Box, Button, Text } from '@100mslive/react-ui';
import { currentUser } from '../lib/currentUser';

const emojis = [{ score: 1 }, { score: 2 }, { score: 3 }, { score: 4 }];

const Feedback = () => {
    const [showTextBox, setShowTextBox] = React.useState(false);
    const [clickedEmoji, setClickedEmoji] = React.useState(0);
    const inputRef = React.useRef<HTMLTextAreaElement | undefined>();
    return (
        <Box css={{ maxWidth: '180px', mx: 'auto' }}>
            <Text variant="body2" css={{ fontWeight: '$medium' }}>
                How helpful was this page?
            </Text>
            <Flex css={{ gap: '30px', p: '$8 0' }}>
                {emojis.map((emoji) => (
                    <span
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
                                timeStamp: Date.now(),
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

            <div className="bottomContent">
                <textarea
                    placeholder="Please share your feedback"
                    cols={20}
                    rows={3}
                    // @ts-ignore
                    ref={inputRef}
                    style={{ background: 'none', fontSize: '13px', marginBottom: '16px' }}
                />
                <Button
                    variant="standard"
                    css={{ ml: 'auto' }}
                    onClick={() => {
                        window.analytics.track('docs.feedback.message', {
                            title: document.title,
                            message: inputRef.current?.value,
                            referrer: document.referrer,
                            path: window.location.pathname,
                            rating: clickedEmoji,
                            timeStamp: Date.now(),
                            ...currentUser()
                        });
                    }}>
                    Submit
                </Button>
            </div>

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
                    transform: scale(1.1);
                }

                .bottomContent {
                    display: flex;
                    flex-direction: column;
                    transform: scaleY(${showTextBox ? '1' : '0'});
                    visibility: ${showTextBox ? 'visible' : 'collapse'};
                    transition: transform 200ms ease;
                    margin-bottom: 16px;
                }
            `}</style>
        </Box>
    );
};

export default Feedback;
