import { Box } from '@100mslive/react-ui';

export default function StepsContainer({ children, id }) {
    return (
        <Box
            id={id}
            css={{
                marginLeft: '1rem',
                paddingLeft: '1.5rem',
                counterReset: 'step',
                borderLeft: '1px solid',
                borderColor: 'var(--docs_border_strong)',
                marginBottom: '3rem',
                '& h3': { counterIncrement: 'step' },
                '& h3:before': {
                    content: 'counter(step)',
                    display: 'inline-flex',
                    position: 'absolute',
                    marginTop: '-5px',
                    marginLeft: '-41px',
                    width: '33px',
                    height: '33px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'var(--docs_text_secondary)',
                    borderRadius: '100%',
                    border: '4px solid var(--docs_bg_content)',
                    background: 'var(--docs_bg_code_highlight)',
                    lineHeight: '1.5rem',
                    fontSize: '1rem',
                    fontWeight: 400
                }
            }}>
            {children}
        </Box>
    );
}
