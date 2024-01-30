import React from 'react';
import { Box, Text } from '@100mslive/react-ui';
import { ExternalLinkIcon } from '@100mslive/react-icons';
interface Props {
    suggestedBlogs: Array<{
        title: string;
        content: string;
        date: string;
        url: string;
    }>;
}

const suggestedBlogsDefault = [
    {
        title: 'Meet all new 100ms RoomKit SDK on iOS',
        content: 'Exhaustive guide on 100ms Prebuilt setup using SwiftUI',
        date: 'January 21, 2022 • 4 min read',
        url: 'www.abc.com'
    },
    {
        title: 'Embedding Prebuilt as a native component',
        content:
            'Embed and ship faster with HMSPrebuilt component. And some more exciting updates coming your way in the form of Prebuilt upgrades.',
        date: 'January 21, 2022 • 4 min read',
        url: 'www.abc.com'
    },
    {
        title: 'Engage Your Audience with Interactive Polls and Quizzes - A Step-by-Step Guide',
        content: 'Exhaustive guide on 100ms Prebuilt setup using SwiftUI',
        date: 'January 21, 2022 • 4 min read',
        url: 'www.abc.com'
    }
];

const SuggestedBlogs: React.FC<Props> = ({ suggestedBlogs = suggestedBlogsDefault }) => {
    return (
        <>
            <h2 style={{ marginBottom: '16px', marginTop: '0px' }}>Suggested Reads</h2>
            <Box
                css={{
                    width: '100%',
                    display: 'grid',
                    gridGap: '$8',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    '@xl': {
                        gridTemplateColumns: '1fr 1fr'
                    },
                    '@lg': {
                        gridTemplateColumns: '1fr'
                    }
                }}>
                {suggestedBlogs?.map((blog, index, array) => {
                    return (
                        <Box
                            css={{
                                position: 'relative',
                                background:
                                    'linear-gradient(280deg, rgba(18, 22, 27, 0.80) 37.76%, rgba(22, 27, 34, 0.80) 91.22%)',
                                flexGrow: 1,
                                borderRadius: '16px',
                                padding: '12px 24px 16px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                width: '100%',
                                '@xl': {
                                    gridColumn: index === array.length - 1 ? '1 / -1' : ''
                                },
                                '@md': {
                                    maxWidth: 'unset',
                                    height: 'unset'
                                },
                                '&:hover': {
                                    background: 'var(--docs_bg_home_page_card_hover)'
                                }
                            }}
                            onClick={() => {
                                window.analytics.track('docs.blog.redirect', {
                                    type: 'blog_redirect',
                                    blog_title: blog.title,
                                    path: window.location.pathname,
                                    timeStamp: new Date().toLocaleString(),
                                    blog_url: blog.url
                                });
                                window.open(blog.url, '_blank');
                            }}>
                            <Box
                                css={{
                                    width: '$7',
                                    position: 'absolute',
                                    top: '12px',
                                    right: '16px'
                                }}>
                                <ExternalLinkIcon style={{ width: '100%' }} />
                            </Box>
                            <Box css={{ maxWidth: '80%', marginBottom: '$6' }}>
                                <Text
                                    variant={'h6'}
                                    style={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        boxOrient: 'vertical',
                                        WebkitLineClamp: '3',
                                        lineClamp: '3',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                    css={{ color: '$textPrimary' }}>
                                    {blog.title}
                                </Text>
                                <Text
                                    variant={'sm'}
                                    style={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        boxOrient: 'vertical',
                                        WebkitLineClamp: '2',
                                        lineClamp: '2',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                    css={{
                                        color: '$secondaryLight'
                                    }}>
                                    {blog.content}
                                </Text>
                            </Box>
                            <Box>
                                <Box css={{ height: '1px', background: '$secondaryGray' }}></Box>
                                <Text
                                    variant={'tiny'}
                                    css={{ color: '$secondaryLight', maxWidth: '80%' }}>
                                    {blog.date}
                                </Text>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </>
    );
};

export default SuggestedBlogs;
