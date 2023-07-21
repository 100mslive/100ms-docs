interface Props {
    children: JSX.Element;
}

export default function FallbackLayout({ children }: Props) {
    return <>{children}</>;
}
