import * as amplitude from '@amplitude/analytics-browser';
import { getUtmParams } from './getUtmParams';
import { currentUser } from './currentUser';

const getCommonOptions = () => ({
    dashboard_version: process.env.REACT_APP_DASHBOARD_VERSION,
    events_protocol: process.env.REACT_APP_EVENTS_PROTOCOL,
    timestamp: new Date().toString(),
    platform: '100ms-docs',
    ...getUtmParams()
});

// page analytics

const hubspotPageView = () => {
    const path = window.location.pathname;
    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, no-multi-assign
    const _hsq = (window._hsq = window._hsq || []);
    if (_hsq) {
        _hsq.push(['setPath', path]);
        _hsq.push(['trackPageView']);
    }
};

// identify analytics
const hubspotIdentify = ({ properties }: { properties: {} }) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, no-multi-assign
    const _hsq = (window._hsq = window._hsq || []);
    if (_hsq) {
        _hsq.push(['identify', { properties }]);
    }
};

export const analyticsStore: {
    data: { workspaceOwnerEmail: null };
    set: (payload: {}) => void;
    get: () => {};
} = {
    data: { workspaceOwnerEmail: null },
    set: (payload) => {
        for (const index in payload) {
            if (Object.prototype.hasOwnProperty.call(payload, index)) {
                analyticsStore.data[index] = payload[index];
            }
        }
    },
    get: () => analyticsStore?.data
};

const analyticsTrack = (title, options) => {
    try {
        const user = currentUser();
        if (!user) {
            amplitude.track({
                event_type: title,
                event_properties: {
                    ...getCommonOptions(),
                    ...options
                }
            });
        } else if (user && !user.is_admin) {
            amplitude.track({
                event_type: title,
                event_properties: {
                    email: user.email,
                    customer_id: user.customer_id,

                    workspaceOwnerEmail: (analyticsStore.get() as { workspaceOwnerEmail: string })
                        ?.workspaceOwnerEmail,
                    api_version: user.api_version,
                    ...getCommonOptions(),
                    ...options
                }
            });
        }
    } catch (e) {
        console.error(e);
    }
};

const analyticsPage = (title, options) => {
    const user = currentUser();
    if (!user) {
        try {
            hubspotPageView();
        } catch (e) {
            console.error(e);
        }
    } else if (user && !user.is_admin) {
        try {
            hubspotPageView();
        } catch (e) {
            console.error(e);
        }
    }
};

const amplitudeIdentify = (userId, properties = {}) => {
    let identifyEventProperties = {};
    if (Object.keys(properties).length > 0 && properties !== null && properties !== undefined) {
        for (const key in properties) {
            if (Object.prototype.hasOwnProperty.call(properties, key)) {
                identifyEventProperties = {
                    ...identifyEventProperties,
                    key: properties?.[key]
                };
            }
        }
    }
    amplitude.identify(userId, identifyEventProperties);
};

const analyticsIdentify = (id, options = {}) => {
    const user = currentUser();
    if (!user || (user && !user.is_admin)) {
        const finalOptions = {
            ...getCommonOptions(),
            ...options
        };
        try {
            hubspotIdentify({
                properties: { ...finalOptions, refId: id, email: user.email, ...user }
            });
        } catch (e) {
            console.error(e);
        }
        try {
            amplitudeIdentify(id, finalOptions);
        } catch (e) {
            console.error(e);
        }
    }
};

export const AppAnalytics = {
    identify: analyticsIdentify,
    track: analyticsTrack,
    page: analyticsPage
};
