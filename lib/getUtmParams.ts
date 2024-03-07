interface UtmParams {
    [key: string]: string;
}

declare global {
    interface Window {
        utm_params?: UtmParams;
    }
}

const utm_keys: string[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

const parseQueryString = (queryString: string): UtmParams => {
    const params: UtmParams = {};
    if (queryString) {
        queryString
            .substring(1)
            .split('&')
            .forEach((pair) => {
                const [key, value] = pair.split('=');
                params[key] = decodeURIComponent(value);
            });
    }
    return params;
};

const pickParams = (params: UtmParams): UtmParams => {
    const result: UtmParams = {};
    utm_keys.forEach((key) => {
        if (params[key] !== undefined) {
            result[key] = params[key];
        }
    });
    return result;
};

const isEmpty = (obj: UtmParams): boolean => {
    return Object.keys(obj).length === 0;
};

export const getUtmParams = (): UtmParams => {
    if (typeof window === 'undefined') {
        return {};
    }

    const searchParams = parseQueryString(window.location.search);
    window.utm_params = pickParams(searchParams);

    const hashParams = parseQueryString(window.location.hash);
    if (isEmpty(window.utm_params) && hashParams.id_token) {
        // redirected from google oauth
        const stateParams = JSON.parse(decodeURIComponent(hashParams.state));
        window.utm_params = pickParams(stateParams);
    } else if (isEmpty(window.utm_params) && searchParams.code) {
        // redirected from github oauth
        const stateParams = JSON.parse(decodeURIComponent(searchParams.state || '{}'));
        window.utm_params = pickParams(stateParams);
    }

    return window.utm_params;
};
