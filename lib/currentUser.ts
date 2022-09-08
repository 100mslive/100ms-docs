import ee from 'event-emitter';
import cookies from 'js-cookie';

const createCookieKey = () =>
    `authUser${
        process.env.NEXT_PUBLIC_APP_ENV === 'prod' ? '' : `-${process.env.NEXT_PUBLIC_APP_ENV}`
    }`;

export const userEvents = ee({});

export const currentUser = () => {
    let authUser;
    try {
        const cookieKey = createCookieKey();
        authUser = JSON.parse(cookies.get(cookieKey);
    } catch {
        authUser = null;
    }
    return authUser;
};
