import cookies from 'js-cookie';

const createCookieKey = () =>
    `authUser${
        process.env.NEXT_PUBLIC_APP_ENV === 'prod' ? '' : `-${process.env.NEXT_PUBLIC_APP_ENV}`
    }`;

export const currentUser = () => {
    let authUser;
    try {
        const cookieKey = createCookieKey();
        // @ts-ignore
        authUser = JSON.parse(cookies.get(cookieKey));
    } catch {
        authUser = null;
    }
    return authUser;
};
