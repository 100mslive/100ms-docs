import Link from 'next/link';
import { Box, Text, Button } from '@100mslive/react-ui';
import { Url } from 'url';

interface BadgeProps {
    title: String;
    id: String;
    link: String;
    icon: React.SVGProps<SVGSVGElement>;
}

const Badge: React.FC<BadgeProps> = ({ icon, title, link }) => (
    <Box>
        <Link href={link as unknown as Url} passHref>
            <a>
                <Button
                    icon
                    variant="standard"
                    css={{
                        borderRadius: '8px',
                        cursor: 'pointer',
                        py: '$2',
                        pl: '$4',
                        pr: '$5',
                        backgroundColor: '$secondaryDark',
                        borderColor: 'transparent',
                        color: "$textHighEmp",
                    }}>
                    {icon}
                    <Text variant={'sub1'} css={{ color: '$textHighEmp', fontWeight: '$semiBold' }}>{title}</Text>
                </Button>
            </a>
        </Link>
        <style jsx>
            {`
                a:hover {
                    opacity: 1;
                }
            `}
        </style>
    </Box>
);
export default Badge;
