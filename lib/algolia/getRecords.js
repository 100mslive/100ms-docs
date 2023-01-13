const fs = require('fs');
const path = require('path');
const url = require('url');
const algoliasearch = require('algoliasearch/lite');

const {
    cacheContentAlias,
    getRecordObject,
    pushRecursively,
    createRecords,
    getSectionContent
} = require('./algoliaUtils');

async function updateIndex() {
    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
    const adminKey = process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY;
    const algoliaIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;
    const projectENV = 'prod';

    if (appId && adminKey && algoliaIndex && projectENV === 'prod') {
        const jsonDirectory = path.join(process.cwd());
        const contentPath = `${jsonDirectory}/common`;
        const docsPath = `${jsonDirectory}/docs`;
        const basePath = `${url.pathToFileURL(jsonDirectory).toString()}/docs`;
        const records = [
            {
                title: 'Are there any trial account limitations?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#are-there-any-trial-account-limitations-0',
                link: '/docs/javascript/v2/foundation/faq#are-there-any-trial-account-limitations',
                platformName: 'Common',
                keywords: [],
                content: 'There are no trial account limitations.'
            },
            {
                title: 'Is there any usage analytics dashboard available to check various metrics associated with our account?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-any-usage-analytics-dashboard-available-to-check-various-metrics-associated-with-our-account-1',
                link: '/docs/javascript/v2/foundation/faq#is-there-any-usage-analytics-dashboard-available-to-check-various-metrics-associated-with-our-account',
                platformName: 'Common',
                keywords: [],
                content:
                    'The amplitude dashboard is not currently available on trial accounts, but we can create one and share it with your account. Eventually, we will bring it inside the dashboard.'
            },
            {
                title: 'Does the 100ms video sdk provide analytics on room, session, and each user, including data such as time spent per user, total session length, and number of peers in a room?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#does-the-100ms-video-sdk-provide-analytics-on-room-session-and-each-user-including-data-such-as-time-spent-per-user-total-session-length-and-number-of-peers-in-a-room-2',
                link: '/docs/javascript/v2/foundation/faq#does-the-100ms-video-sdk-provide-analytics-on-room-session-and-each-user-including-data-such-as-time-spent-per-user-total-session-length-and-number-of-peers-in-a-room',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, the 100ms video sdk provides analytics on room, session, and each user, including data such as time spent per user, total session length, and number of peers in a room.'
            },
            {
                title: 'How do I stop using 100ms token endpoint for app token generation in the react sample app and use the endpoint of my backend service?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-do-i-stop-using-100ms-token-endpoint-for-app-token-generation-in-the-react-sample-app-and-use-the-endpoint-of-my-backend-service-3',
                link: '/docs/javascript/v2/foundation/faq#how-do-i-stop-using-100ms-token-endpoint-for-app-token-generation-in-the-react-sample-app-and-use-the-endpoint-of-my-backend-service',
                platformName: 'Common',
                keywords: [],
                content:
                    'you can setup a token server at your that generates the management/access tokens, as outlined in the doc link above\nI’m assuming you’ve cloned the react sample app and are planning to deploy it?\nif so, you can update the code to point to your own token service (relevant code in the sample - see getToken(...))\nyour token endpoint can follow a similar interface: for a given room_id and role name, return the app token JWT\nyou can continue using the existing routes (room_id/role) or setup your own routes in this forked code'
            },
            {
                title: 'Can anyone say what is <management_token> how to generate this, so that i need to create room via postman.',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-anyone-say-what-is-management_token-how-to-generate-this-so-that-i-need-to-create-room-via-postman-4',
                link: '/docs/javascript/v2/foundation/faq#can-anyone-say-what-is-management_token-how-to-generate-this-so-that-i-need-to-create-room-via-postman',
                platformName: 'Common',
                keywords: [],
                content:
                    'docs for:\ngenerating management token in code\npostman collection: this auto-generates management tokens on the fly to speed things up'
            },
            {
                title: 'What is the validity of management and client token?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#what-is-the-validity-of-management-and-client-token-5',
                link: '/docs/javascript/v2/foundation/faq#what-is-the-validity-of-management-and-client-token',
                platformName: 'Common',
                keywords: [],
                content:
                    "24 hours.\nAlthough this can be set to 90 days by changing the duration - expiresIn: '24h', in the authentication tokens."
            },
            {
                title: 'Why is the role variable needed when generating the app token?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#why-is-the-role-variable-needed-when-generating-the-app-token-6',
                link: '/docs/javascript/v2/foundation/faq#why-is-the-role-variable-needed-when-generating-the-app-token',
                platformName: 'Common',
                keywords: [],
                content:
                    'The role is the one that you will get once you have created a sample template, such as host and guest for a virtual event template.'
            },
            {
                title: "Can we generate two application access tokens, one for QA and one for production, so that messages from QA don't flood the production environment?",
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-we-generate-two-application-access-tokens-one-for-qa-and-one-for-production-so-that-messages-from-qa-dont-flood-the-production-environment-7',
                link: '/docs/javascript/v2/foundation/faq#can-we-generate-two-application-access-tokens-one-for-qa-and-one-for-production-so-that-messages-from-qa-dont-flood-the-production-environment',
                platformName: 'Common',
                keywords: [],
                content: 'Yes, you can create multiple tokens in the settings page.'
            },
            {
                title: 'Is there a way to ensure the website / url is not accessible just in case that gets known? ',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-a-way-to-ensure-the-website-url-is-not-accessible-just-in-case-that-gets-known-8',
                link: '/docs/javascript/v2/foundation/faq#is-there-a-way-to-ensure-the-website-url-is-not-accessible-just-in-case-that-gets-known',
                platformName: 'Common',
                keywords: [],
                content:
                    'I think if you use the jwt token mechanism instead of links then this problem should never happen. Same with limiting 2 participants. You handout tokens only to two participants'
            },
            {
                title: 'Is chat in a separate webrtc channel?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-chat-in-a-separate-webrtc-channel-9',
                link: '/docs/javascript/v2/foundation/faq#is-chat-in-a-separate-webrtc-channel',
                platformName: 'Common',
                keywords: [],
                content: 'Chat is sent over websockets'
            },
            {
                title: 'If the chat function is not needed, how much can the system be scaled?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#if-the-chat-function-is-not-needed-how-much-can-the-system-be-scaled-10',
                link: '/docs/javascript/v2/foundation/faq#if-the-chat-function-is-not-needed-how-much-can-the-system-be-scaled',
                platformName: 'Common',
                keywords: [],
                content: 'Without the chat function, the system can scale to 50k-100k viewers.'
            },
            {
                title: 'Does your chat feature only support text conversations or does it support \nany advanced features like Profanity filtering, Rich media file uploads, etc?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#does-your-chat-feature-only-support-text-conversations-or-does-it-support-any-advanced-features-like-profanity-filtering-rich-media-file-uploads-etc-11',
                link: '/docs/javascript/v2/foundation/faq#does-your-chat-feature-only-support-text-conversations-or-does-it-support-any-advanced-features-like-profanity-filtering-rich-media-file-uploads-etc',
                platformName: 'Common',
                keywords: [],
                content:
                    'No as of now. We recommend using a separate chat sdk for these features. These can be built on top of 100ms as well but that will need more coding on your side'
            },
            {
                title: 'Is there a way to retrieve chat logs during a session?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-a-way-to-retrieve-chat-logs-during-a-session-12',
                link: '/docs/javascript/v2/foundation/faq#is-there-a-way-to-retrieve-chat-logs-during-a-session',
                platformName: 'Common',
                keywords: [],
                content: 'Currently, chat is not saved and there is no way to retrieve chat logs.'
            },
            {
                title: 'Can the 100ms RTMP streaming bot be used with any URL?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-the-100ms-rtmp-streaming-bot-be-used-with-any-url-13',
                link: '/docs/javascript/v2/foundation/faq#can-the-100ms-rtmp-streaming-bot-be-used-with-any-url',
                platformName: 'Common',
                keywords: [],
                content: 'The 100ms RTMP streaming bot can be used with any URL.'
            },
            {
                title: 'Do we need to set up our own CDN servers for RTMP URLs or can we attach 100ms URLs to video elements in HTML?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#do-we-need-to-set-up-our-own-cdn-servers-for-rtmp-urls-or-can-we-attach-100ms-urls-to-video-elements-in-html-14',
                link: '/docs/javascript/v2/foundation/faq#do-we-need-to-set-up-our-own-cdn-servers-for-rtmp-urls-or-can-we-attach-100ms-urls-to-video-elements-in-html',
                platformName: 'Common',
                keywords: [],
                content:
                    'The CDN URL is not needed for HLS; it will be provided by 100ms. For RTMP, you will need to set up your own CDN servers or attach 100ms URLs to video elements in HTML.'
            },
            {
                title: 'How can I integrate a feature similar to Twitter super followers using 100ms? \nAlso, I want to only allow the authenticated users, is that possible?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-can-i-integrate-a-feature-similar-to-twitter-super-followers-using-100ms-also-i-want-to-only-allow-the-authenticated-users-is-that-possible-15',
                link: '/docs/javascript/v2/foundation/faq#how-can-i-integrate-a-feature-similar-to-twitter-super-followers-using-100ms-also-i-want-to-only-allow-the-authenticated-users-is-that-possible',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes. The live feed is only available in a room. And to enter a room you need a JWT token with the viewer role. So this is possible'
            },
            {
                title: 'What is the inspiration behind the name, 100ms?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#what-is-the-inspiration-behind-the-name-100ms-16',
                link: '/docs/javascript/v2/foundation/faq#what-is-the-inspiration-behind-the-name-100ms',
                platformName: 'Common',
                keywords: [],
                content: 'A response time of 100ms is perceived as instantaneous'
            },
            {
                title: 'If we toggle the option to “Disable <room_id>/<role> link format”, how should we access the meeting from your Github React app starter template?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#if-we-toggle-the-option-to-disable-room_idrole-link-format-how-should-we-access-the-meeting-from-your-github-react-app-starter-template-17',
                link: '/docs/javascript/v2/foundation/faq#if-we-toggle-the-option-to-disable-room_idrole-link-format-how-should-we-access-the-meeting-from-your-github-react-app-starter-template',
                platformName: 'Common',
                keywords: [],
                content:
                    'with this change, you can stop relying on the 100ms token endpoint\nto disable it, turn ON the toggle for “Disable room_id/role link format”\nwe’re working on this UI to make this more intuitive'
            },
            {
                title: 'Are your services supported in all countries?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#are-your-services-supported-in-all-countries-18',
                link: '/docs/javascript/v2/foundation/faq#are-your-services-supported-in-all-countries',
                platformName: 'Common',
                keywords: [],
                content: "No, there is no country as such where we don't support our services."
            },
            {
                title: 'Is it normal to be able to create only one custom template in an account or is this a trial restriction?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-it-normal-to-be-able-to-create-only-one-custom-template-in-an-account-or-is-this-a-trial-restriction-19',
                link: '/docs/javascript/v2/foundation/faq#is-it-normal-to-be-able-to-create-only-one-custom-template-in-an-account-or-is-this-a-trial-restriction',
                platformName: 'Common',
                keywords: [],
                content:
                    'The limitation on the number of custom templates is just a dashboard limitation. After creating a "named template," you can go and modify the role names and parameters to make it your custom template.'
            },
            {
                title: 'Can I delete apps from dashboard?',
                objectID: '/docs/javascript/v2/foundation/faq#can-i-delete-apps-from-dashboard-20',
                link: '/docs/javascript/v2/foundation/faq#can-i-delete-apps-from-dashboard',
                platformName: 'Common',
                keywords: [],
                content: 'Yes, you can delete apps using the red "X" button on the dashboard.'
            },
            {
                title: 'Is 100ms fully optimized for mobile devices?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-100ms-fully-optimized-for-mobile-devices-21',
                link: '/docs/javascript/v2/foundation/faq#is-100ms-fully-optimized-for-mobile-devices',
                platformName: 'Common',
                keywords: [],
                content:
                    'It is unclear what is meant by "fully optimized." Screenshare is available on Android native and web on tablets using mweb, while recording is available on Native apps and web on tablets. iOS does not currently have screenshare.'
            },
            {
                title: 'Is 100ms on AWS or another cloud infra provider?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-100ms-on-aws-or-another-cloud-infra-provider-22',
                link: '/docs/javascript/v2/foundation/faq#is-100ms-on-aws-or-another-cloud-infra-provider',
                platformName: 'Common',
                keywords: [],
                content: '100ms is on AWS.'
            },
            {
                title: 'How do I get started with integrating video functionality to my website using 100ms?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-do-i-get-started-with-integrating-video-functionality-to-my-website-using-100ms-23',
                link: '/docs/javascript/v2/foundation/faq#how-do-i-get-started-with-integrating-video-functionality-to-my-website-using-100ms',
                platformName: 'Common',
                keywords: [],
                content:
                    "Once you've set-up the template and created a room, you will need to call the join API to start the session - https://www.100ms.live/docs/javascript/v2/features/join"
            },
            {
                title: 'Do you have any resources for designers that lets them know what parts of the video player are easily configurable so they can make designs for how they want the video player to look?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#do-you-have-any-resources-for-designers-that-lets-them-know-what-parts-of-the-video-player-are-easily-configurable-so-they-can-make-designs-for-how-they-want-the-video-player-to-look-24',
                link: '/docs/javascript/v2/foundation/faq#do-you-have-any-resources-for-designers-that-lets-them-know-what-parts-of-the-video-player-are-easily-configurable-so-they-can-make-designs-for-how-they-want-the-video-player-to-look',
                platformName: 'Common',
                keywords: [],
                content:
                    "You can change pretty much whatever you want, and even use a completely custom player built from scratch, the SDK doesn't have any coupling with UI."
            },
            {
                title: 'Do you have any live demo app with some deafult UI to check how live video/audio \nfunctionality works on your platform?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#do-you-have-any-live-demo-app-with-some-deafult-ui-to-check-how-live-videoaudio-functionality-works-on-your-platform-25',
                link: '/docs/javascript/v2/foundation/faq#do-you-have-any-live-demo-app-with-some-deafult-ui-to-check-how-live-videoaudio-functionality-works-on-your-platform',
                platformName: 'Common',
                keywords: [],
                content:
                    'Front-end and UI optimizations would be from your end. We can get on a call and help you in any questions you have while building it.\nYou can also start from our sample apps available and build on top of them. A clean UI is already present and ready to use for all platforms - https://github.com/100mslive'
            },
            {
                title: 'Is it possible to capture some images shown by customers during a call for storing in a database as part of KYC?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-it-possible-to-capture-some-images-shown-by-customers-during-a-call-for-storing-in-a-database-as-part-of-kyc-26',
                link: '/docs/javascript/v2/foundation/faq#is-it-possible-to-capture-some-images-shown-by-customers-during-a-call-for-storing-in-a-database-as-part-of-kyc',
                platformName: 'Common',
                keywords: [],
                content:
                    'No, but the raw video can be accessed and image recognition can be performed on the part where the user shows their ID.'
            },
            {
                title: 'The app created using the "Video Conferencing Starter Kit" is powered by the same infra as the live applications in production or is it on some low end test infrastructure?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#the-app-created-using-the-video-conferencing-starter-kit-is-powered-by-the-same-infra-as-the-live-applications-in-production-or-is-it-on-some-low-end-test-infrastructure-27',
                link: '/docs/javascript/v2/foundation/faq#the-app-created-using-the-video-conferencing-starter-kit-is-powered-by-the-same-infra-as-the-live-applications-in-production-or-is-it-on-some-low-end-test-infrastructure',
                platformName: 'Common',
                keywords: [],
                content:
                    'It is powered by the same infra. Same as everything in production that we serve to our clients.'
            },
            {
                title: 'We have decided to use 100ms to integrate live streaming into our app, how can we get started?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#we-have-decided-to-use-100ms-to-integrate-live-streaming-into-our-app-how-can-we-get-started-28',
                link: '/docs/javascript/v2/foundation/faq#we-have-decided-to-use-100ms-to-integrate-live-streaming-into-our-app-how-can-we-get-started',
                platformName: 'Common',
                keywords: [],
                content:
                    'You can start with our documentation - https://www.100ms.live/docs. We also recommend checking out our github for open source sample SDKs that can aid in initial integration - https://github.com/100mslive ;; Here is a piece on our live streaming capabilities : https://www.100ms.live/interactive-live-streaming'
            },
            {
                title: 'Can you provide more information on the live stream feature?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-you-provide-more-information-on-the-live-stream-feature-29',
                link: '/docs/javascript/v2/foundation/faq#can-you-provide-more-information-on-the-live-stream-feature',
                platformName: 'Common',
                keywords: [],
                content:
                    'The live stream feature allows users to broadcast their live video to a large audience. It is currently in beta and more information will be provided once it is released.'
            },
            {
                title: 'What is the limit for room size in live streaming?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#what-is-the-limit-for-room-size-in-live-streaming-30',
                link: '/docs/javascript/v2/foundation/faq#what-is-the-limit-for-room-size-in-live-streaming',
                platformName: 'Common',
                keywords: [],
                content:
                    'This is same as webRTC. For example, If we have 1000 people on a Stream, all of whom are uploading their video and each of them are only downloading 9 tiles, we at the 10K limit and your real time video conferencing technology can support this, correct?'
            },
            {
                title: 'What is the scalability of the live streaming? What is the maximum number of viewers it can support?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#what-is-the-scalability-of-the-live-streaming-what-is-the-maximum-number-of-viewers-it-can-support-31',
                link: '/docs/javascript/v2/foundation/faq#what-is-the-scalability-of-the-live-streaming-what-is-the-maximum-number-of-viewers-it-can-support',
                platformName: 'Common',
                keywords: [],
                content:
                    'The maximum number of viewers the live streaming can support with the chat function is 5k. Without the chat function, the system can scale to 50k-100k viewers.'
            },
            {
                title: 'What is the average delay of the live streaming?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#what-is-the-average-delay-of-the-live-streaming-32',
                link: '/docs/javascript/v2/foundation/faq#what-is-the-average-delay-of-the-live-streaming',
                platformName: 'Common',
                keywords: [],
                content: 'The average delay of the live streaming is 10-12 seconds.'
            },
            {
                title: 'Can users in the Live Stream send chat messages themselves?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-users-in-the-live-stream-send-chat-messages-themselves-33',
                link: '/docs/javascript/v2/foundation/faq#can-users-in-the-live-stream-send-chat-messages-themselves',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes. The same chat api as conferencing works for the live stream users as well.'
            },
            {
                title: 'Do you have a list of extra plugins that can be added to live sessions?\n',
                objectID:
                    '/docs/javascript/v2/foundation/faq#do-you-have-a-list-of-extra-plugins-that-can-be-added-to-live-sessions-34',
                link: '/docs/javascript/v2/foundation/faq#do-you-have-a-list-of-extra-plugins-that-can-be-added-to-live-sessions',
                platformName: 'Common',
                keywords: [],
                content:
                    'Currently, raise hand and polls are coming soon, while chat is live and whiteboard is buildable but does not come out of the box.'
            },
            {
                title: 'Can I build whiteboard feature on 100ms platform?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-i-build-whiteboard-feature-on-100ms-platform-35',
                link: '/docs/javascript/v2/foundation/faq#can-i-build-whiteboard-feature-on-100ms-platform',
                platformName: 'Common',
                keywords: [],
                content:
                    'The Whiteboard feature is currently available in beta for Web platform. We will build our own communication infra for this but currently this is integrated with Pusher, you can create a Pusher account and integrate this in your app too.\n\nPlease check the Collaborative Whiteboard guide for more information. '
            },
            {
                title: 'We wanted to ask specifics on pricing and how we could calculate an estimated cost based on our use case',
                objectID:
                    '/docs/javascript/v2/foundation/faq#we-wanted-to-ask-specifics-on-pricing-and-how-we-could-calculate-an-estimated-cost-based-on-our-use-case-36',
                link: '/docs/javascript/v2/foundation/faq#we-wanted-to-ask-specifics-on-pricing-and-how-we-could-calculate-an-estimated-cost-based-on-our-use-case',
                platformName: 'Common',
                keywords: [],
                content:
                    'You can use our pricing calculator for an estimate of the cost. You can also book a meeting with us directly for an in-depth discussion.'
            },
            {
                title: 'Is this pricing for standard definition or high definition? In the pricing calculator, it’s telling us to contact you guys to discuss pricing for HD',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-this-pricing-for-standard-definition-or-high-definition-in-the-pricing-calculator-its-telling-us-to-contact-you-guys-to-discuss-pricing-for-hd-37',
                link: '/docs/javascript/v2/foundation/faq#is-this-pricing-for-standard-definition-or-high-definition-in-the-pricing-calculator-its-telling-us-to-contact-you-guys-to-discuss-pricing-for-hd',
                platformName: 'Common',
                keywords: [],
                content:
                    'You can use our pricing calculator for an estimate of the cost. You can also book a meeting with us directly for an in-depth discussion.'
            },
            {
                title: 'Does billing on minutes count when only the local peer is joined in a room?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#does-billing-on-minutes-count-when-only-the-local-peer-is-joined-in-a-room-38',
                link: '/docs/javascript/v2/foundation/faq#does-billing-on-minutes-count-when-only-the-local-peer-is-joined-in-a-room',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, if any peer joins and is publishing video or audio, it will be billed.'
            },
            {
                title: 'Would you be able to tell us the approximate latency of a Creator in north America doing a real time video conference for the end user who is located in Australia?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#would-you-be-able-to-tell-us-the-approximate-latency-of-a-creator-in-north-america-doing-a-real-time-video-conference-for-the-end-user-who-is-located-in-australia-39',
                link: '/docs/javascript/v2/foundation/faq#would-you-be-able-to-tell-us-the-approximate-latency-of-a-creator-in-north-america-doing-a-real-time-video-conference-for-the-end-user-who-is-located-in-australia',
                platformName: 'Common',
                keywords: [],
                content: 'It should be in the 200-500ms range'
            },
            {
                title: 'Is the latency different for different devices?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-the-latency-different-for-different-devices-40',
                link: '/docs/javascript/v2/foundation/faq#is-the-latency-different-for-different-devices',
                platformName: 'Common',
                keywords: [],
                content:
                    'Latency is calculated based on the network bandwidth of the user, sometimes in low end devices, the device itself can hamper latency.'
            },
            {
                title: 'Hi 100ms team, I am seeing an issue where it keeps saying my WiFi is not strong, even though it is. It seems like the 100ms player is just not maintaining a strong connection to my WiFi.',
                objectID:
                    '/docs/javascript/v2/foundation/faq#hi-100ms-team-i-am-seeing-an-issue-where-it-keeps-saying-my-wifi-is-not-strong-even-though-it-is-it-seems-like-the-100ms-player-is-just-not-maintaining-a-strong-connection-to-my-wifi-41',
                link: '/docs/javascript/v2/foundation/faq#hi-100ms-team-i-am-seeing-an-issue-where-it-keeps-saying-my-wifi-is-not-strong-even-though-it-is-it-seems-like-the-100ms-player-is-just-not-maintaining-a-strong-connection-to-my-wifi',
                platformName: 'Common',
                keywords: [],
                content:
                    'This is the connection quality score which changes on real time on basis of the bandwidth of the peer at the given time. If you are in strong connection but at that point the bandwidth might have dropped down the connection quality will reflect poor https://www.100ms.live/docs/javascript/v2/advanced-features/connection-quality\nYou can also look into the advance feature stat for nerds here - This gives more metrics to check on why connection quality dropped https://www.100ms.live/docs/javascript/v2/advanced-features/stats'
            },
            {
                title: "is it possible to dynamically set the video resolution based on the number of participants? So if there are just two, it's 1080, then when a third joins, it drops to 720, then when a 7th joins, it drops to 360, or something like that?",
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-it-possible-to-dynamically-set-the-video-resolution-based-on-the-number-of-participants-so-if-there-are-just-two-its-1080-then-when-a-third-joins-it-drops-to-720-then-when-a-7th-joins-it-drops-to-360-or-something-like-that-42',
                link: '/docs/javascript/v2/foundation/faq#is-it-possible-to-dynamically-set-the-video-resolution-based-on-the-number-of-participants-so-if-there-are-just-two-its-1080-then-when-a-third-joins-it-drops-to-720-then-when-a-7th-joins-it-drops-to-360-or-something-like-that',
                platformName: 'Common',
                keywords: [],
                content:
                    'We have released Simulcast!\nWith simulcast the video quality of peers will drop based on network bandwidth available.'
            },
            {
                title: 'For a given Room, what is the max # of concurrent WebRTC connected participants?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#for-a-given-room-what-is-the-max-of-concurrent-webrtc-connected-participants-43',
                link: '/docs/javascript/v2/foundation/faq#for-a-given-room-what-is-the-max-of-concurrent-webrtc-connected-participants',
                platformName: 'Common',
                keywords: [],
                content:
                    'In a single room at a given time, we currently support 10000 streams i.e. 100 participants with audio and video enabled'
            },
            {
                title: "What's the best 100ms have got so far for video limits?",
                objectID:
                    '/docs/javascript/v2/foundation/faq#whats-the-best-100ms-have-got-so-far-for-video-limits-44',
                link: '/docs/javascript/v2/foundation/faq#whats-the-best-100ms-have-got-so-far-for-video-limits',
                platformName: 'Common',
                keywords: [],
                content:
                    '300 video on concurrently is the highest, with one provider able to do 1000 concurrent by end of year.'
            },
            {
                title: 'What are max tiles config 100ms can support?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#what-are-max-tiles-config-100ms-can-support-45',
                link: '/docs/javascript/v2/foundation/faq#what-are-max-tiles-config-100ms-can-support',
                platformName: 'Common',
                keywords: [],
                content:
                    'Layout Tiles in view Publish resolution Max peers in room\n1x1 1 720p 1500\n2x2 4 480p 450\n3x3 9 360p 200\n4x4 16 240p 100'
            },
            {
                title: 'What is the maximum number of people that can be supported currently?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#what-is-the-maximum-number-of-people-that-can-be-supported-currently-46',
                link: '/docs/javascript/v2/foundation/faq#what-is-the-maximum-number-of-people-that-can-be-supported-currently',
                platformName: 'Common',
                keywords: [],
                content:
                    'The maximum number of people that can be supported currently is 100 for full duplex audio/video with less than 500ms latency. For webinar-style events with stage and audience, the maximum number of people on the stage is 10, with 1000s offstage. For large events, the audience on TV can number in the millions with a 7-10s latency.'
            },
            {
                title: 'What is the maximum capacity for group calls with 100ms video sdk?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#what-is-the-maximum-capacity-for-group-calls-with-100ms-video-sdk-47',
                link: '/docs/javascript/v2/foundation/faq#what-is-the-maximum-capacity-for-group-calls-with-100ms-video-sdk',
                platformName: 'Common',
                keywords: [],
                content:
                    'The maximum capacity for group calls with 100ms video sdk is currently 100 participants with audio/video on.'
            },
            {
                title: 'Is there any limitations on the number of rooms or peers that can be created in 100ms?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-any-limitations-on-the-number-of-rooms-or-peers-that-can-be-created-in-100ms-48',
                link: '/docs/javascript/v2/foundation/faq#is-there-any-limitations-on-the-number-of-rooms-or-peers-that-can-be-created-in-100ms',
                platformName: 'Common',
                keywords: [],
                content:
                    'There are no limits on the number of rooms, and in a single room at a given time, 100ms currently supports 10,000 streams (published streams + subscribed streams).'
            },
            {
                title: 'What is the limit for room size in webRTC?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#what-is-the-limit-for-room-size-in-webrtc-49',
                link: '/docs/javascript/v2/foundation/faq#what-is-the-limit-for-room-size-in-webrtc',
                platformName: 'Common',
                keywords: [],
                content:
                    'total number of uploaded streams + total number of downloaded streams ≤ 10,000\ntotal number of uploaded streams is every single video feed being sent to the server, regardless of who is viewing it\ntotal number of downloaded streams is calculated as number of webrtc viewers x number of video tiles seen by each (regardless of tile size) here’s an example:\na room with 100 peers, each with their video on, but each peer can only see 20 pax on the first page due to pagination\nuploaded streams = 100\ndownloaded streams = 100 peers x 20 video tiles each = 2,000\ntotal = 2,100 ≤ 10,000'
            },
            {
                title: 'does your latest react native hms sdk target or compile at android 12 i.e targetsdkVersion 31 ? we are trying to upgrade our apk to targetSdkVersion 31',
                objectID:
                    '/docs/javascript/v2/foundation/faq#does-your-latest-react-native-hms-sdk-target-or-compile-at-android-12-ie-targetsdkversion-31-we-are-trying-to-upgrade-our-apk-to-targetsdkversion-31-50',
                link: '/docs/javascript/v2/foundation/faq#does-your-latest-react-native-hms-sdk-target-or-compile-at-android-12-ie-targetsdkversion-31-we-are-trying-to-upgrade-our-apk-to-targetsdkversion-31',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, Android 12 is supported. Since our SDK does not use any Android 12 specific APIs, we have kept targetsdkVersion 29 to ensure compatibility with all users of our SDK'
            },
            {
                title: 'Hey how long should it take for a recording to show up in our s3 bucket after a livestream is ended, for both beam recording and SFU?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#hey-how-long-should-it-take-for-a-recording-to-show-up-in-our-s3-bucket-after-a-livestream-is-ended-for-both-beam-recording-and-sfu-51',
                link: '/docs/javascript/v2/foundation/faq#hey-how-long-should-it-take-for-a-recording-to-show-up-in-our-s3-bucket-after-a-livestream-is-ended-for-both-beam-recording-and-sfu',
                platformName: 'Common',
                keywords: [],
                content:
                    'Beam recording should be available within 15-20 minutes after the call ends.\nSFU recording will take ~1.5 times the call duration, after the call ends.'
            },
            {
                title: 'Whats the difference between the beam recording vs. SFU recording?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#whats-the-difference-between-the-beam-recording-vs-sfu-recording-52',
                link: '/docs/javascript/v2/foundation/faq#whats-the-difference-between-the-beam-recording-vs-sfu-recording',
                platformName: 'Common',
                keywords: [],
                content:
                    'Beam recording is the browser recording which you are actually using.\nSFU recording is a composite recording which gets created after recording each of the individual peers and merging it.\nmore on both recordings here - https://www.100ms.live/docs/server-side/v2/introduction/recordings'
            },
            {
                title: 'Will the 100ms bot go to a video call webpage and render dynamic pages and stream/record the screen, or will it collect incoming video/audio streams only?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#will-the-100ms-bot-go-to-a-video-call-webpage-and-render-dynamic-pages-and-streamrecord-the-screen-or-will-it-collect-incoming-videoaudio-streams-only-53',
                link: '/docs/javascript/v2/foundation/faq#will-the-100ms-bot-go-to-a-video-call-webpage-and-render-dynamic-pages-and-streamrecord-the-screen-or-will-it-collect-incoming-videoaudio-streams-only',
                platformName: 'Common',
                keywords: [],
                content:
                    'The 100ms bot goes to a video call webpage and renders dynamic pages and stream/record the screen.'
            },
            {
                title: 'Can we split room recordings as per some control at our end?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-we-split-room-recordings-as-per-some-control-at-our-end-54',
                link: '/docs/javascript/v2/foundation/faq#can-we-split-room-recordings-as-per-some-control-at-our-end',
                platformName: 'Common',
                keywords: [],
                content:
                    'It depends on the type of recording being used. If using AVP recording, webhooks can be used to retrieve the recording link for each session. If using beam recording, the recording can be split by specifying the recording duration in the API call.'
            },
            {
                title: 'Can we use the same room ID but have separate recordings as per our need?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-we-use-the-same-room-id-but-have-separate-recordings-as-per-our-need-55',
                link: '/docs/javascript/v2/foundation/faq#can-we-use-the-same-room-id-but-have-separate-recordings-as-per-our-need',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, it can be done by specifying a new session ID in the API call to create a new recording.'
            },
            {
                title: 'How can we retrieve the recording from a room?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-can-we-retrieve-the-recording-from-a-room-56',
                link: '/docs/javascript/v2/foundation/faq#how-can-we-retrieve-the-recording-from-a-room',
                platformName: 'Common',
                keywords: [],
                content:
                    'The recording can be retrieved by using the API call to get the recording details and then downloading the recording using the provided link.'
            },
            {
                title: 'Is it possible to make a recording automatically stop after a certain duration or at a specific time?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-it-possible-to-make-a-recording-automatically-stop-after-a-certain-duration-or-at-a-specific-time-57',
                link: '/docs/javascript/v2/foundation/faq#is-it-possible-to-make-a-recording-automatically-stop-after-a-certain-duration-or-at-a-specific-time',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, the recording can be stopped automatically by specifying the recording duration in the API call or by using the API call to stop the recording at a specific time.'
            },
            {
                title: 'Can we retrieve the list of all the recordings of a room?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-we-retrieve-the-list-of-all-the-recordings-of-a-room-58',
                link: '/docs/javascript/v2/foundation/faq#can-we-retrieve-the-list-of-all-the-recordings-of-a-room',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, the list of all recordings for a room can be retrieved using the API call to list recordings.'
            },
            {
                title: 'Is it possible to make a recording stop when a specific event occurs?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-it-possible-to-make-a-recording-stop-when-a-specific-event-occurs-59',
                link: '/docs/javascript/v2/foundation/faq#is-it-possible-to-make-a-recording-stop-when-a-specific-event-occurs',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, the recording can be stopped using the API call to stop the recording when a specific event occurs.'
            },
            {
                title: 'Is s3:ListBucket S3 permission required for S3 bucket access?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-s3listbucket-s3-permission-required-for-s3-bucket-access-60',
                link: '/docs/javascript/v2/foundation/faq#is-s3listbucket-s3-permission-required-for-s3-bucket-access',
                platformName: 'Common',
                keywords: [],
                content: 'ListBucket permission is not required'
            },
            {
                title: 'We would like to record a live stream and allow users to continue to replay the recording even after the live stream has ended. So we need to be able to directly access the recording',
                objectID:
                    '/docs/javascript/v2/foundation/faq#we-would-like-to-record-a-live-stream-and-allow-users-to-continue-to-replay-the-recording-even-after-the-live-stream-has-ended-so-we-need-to-be-able-to-directly-access-the-recording-61',
                link: '/docs/javascript/v2/foundation/faq#we-would-like-to-record-a-live-stream-and-allow-users-to-continue-to-replay-the-recording-even-after-the-live-stream-has-ended-so-we-need-to-be-able-to-directly-access-the-recording',
                platformName: 'Common',
                keywords: [],
                content:
                    'For that you need to have HLS recording enabled and that will give you a m3u8 file that you can play back post the session on any HLS player'
            },
            {
                title: 'Web Recording resolution, is the browser itself 1080p? Is the recording 1080p?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#web-recording-resolution-is-the-browser-itself-1080p-is-the-recording-1080p-62',
                link: '/docs/javascript/v2/foundation/faq#web-recording-resolution-is-the-browser-itself-1080p-is-the-recording-1080p',
                platformName: 'Common',
                keywords: [],
                content:
                    'Currently both are 720p. We can do 1080p but it will cost more.\nour RTMP out costs for 720p v/s 1080p will be 12$/1000 minutes v/s 24$/1000 minutes'
            },
            {
                title: 'Can we use the 100ms browser video recorder for one off websites?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-we-use-the-100ms-browser-video-recorder-for-one-off-websites-63',
                link: '/docs/javascript/v2/foundation/faq#can-we-use-the-100ms-browser-video-recorder-for-one-off-websites',
                platformName: 'Common',
                keywords: [],
                content: 'yes, you definitely can!'
            },
            {
                title: 'How can we debug issues with uploading video recordings to an S3 bucket?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-can-we-debug-issues-with-uploading-video-recordings-to-an-s3-bucket-64',
                link: '/docs/javascript/v2/foundation/faq#how-can-we-debug-issues-with-uploading-video-recordings-to-an-s3-bucket',
                platformName: 'Common',
                keywords: [],
                content:
                    'As a first step, check if read/write permissions are given for the bucket where the recordings need to get uploaded.'
            },
            {
                title: 'What permissions are needed to allow video recordings to be uploaded to an S3 bucket?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#what-permissions-are-needed-to-allow-video-recordings-to-be-uploaded-to-an-s3-bucket-65',
                link: '/docs/javascript/v2/foundation/faq#what-permissions-are-needed-to-allow-video-recordings-to-be-uploaded-to-an-s3-bucket',
                platformName: 'Common',
                keywords: [],
                content:
                    'Read and write permissions for the bucket where the recordings need to be uploaded are required.'
            },
            {
                title: 'How long does it take for the composite recording to be ready?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-long-does-it-take-for-the-composite-recording-to-be-ready-66',
                link: '/docs/javascript/v2/foundation/faq#how-long-does-it-take-for-the-composite-recording-to-be-ready',
                platformName: 'Common',
                keywords: [],
                content:
                    'This usually takes 1.2 - 1.5 times the duration of the session. There is a delay when a lot of requests are in queue. A delay can also happen if the number of peers in the sessions increase. Session minutes * number of peers * 1.5x.\nSo for example a session of 1 minute, with 5 participants. The total time taken for the recording to generate would be around 7.5minutes (1*5*1.5)'
            },
            {
                title: 'Is Cloud recording available?',
                objectID: '/docs/javascript/v2/foundation/faq#is-cloud-recording-available-67',
                link: '/docs/javascript/v2/foundation/faq#is-cloud-recording-available',
                platformName: 'Common',
                keywords: [],
                content: 'Yes, cloud recording is available.'
            },
            {
                title: 'Is it possible to export chat logs from one of the front-end clients and save it?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-it-possible-to-export-chat-logs-from-one-of-the-front-end-clients-and-save-it-68',
                link: '/docs/javascript/v2/foundation/faq#is-it-possible-to-export-chat-logs-from-one-of-the-front-end-clients-and-save-it',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, it is possible to export chat logs from one of the front-end clients and save it.'
            },
            {
                title: 'Is there a way for us to upload the recordings to a bucket other than s3, specifically cloudinary, although just being able to do a generic curl upload with a token would also suffice',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-a-way-for-us-to-upload-the-recordings-to-a-bucket-other-than-s3-specifically-cloudinary-although-just-being-able-to-do-a-generic-curl-upload-with-a-token-would-also-suffice-69',
                link: '/docs/javascript/v2/foundation/faq#is-there-a-way-for-us-to-upload-the-recordings-to-a-bucket-other-than-s3-specifically-cloudinary-although-just-being-able-to-do-a-generic-curl-upload-with-a-token-would-also-suffice',
                platformName: 'Common',
                keywords: [],
                content:
                    "that's not possible right now. We could offer it, but it would incur extra egress cost as well from AWS, which we would then have to pass-through. It would be unnecessarily expensive, but it's possible."
            },
            {
                title: 'Can the system scale to 50k-100k viewers if the SDK is not connected and we just want the m3u8 file?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-the-system-scale-to-50k-100k-viewers-if-the-sdk-is-not-connected-and-we-just-want-the-m3u8-file-70',
                link: '/docs/javascript/v2/foundation/faq#can-the-system-scale-to-50k-100k-viewers-if-the-sdk-is-not-connected-and-we-just-want-the-m3u8-file',
                platformName: 'Common',
                keywords: [],
                content:
                    'If the SDK is not connected and you just want the m3u8 file, the system can scale to 50k-100k viewers.'
            },
            {
                title: 'Is it possible to access in-depth analytics, such as the number of reconnections, drops, high latency, and live metrics?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-it-possible-to-access-in-depth-analytics-such-as-the-number-of-reconnections-drops-high-latency-and-live-metrics-71',
                link: '/docs/javascript/v2/foundation/faq#is-it-possible-to-access-in-depth-analytics-such-as-the-number-of-reconnections-drops-high-latency-and-live-metrics',
                platformName: 'Common',
                keywords: [],
                content:
                    'All metrics are collected and can be shared through an Amplitude dashboard, which will eventually be available within the dashboard. For some basic debugging, you can always rely on the "Events Inspector" in your 100ms dashboard.'
            },
            {
                title: 'Is the 100ms live stream sdk customisable and able to scale to millions of users?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-the-100ms-live-stream-sdk-customisable-and-able-to-scale-to-millions-of-users-72',
                link: '/docs/javascript/v2/foundation/faq#is-the-100ms-live-stream-sdk-customisable-and-able-to-scale-to-millions-of-users',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, the 100ms live stream sdk is customisable and able to scale to millions of users.'
            },
            {
                title: 'Can you share some documentation on your information security practices?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-you-share-some-documentation-on-your-information-security-practices-73',
                link: '/docs/javascript/v2/foundation/faq#can-you-share-some-documentation-on-your-information-security-practices',
                platformName: 'Common',
                keywords: [],
                content:
                    'SOC2 type II compliant: report sharable with a mutual NDA signed\nHIPAA: we can sign a BAA if you require'
            },
            {
                title: 'Is it ok to potentially create 1000s of rooms over time? ',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-it-ok-to-potentially-create-1000s-of-rooms-over-time-74',
                link: '/docs/javascript/v2/foundation/faq#is-it-ok-to-potentially-create-1000s-of-rooms-over-time',
                platformName: 'Common',
                keywords: [],
                content:
                    "Yes, you can create as many rooms as necessary. It's also handy to disable a room after you're done using it - https://www.100ms.live/docs/server-side/v2/Rooms/disable-or-enable"
            },
            {
                title: 'Can you platform handle end-to-end encryption between just 2 users?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-you-platform-handle-end-to-end-encryption-between-just-2-users-75',
                link: '/docs/javascript/v2/foundation/faq#can-you-platform-handle-end-to-end-encryption-between-just-2-users',
                platformName: 'Common',
                keywords: [],
                content:
                    'We don’t have e2e encryption. The server is doing the routing. The encryption is between server to client.'
            },
            {
                title: 'Is 100ms Soc 2 complainant?',
                objectID: '/docs/javascript/v2/foundation/faq#is-100ms-soc-2-complainant-76',
                link: '/docs/javascript/v2/foundation/faq#is-100ms-soc-2-complainant',
                platformName: 'Common',
                keywords: [],
                content: 'Yes we are Soc - 2 complaint.'
            },
            {
                title: 'Can teacher handle remote user’s (student) screen (start and stop) like remotely mute/unmute of A/V ?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-teacher-handle-remote-users-student-screen-start-and-stop-like-remotely-muteunmute-of-av-77',
                link: '/docs/javascript/v2/foundation/faq#can-teacher-handle-remote-users-student-screen-start-and-stop-like-remotely-muteunmute-of-av',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes we do have remote mute of Audi and video. It can be given based on the role for teacher in dashboard.'
            },
            {
                title: 'Is there a way to get data on how many users are online?\n',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-a-way-to-get-data-on-how-many-users-are-online-78',
                link: '/docs/javascript/v2/foundation/faq#is-there-a-way-to-get-data-on-how-many-users-are-online',
                platformName: 'Common',
                keywords: [],
                content: 'It is not currently possible to get data on how many users are online.'
            },
            {
                title: 'Is there a way I can specify my own room_id while creating a room?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-a-way-i-can-specify-my-own-room_id-while-creating-a-room-79',
                link: '/docs/javascript/v2/foundation/faq#is-there-a-way-i-can-specify-my-own-room_id-while-creating-a-room',
                platformName: 'Common',
                keywords: [],
                content: 'No the roomid gets generated from our end.'
            },
            {
                title: 'Is there a way to mute a participant using a serverside api?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-a-way-to-mute-a-participant-using-a-serverside-api-80',
                link: '/docs/javascript/v2/foundation/faq#is-there-a-way-to-mute-a-participant-using-a-serverside-api',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, the mute api route in the participant section of the docs can be used to mute a participant using a serverside api.'
            },
            {
                title: 'Is there a way to disable video for a participant using a serverside api?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-a-way-to-disable-video-for-a-participant-using-a-serverside-api-81',
                link: '/docs/javascript/v2/foundation/faq#is-there-a-way-to-disable-video-for-a-participant-using-a-serverside-api',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, the video api route in the participant section of the docs can be used to disable video for a participant using a serverside api.'
            },
            {
                title: 'How can I handle role change requests on my backend? Is there any webhook that exists or is planned?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-can-i-handle-role-change-requests-on-my-backend-is-there-any-webhook-that-exists-or-is-planned-82',
                link: '/docs/javascript/v2/foundation/faq#how-can-i-handle-role-change-requests-on-my-backend-is-there-any-webhook-that-exists-or-is-planned',
                platformName: 'Common',
                keywords: [],
                content:
                    'Currently, role change is initiated by a designated role. A role change REST API is on the roadmap.'
            },
            {
                title: 'Is there a way to handle role change requests on the backend, such as through a webhook or API?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-a-way-to-handle-role-change-requests-on-the-backend-such-as-through-a-webhook-or-api-83',
                link: '/docs/javascript/v2/foundation/faq#is-there-a-way-to-handle-role-change-requests-on-the-backend-such-as-through-a-webhook-or-api',
                platformName: 'Common',
                keywords: [],
                content:
                    'There is currently no way to handle role change requests on the backend, but it is on the roadmap.'
            },
            {
                title: 'Just want to know that if we create role with API and want changes to be synced in react SDK, so that we can use that role?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#just-want-to-know-that-if-we-create-role-with-api-and-want-changes-to-be-synced-in-react-sdk-so-that-we-can-use-that-role-84',
                link: '/docs/javascript/v2/foundation/faq#just-want-to-know-that-if-we-create-role-with-api-and-want-changes-to-be-synced-in-react-sdk-so-that-we-can-use-that-role',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes that is possible the template created on dashboard/API is universally used across all 100ms client SDKs.'
            },
            {
                title: 'Is the functionality of disable a room and end an active room same?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-the-functionality-of-disable-a-room-and-end-an-active-room-same-85',
                link: '/docs/javascript/v2/foundation/faq#is-the-functionality-of-disable-a-room-and-end-an-active-room-same',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, the disable Api route in the room section of the docs is the same as closing the room.'
            },
            {
                title: 'Is there a way to close a room using a serverside api?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-a-way-to-close-a-room-using-a-serverside-api-86',
                link: '/docs/javascript/v2/foundation/faq#is-there-a-way-to-close-a-room-using-a-serverside-api',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, the disable Api route in the room section of the docs can be used to close a room using a serverside api.'
            },
            {
                title: 'Is there any way to limit participants in a room?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-any-way-to-limit-participants-in-a-room-87',
                link: '/docs/javascript/v2/foundation/faq#is-there-any-way-to-limit-participants-in-a-room',
                platformName: 'Common',
                keywords: [],
                content:
                    'We don\'t limit the participants currently, but we can make it part of role configuration where we can add a maximum number of participants per role by setting the "maxPeerCount" attribute while you create/update a role - https://www.100ms.live/docs/server-side/v2/policy/create-update-role'
            },
            {
                title: "Have quieries related to for backend we need api's to create room and joining people to it and for website(Frontend) need guidance for components like video buttons and participants etc.",
                objectID:
                    '/docs/javascript/v2/foundation/faq#have-quieries-related-to-for-backend-we-need-apis-to-create-room-and-joining-people-to-it-and-for-websitefrontend-need-guidance-for-components-like-video-buttons-and-participants-etc-88',
                link: '/docs/javascript/v2/foundation/faq#have-quieries-related-to-for-backend-we-need-apis-to-create-room-and-joining-people-to-it-and-for-websitefrontend-need-guidance-for-components-like-video-buttons-and-participants-etc',
                platformName: 'Common',
                keywords: [],
                content:
                    'Create room - https://www.100ms.live/docs/server-side/v2/Rooms/create-via-api\nThe sample app for reference can be found here https://github.com/100mslive/100ms-web'
            },
            {
                title: 'Is there a way to schedule these rooms for a certain date and time and send invites to certain email ids',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-a-way-to-schedule-these-rooms-for-a-certain-date-and-time-and-send-invites-to-certain-email-ids-89',
                link: '/docs/javascript/v2/foundation/faq#is-there-a-way-to-schedule-these-rooms-for-a-certain-date-and-time-and-send-invites-to-certain-email-ids',
                platformName: 'Common',
                keywords: [],
                content:
                    'That needs authentication for a user and you would need to handle this on the UI.\nYou can use the Create room API to Create multiple rooms and schedule meetings as required by using them in queue.\nAnd only give the option of joining room when the meeting time comes up.\nhttps://www.100ms.live/docs/server-side/v2/features/room#create-room-using-api'
            },
            {
                title: 'Can we disable room by id? In document it says name should be the input. (Server side doc)',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-we-disable-room-by-id-in-document-it-says-name-should-be-the-input-server-side-doc-90',
                link: '/docs/javascript/v2/foundation/faq#can-we-disable-room-by-id-in-document-it-says-name-should-be-the-input-server-side-doc',
                platformName: 'Common',
                keywords: [],
                content: 'yes you can use the room id to disable.'
            },
            {
                title: 'We need to know if there is a way to end an active session programmatically (reset the room so that everyone is kicked from the meeting and it starts a new session).',
                objectID:
                    '/docs/javascript/v2/foundation/faq#we-need-to-know-if-there-is-a-way-to-end-an-active-session-programmatically-reset-the-room-so-that-everyone-is-kicked-from-the-meeting-and-it-starts-a-new-session-91',
                link: '/docs/javascript/v2/foundation/faq#we-need-to-know-if-there-is-a-way-to-end-an-active-session-programmatically-reset-the-room-so-that-everyone-is-kicked-from-the-meeting-and-it-starts-a-new-session',
                platformName: 'Common',
                keywords: [],
                content:
                    'We have an end point that helps you end an active session immediately. You can check this link to understand how the API works - https://100ms-docs-git-hls-api-100mslive.vercel.app/server-side/v2/features/room#end-room'
            },
            {
                title: 'Can you explain the differences between the hls recording and beam recording webhook events?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-you-explain-the-differences-between-the-hls-recording-and-beam-recording-webhook-events-92',
                link: '/docs/javascript/v2/foundation/faq#can-you-explain-the-differences-between-the-hls-recording-and-beam-recording-webhook-events',
                platformName: 'Common',
                keywords: [],
                content:
                    'HLS recording and beam recording are different ways of recording a video call. HLS recording involves creating a live HTTP streaming protocol, which allows users to watch the video in real time. Beam recording, on the other hand, involves creating a recording of the video call that can be watched at a later time. Customers generally set up these different recording configurations depending on their specific needs.'
            },
            {
                title: 'For incoming webhooks from 100ms to our API, is there a list of IPs that can be whitelisted',
                objectID:
                    '/docs/javascript/v2/foundation/faq#for-incoming-webhooks-from-100ms-to-our-api-is-there-a-list-of-ips-that-can-be-whitelisted-93',
                link: '/docs/javascript/v2/foundation/faq#for-incoming-webhooks-from-100ms-to-our-api-is-there-a-list-of-ips-that-can-be-whitelisted',
                platformName: 'Common',
                keywords: [],
                content:
                    "Yes, we have a list of IPs that you can accept. You don't need to open up your webhooks to the world."
            },
            {
                title: 'Is there an API call we can make to set the webhook url and headers on our account?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-an-api-call-we-can-make-to-set-the-webhook-url-and-headers-on-our-account-94',
                link: '/docs/javascript/v2/foundation/faq#is-there-an-api-call-we-can-make-to-set-the-webhook-url-and-headers-on-our-account',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, you can use the webhook.update method to set the webhook URL and headers on your account.'
            },
            {
                title: 'I am trying to get the data from a webhook, but I am not receiving anything. Is there a way to troubleshoot this issue?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#i-am-trying-to-get-the-data-from-a-webhook-but-i-am-not-receiving-anything-is-there-a-way-to-troubleshoot-this-issue-95',
                link: '/docs/javascript/v2/foundation/faq#i-am-trying-to-get-the-data-from-a-webhook-but-i-am-not-receiving-anything-is-there-a-way-to-troubleshoot-this-issue',
                platformName: 'Common',
                keywords: [],
                content:
                    'To troubleshoot issues with webhooks, you can try checking the request logs in the dashboard to see if the requests are being sent, and verify that the webhook URL is correct and that your server is set up to receive POST requests.'
            },
            {
                title: 'We’re having an issue with the beam recorder. Our development sites are through a VPN. Do you have any known IP addresses that the beam recorder will be coming from so we can whitelist it?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#were-having-an-issue-with-the-beam-recorder-our-development-sites-are-through-a-vpn-do-you-have-any-known-ip-addresses-that-the-beam-recorder-will-be-coming-from-so-we-can-whitelist-it-96',
                link: '/docs/javascript/v2/foundation/faq#were-having-an-issue-with-the-beam-recorder-our-development-sites-are-through-a-vpn-do-you-have-any-known-ip-addresses-that-the-beam-recorder-will-be-coming-from-so-we-can-whitelist-it',
                platformName: 'Common',
                keywords: [],
                content:
                    "There isn't a list of known IPs for the beam recorder, but it will always come from a 100.64.0.0/10 IP."
            },
            {
                title: 'Do you have some static ip for 100ms, that we can whitelist your hits at our end?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#do-you-have-some-static-ip-for-100ms-that-we-can-whitelist-your-hits-at-our-end-97',
                link: '/docs/javascript/v2/foundation/faq#do-you-have-some-static-ip-for-100ms-that-we-can-whitelist-your-hits-at-our-end',
                platformName: 'Common',
                keywords: [],
                content: 'We don’t support fixed/static IP’s at the moment'
            },
            {
                title: 'Do you have any GCP IP range assigned to your GCP workloads from where you would write files?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#do-you-have-any-gcp-ip-range-assigned-to-your-gcp-workloads-from-where-you-would-write-files-98',
                link: '/docs/javascript/v2/foundation/faq#do-you-have-any-gcp-ip-range-assigned-to-your-gcp-workloads-from-where-you-would-write-files',
                platformName: 'Common',
                keywords: [],
                content: 'The GCP is also on public network so no static IP'
            },
            {
                title: 'What is the filetypes you would write to bucket so we can whitelist them?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#what-is-the-filetypes-you-would-write-to-bucket-so-we-can-whitelist-them-99',
                link: '/docs/javascript/v2/foundation/faq#what-is-the-filetypes-you-would-write-to-bucket-so-we-can-whitelist-them',
                platformName: 'Common',
                keywords: [],
                content: 'We will write mp4 , txt, webm files.'
            },
            {
                title: 'How does pagination between tiles affect the download numbers?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-does-pagination-between-tiles-affect-the-download-numbers-100',
                link: '/docs/javascript/v2/foundation/faq#how-does-pagination-between-tiles-affect-the-download-numbers',
                platformName: 'Common',
                keywords: [],
                content:
                    'only the visible tiles video will get downloaded. For rest of the tiles which are paginated only the audio will be downloaded'
            },
            {
                title: 'we use 16:9 video but would like to crop it to something like 14:9 in the JS/React client. What is the best way to achieve this with CSS?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#we-use-169-video-but-would-like-to-crop-it-to-something-like-149-in-the-jsreact-client-what-is-the-best-way-to-achieve-this-with-css-101',
                link: '/docs/javascript/v2/foundation/faq#we-use-169-video-but-would-like-to-crop-it-to-something-like-149-in-the-jsreact-client-what-is-the-best-way-to-achieve-this-with-css',
                platformName: 'Common',
                keywords: [],
                content:
                    'It should be a purely UI way. You can use aspect-ratio css property on the video or the container element depending on how you are rendering.'
            },
            {
                title: 'Is the 100ms video sdk built on react frontend and provide group call functionality?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-the-100ms-video-sdk-built-on-react-frontend-and-provide-group-call-functionality-102',
                link: '/docs/javascript/v2/foundation/faq#is-the-100ms-video-sdk-built-on-react-frontend-and-provide-group-call-functionality',
                platformName: 'Common',
                keywords: [],
                content:
                    'Yes, the 100ms video sdk is built on react frontend and provides group call functionality.'
            },
            {
                title: 'do we provide a log of stats for nerds?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#do-we-provide-a-log-of-stats-for-nerds-103',
                link: '/docs/javascript/v2/foundation/faq#do-we-provide-a-log-of-stats-for-nerds',
                platformName: 'Common',
                keywords: [],
                content: 'Yes'
            },
            {
                title: 'how does a host differentiate between muting the remote mic (so that nobody can hear the remote) vs mute the remote party only locally (so that others can still hear the remote)',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-does-a-host-differentiate-between-muting-the-remote-mic-so-that-nobody-can-hear-the-remote-vs-mute-the-remote-party-only-locally-so-that-others-can-still-hear-the-remote-104',
                link: '/docs/javascript/v2/foundation/faq#how-does-a-host-differentiate-between-muting-the-remote-mic-so-that-nobody-can-hear-the-remote-vs-mute-the-remote-party-only-locally-so-that-others-can-still-hear-the-remote',
                platformName: 'Common',
                keywords: [],
                content:
                    'To mute a remote stream locally, you need to take the remote peer’s audioTrack and then cast it to HMSRemoteAudioTrack call the setVolume() method and pass 0 in the value. To mute a remote peer, so that even others cannot hear them, you need to call changeTrackState method of the HMSSDK https://www.100ms.live/docs/android/v2/features/remote-mute'
            },
            {
                title: 'can we add the feature for host to turn the guest camera on mobile to face front?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-we-add-the-feature-for-host-to-turn-the-guest-camera-on-mobile-to-face-front-105',
                link: '/docs/javascript/v2/foundation/faq#can-we-add-the-feature-for-host-to-turn-the-guest-camera-on-mobile-to-face-front',
                platformName: 'Common',
                keywords: [],
                content:
                    'Currently there is no easy way for doing that but can be done if you send a peer message and based on that change the users camera. But you might have to try it out if that would work.'
            },
            {
                title: 'Is there a way to play a static video as a participant video during a call?\n',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-a-way-to-play-a-static-video-as-a-participant-video-during-a-call-106',
                link: '/docs/javascript/v2/foundation/faq#is-there-a-way-to-play-a-static-video-as-a-participant-video-during-a-call',
                platformName: 'Common',
                keywords: [],
                content:
                    "Yes, there is a method called addTrack that can be used to pipe in any local video as if it's a participant/screenshare. It can be found in the advanced features section of the JavaScript documentation - https://www.100ms.live/docs/javascript/v2/advanced-features/custom-tracks"
            },
            {
                title: 'Can 100ms integrate with obs studio? can i stream from obs to 100ms',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-100ms-integrate-with-obs-studio-can-i-stream-from-obs-to-100ms-107',
                link: '/docs/javascript/v2/foundation/faq#can-100ms-integrate-with-obs-studio-can-i-stream-from-obs-to-100ms',
                platformName: 'Common',
                keywords: [],
                content: "The obs virtual camera input works but the rtmp input we don't have that"
            },
            {
                title: 'Can we customise the width and height of video tile which we are getting from useVideoList hook?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-we-customise-the-width-and-height-of-video-tile-which-we-are-getting-from-usevideolist-hook-108',
                link: '/docs/javascript/v2/foundation/faq#can-we-customise-the-width-and-height-of-video-tile-which-we-are-getting-from-usevideolist-hook',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    'You can use the `Video aspect ratio` config in template configuration on dashboard (https://dashboard.100ms.live/dashboard) or use the update template server API (https://www.100ms.live/docs/server-side/v2/policy/update-a-template) with the respective height and width for the particular role using the publishParams object (https://www.100ms.live/docs/server-side/v2/policy/create-template-via-api#publish-params-object). '
            },
            {
                title: 'Is there a way to provision development/testing access tokens to avoid touching production data/templates in development and staging deploys?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-a-way-to-provision-developmenttesting-access-tokens-to-avoid-touching-production-datatemplates-in-development-and-staging-deploys-109',
                link: '/docs/javascript/v2/foundation/faq#is-there-a-way-to-provision-developmenttesting-access-tokens-to-avoid-touching-production-datatemplates-in-development-and-staging-deploys',
                platformName: 'Common',
                keywords: [],
                content:
                    'Having sandbox environment is in pipeline but not now,\nAs of now you can create two separate accounts with same configurations.'
            },
            {
                title: 'Is there any sandbox mode available for dev environments?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-any-sandbox-mode-available-for-dev-environments-110',
                link: '/docs/javascript/v2/foundation/faq#is-there-any-sandbox-mode-available-for-dev-environments',
                platformName: 'Common',
                keywords: [],
                content:
                    'There is currently no sandbox mode available, but it is in the works. In the meantime, it is recommended to use two email IDs to create two accounts to keep things separate.'
            },
            {
                title: 'Is there a way to add a second user to our account? Or should we just share login credentials?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-there-a-way-to-add-a-second-user-to-our-account-or-should-we-just-share-login-credentials-111',
                link: '/docs/javascript/v2/foundation/faq#is-there-a-way-to-add-a-second-user-to-our-account-or-should-we-just-share-login-credentials',
                platformName: 'Common',
                keywords: [],
                content:
                    'We have released Workspaces which helps you add members to your workspace by going to "Settings" on your 100ms dashboard - https://dashboard.100ms.live/settings/workspace'
            },
            {
                title: 'Can we create subaccount in existing account? Want to make prod and non prod account separate',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-we-create-subaccount-in-existing-account-want-to-make-prod-and-non-prod-account-separate-112',
                link: '/docs/javascript/v2/foundation/faq#can-we-create-subaccount-in-existing-account-want-to-make-prod-and-non-prod-account-separate',
                platformName: 'Common',
                keywords: [],
                content:
                    "We don't differentiate between prod and non prod accounts.\nWould recommend having another template or another account for testing new additions."
            },
            {
                title: 'Could you specify multiple webhook URLs for different environments under the same account?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#could-you-specify-multiple-webhook-urls-for-different-environments-under-the-same-account-113',
                link: '/docs/javascript/v2/foundation/faq#could-you-specify-multiple-webhook-urls-for-different-environments-under-the-same-account',
                platformName: 'Common',
                keywords: [],
                content: 'Not currently at this time.'
            },
            {
                title: 'Can I register for another 100ms account with same email address?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-i-register-for-another-100ms-account-with-same-email-address-114',
                link: '/docs/javascript/v2/foundation/faq#can-i-register-for-another-100ms-account-with-same-email-address',
                platformName: 'Common',
                keywords: [],
                content:
                    "No that wouldn't be possible. You will need to create a separate email id."
            },
            {
                title: 'Can I delete rooms via dashboard or API?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-i-delete-rooms-via-dashboard-or-api-115',
                link: '/docs/javascript/v2/foundation/faq#can-i-delete-rooms-via-dashboard-or-api',
                platformName: 'Common',
                keywords: [],
                content:
                    'No, you cannot delete a room. We don\'t support the "delete room" functionality as it would lead to losing all data associated with the room. However, we support the below options based on the actual requirement of why you want to delete the room(s):\nCreating new rooms for every session: You can create as many rooms as you want, as we don\'t have any limit for room creation.\nDisable room: If you don\'t want future room join requests for a particular room, you can disable a room from the dashboard or via server API.\nDev & Prod Env: If you want to delete rooms from your account as you transition from Development to the Production stage, we recommend using "Workspaces." It enables you to create two or more workspaces per your need and isolate the data for each workspace. Please check this blog for more information.'
            },
            {
                title: 'How do I limit the session to a specified duration?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-do-i-limit-the-session-to-a-specified-duration-116',
                link: '/docs/javascript/v2/foundation/faq#how-do-i-limit-the-session-to-a-specified-duration',
                platformName: 'Common',
                keywords: [],
                content:
                    'To achieve this, you can use the End an active room API.\nFor example, if you must limit the duration of a session to 30 minutes: - Once the session starts, you can start a timer once you receive the session.open.success webhook event, - Wait till the duration (timer) of the session reaches 30 minutes, - Once reached, trigger the End an active room API to end the session and kick out the peers from the session.\nNote: If you set the lock argument to true, it will end the active room, and users will not be able to join the room later. You can use enable a room API or dashboard to enable the room again.'
            },
            {
                title: 'How do I record a room?',
                objectID: '/docs/javascript/v2/foundation/faq#how-do-i-record-a-room-117',
                link: '/docs/javascript/v2/foundation/faq#how-do-i-record-a-room',
                platformName: 'Common',
                keywords: [],
                content:
                    'We have two types of recordings available, SFU and Browser. You can also start the latter from the SDK.'
            },
            {
                title: 'How do I debug blank video tile while rendering?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-do-i-debug-blank-video-tile-while-rendering-118',
                link: '/docs/javascript/v2/foundation/faq#how-do-i-debug-blank-video-tile-while-rendering',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    "Start with making sure that attach video is being called for the correct track and video element. Also ensure that there is no bug leading to detach call just after or around the same time as attach. These calls when done will also show up in the redux DevTools extension. Some things we have seen in the past -\n\n- The role was not subscribed properly in the dashboard's templates section\n- [React] Calling detach as a cleanup function of the same useEffect which calls attach and has video track as dependency. Instead of this please have a separate useEffect with no dependencies to call detach on component unmount.\n- [React] Not using the key field properly while rendering the list of components displaying the track. This should ideally be the trackId or peerId-trackType, where track type is video or screen.\n- [Angular] Not using the trackBy field properly while rendering the list of components displaying the track. This should ideally be the trackId or peerId-trackType, where track type is video or screen."
            },
            {
                title: 'Why is the video not auto-playing on page load?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#why-is-the-video-not-auto-playing-on-page-load-119',
                link: '/docs/javascript/v2/foundation/faq#why-is-the-video-not-auto-playing-on-page-load',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    'For the video to auto-play please make sure these fields are set on the video element - auto-play, muted, playsinline. Please check the docs for render video for more details.'
            },
            {
                title: '(Angular) Why is video not auto-playing even though muted is set as true?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#angular-why-is-video-not-auto-playing-even-though-muted-is-set-as-true-120',
                link: '/docs/javascript/v2/foundation/faq#angular-why-is-video-not-auto-playing-even-though-muted-is-set-as-true',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    'Angular 2+ is sometimes not able to translate the muted field correctly. Instead of setting the muted and auto-play property as <video muted> doing <video [muted]="true"> should work. Please check this Stack Overflow answer for more details.'
            },
            {
                title: 'How do I debug no audio coming in the room?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-do-i-debug-no-audio-coming-in-the-room-121',
                link: '/docs/javascript/v2/foundation/faq#how-do-i-debug-no-audio-coming-in-the-room',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    "Check that the role is being subscribed to properly in dashboard's templates section.\nIf your web-app doesn't require a user click to join the room, you might run into auto-play issues. Browsers don't allow a website to play audio if user hasn't interacted with the page till that point in time. Fortunately, we have inbuilt support to detect and resolve this given in more details here.\nIf you're using the setVolume API, it's possible that even though the audio is available it has been locally muted."
            },
            {
                title: 'Is it possible to do RTMP out, live stream a room to YouTube, Twitch, Wowza?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-it-possible-to-do-rtmp-out-live-stream-a-room-to-youtube-twitch-wowza-122',
                link: '/docs/javascript/v2/foundation/faq#is-it-possible-to-do-rtmp-out-live-stream-a-room-to-youtube-twitch-wowza',
                platformName: 'JavaScript',
                keywords: [],
                content: 'Yes, you can achieve it both from server-side APIs or SDK.'
            },
            {
                title: 'What should I do to hide the beam tile showing up in 100ms web-app for browser based recording/streaming?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#what-should-i-do-to-hide-the-beam-tile-showing-up-in-100ms-web-app-for-browser-based-recordingstreaming-123',
                link: '/docs/javascript/v2/foundation/faq#what-should-i-do-to-hide-the-beam-tile-showing-up-in-100ms-web-app-for-browser-based-recordingstreaming',
                platformName: 'JavaScript',
                keywords: [],
                content: "You can use a viewer role which doesn't have any publish permissions."
            },
            {
                title: 'How do I make the beam bot join with a custom role for dashboard web-app?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-do-i-make-the-beam-bot-join-with-a-custom-role-for-dashboard-web-app-124',
                link: '/docs/javascript/v2/foundation/faq#how-do-i-make-the-beam-bot-join-with-a-custom-role-for-dashboard-web-app',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    'You can append a query param in the end of the URL for the custom role - <custom_role_url>?skip_preview=true. This will tell the web-app to skip preview screen and join directly.'
            },
            {
                title: 'Why does YouTube dashboard shows that the video bitrate is less than the recommended bitrate when using RTMP Out?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#why-does-youtube-dashboard-shows-that-the-video-bitrate-is-less-than-the-recommended-bitrate-when-using-rtmp-out-125',
                link: '/docs/javascript/v2/foundation/faq#why-does-youtube-dashboard-shows-that-the-video-bitrate-is-less-than-the-recommended-bitrate-when-using-rtmp-out',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    'You can safely ignore this, this will happen if there is no activity happening on the URL being streamed. For example, there is nobody in the room with their video turned on.'
            },
            {
                title: 'Can I get HLS out for a room?',
                objectID: '/docs/javascript/v2/foundation/faq#can-i-get-hls-out-for-a-room-126',
                link: '/docs/javascript/v2/foundation/faq#can-i-get-hls-out-for-a-room',
                platformName: 'JavaScript',
                keywords: [],
                content: "Not yet, but we're working on this."
            },
            {
                title: 'How do I join an API created room from dashboard web-app?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-do-i-join-an-api-created-room-from-dashboard-web-app-127',
                link: '/docs/javascript/v2/foundation/faq#how-do-i-join-an-api-created-room-from-dashboard-web-app',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    "You won't see the join room button on the dashboard, but it's possible to form an URL which you can use. The format is https://<subdomain>.app.100ms.live/preview/<room_id>/<role>, For example https://myroomlink.app.100ms.live/preview/123456/teacher. All of these, the subdomain, room_id and role are available on the dashboard."
            },
            {
                title: 'Do I need to do anything to handle poor internet connection?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#do-i-need-to-do-anything-to-handle-poor-internet-connection-128',
                link: '/docs/javascript/v2/foundation/faq#do-i-need-to-do-anything-to-handle-poor-internet-connection',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    'Not much, just turn on a flag in dashboard, and show a proper UI when a video gets degraded/unsubscribed. More details here.'
            },
            {
                title: 'Can I store extra information with a peer?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-i-store-extra-information-with-a-peer-129',
                link: '/docs/javascript/v2/foundation/faq#can-i-store-extra-information-with-a-peer',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    'Yes you can store peer metadata for a peer. The initial value can be provided at the time of join, and can be modified post join.'
            },
            {
                title: 'How do I implement Raise Hand?',
                objectID: '/docs/javascript/v2/foundation/faq#how-do-i-implement-raise-hand-130',
                link: '/docs/javascript/v2/foundation/faq#how-do-i-implement-raise-hand',
                platformName: 'JavaScript',
                keywords: [],
                content: 'You can do using peer metadata.'
            },
            {
                title: 'Why do I see videos getting stuck or frozen?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#why-do-i-see-videos-getting-stuck-or-frozen-131',
                link: '/docs/javascript/v2/foundation/faq#why-do-i-see-videos-getting-stuck-or-frozen',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    'If you have enabled subscribe degradation from the dashboard, the SDK might go in the degradation mode on poor internet connection turning off some videos to ensure good call quality. When this is done, a flag on the track will be turned on to let the UI know. The UI should treat it similar to the track turning off for purpose of displaying avatar etc. More details here.'
            },
            {
                title: 'Do you have UI components?',
                objectID: '/docs/javascript/v2/foundation/faq#do-you-have-ui-components-132',
                link: '/docs/javascript/v2/foundation/faq#do-you-have-ui-components',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    "Not yet, but it's work in progress for react. Do let us know on discord if you want to sign up for beta and we'll hit you up soon."
            },
            {
                title: 'Can I use the SDK with NextJS, Angular, Svelte, VueJS etc.?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-i-use-the-sdk-with-nextjs-angular-svelte-vuejs-etc-133',
                link: '/docs/javascript/v2/foundation/faq#can-i-use-the-sdk-with-nextjs-angular-svelte-vuejs-etc',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    "Yes, the core SDK is framework agnostic, you can follow the JS Quickstart to learn the basics. The quickstart guide is with vanilla JS and doesn't assume any framework."
            },
            {
                title: 'I want to suggest a new feature.',
                objectID: '/docs/javascript/v2/foundation/faq#i-want-to-suggest-a-new-feature-134',
                link: '/docs/javascript/v2/foundation/faq#i-want-to-suggest-a-new-feature',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    "Awesome, we're always on the lookout for new ideas and feature. Please reach out to us over discord."
            },
            {
                title: "I'm facing an issue, how do I reach out?",
                objectID:
                    '/docs/javascript/v2/foundation/faq#im-facing-an-issue-how-do-i-reach-out-135',
                link: '/docs/javascript/v2/foundation/faq#im-facing-an-issue-how-do-i-reach-out',
                platformName: 'JavaScript',
                keywords: [],
                content: 'Please see reaching out.'
            },
            {
                title: 'Can I create room using API?',
                objectID: '/docs/javascript/v2/foundation/faq#can-i-create-room-using-api-136',
                link: '/docs/javascript/v2/foundation/faq#can-i-create-room-using-api',
                platformName: 'JavaScript',
                keywords: [],
                content: 'Yes.'
            },
            {
                title: 'Can I disable a room?',
                objectID: '/docs/javascript/v2/foundation/faq#can-i-disable-a-room-137',
                link: '/docs/javascript/v2/foundation/faq#can-i-disable-a-room',
                platformName: 'JavaScript',
                keywords: [],
                content: 'Yes. You can also do this while ending the room using the SDK.'
            },
            {
                title: 'Is it possible to create and manage roles using APIs?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#is-it-possible-to-create-and-manage-roles-using-apis-138',
                link: '/docs/javascript/v2/foundation/faq#is-it-possible-to-create-and-manage-roles-using-apis',
                platformName: 'JavaScript',
                keywords: [],
                content: 'Yes.'
            },
            {
                title: 'Does the SDK remembers input/output device selection for future joins?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#does-the-sdk-remembers-inputoutput-device-selection-for-future-joins-139',
                link: '/docs/javascript/v2/foundation/faq#does-the-sdk-remembers-inputoutput-device-selection-for-future-joins',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    'Yes, just make sure you pass the rememberDeviceSelection as true in the join config.'
            },
            {
                title: 'Can I implement custom events to broadcast or sent to a specific person in the room?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-i-implement-custom-events-to-broadcast-or-sent-to-a-specific-person-in-the-room-140',
                link: '/docs/javascript/v2/foundation/faq#can-i-implement-custom-events-to-broadcast-or-sent-to-a-specific-person-in-the-room',
                platformName: 'JavaScript',
                keywords: [],
                content: 'Yes, you can do so using our messaging system.'
            },
            {
                title: 'How can I access the user id field used while creating the token after joining?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-can-i-access-the-user-id-field-used-while-creating-the-token-after-joining-141',
                link: '/docs/javascript/v2/foundation/faq#how-can-i-access-the-user-id-field-used-while-creating-the-token-after-joining',
                platformName: 'JavaScript',
                keywords: [],
                content: 'It will be available as peer.customerUserId for any peer in the room.'
            },
            {
                title: 'How can I implement break out rooms?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-can-i-implement-break-out-rooms-142',
                link: '/docs/javascript/v2/foundation/faq#how-can-i-implement-break-out-rooms',
                platformName: 'JavaScript',
                keywords: [],
                content: 'This can be done using roles.'
            },
            {
                title: 'Can I locally mute a remote audio track?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-i-locally-mute-a-remote-audio-track-143',
                link: '/docs/javascript/v2/foundation/faq#can-i-locally-mute-a-remote-audio-track',
                platformName: 'JavaScript',
                keywords: [],
                content: 'Yes.'
            },
            {
                title: 'Can I process video before sending over to others in the room?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#can-i-process-video-before-sending-over-to-others-in-the-room-144',
                link: '/docs/javascript/v2/foundation/faq#can-i-process-video-before-sending-over-to-others-in-the-room',
                platformName: 'JavaScript',
                keywords: [],
                content: 'Yes, you can write custom video plugins.'
            },
            {
                title: "How to disable console logs if I'm using the web SDK?",
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-to-disable-console-logs-if-im-using-the-web-sdk-145',
                link: '/docs/javascript/v2/foundation/faq#how-to-disable-console-logs-if-im-using-the-web-sdk',
                platformName: 'JavaScript',
                keywords: [],
                content: 'Please follow setting log level.'
            },
            {
                title: 'What is the maximum allowed duration for a session?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#what-is-the-maximum-allowed-duration-for-a-session-146',
                link: '/docs/javascript/v2/foundation/faq#what-is-the-maximum-allowed-duration-for-a-session',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    'The maximum allowed duration for a session on the 100ms platform is 12 hours.'
            },
            {
                title: 'How can I get the HLS URL to enable live stream playback?',
                objectID:
                    '/docs/javascript/v2/foundation/faq#how-can-i-get-the-hls-url-to-enable-live-stream-playback-147',
                link: '/docs/javascript/v2/foundation/faq#how-can-i-get-the-hls-url-to-enable-live-stream-playback',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    'You can get the HLS URL in several ways based on whether you use 100ms client SDKs or a custom integration for playback; please check the HLS guide for more information.'
            },
            {
                title: "I get type errors related to WebRTC Stats, for example, 'Cannot find name RTCInboundRtpStreamStats'.",
                objectID:
                    '/docs/javascript/v2/foundation/faq#i-get-type-errors-related-to-webrtc-stats-for-example-cannot-find-name-rtcinboundrtpstreamstats-148',
                link: '/docs/javascript/v2/foundation/faq#i-get-type-errors-related-to-webrtc-stats-for-example-cannot-find-name-rtcinboundrtpstreamstats',
                platformName: 'JavaScript',
                keywords: [],
                content:
                    "The minimum supported version of TypeScript for the SDK is '4.4'. You could update to any version above 4.4 or if you are on an old version of TypeScript and cannot do a major upgrade you can set skipLibCheck: true in your tsconfig file."
            },
            {
                title: 'Could not invoke HMSSDK.build',
                objectID: '/docs/react-native/v2/foundation/faq#could-not-invoke-hmssdkbuild-149',
                link: '/docs/react-native/v2/foundation/faq#could-not-invoke-hmssdkbuild',
                platformName: 'React Native',
                keywords: [],
                content:
                    "This error generally appears in development mode due to hot reloading. When the peer has joined the room and then the app is hot reloaded from the terminal, the peer is still in the room and when he tries to join back this error occurs. To make sure this error does not occur you have to remove your peer from the room.\n\nTo avoid you can add instance.leave() function on the unmounting of the Home Screen, so whenever the app is hot reloaded which leads to unmounting of the Home screen the leave function is called.\n\nconst onLeavePress = async () => {\n    await instance\n        ?.leave()\n        .then((d) => console.log('Leave Success: ', d))\n        .catch((e) => console.log('Leave Error: ', e));\n};\n\nuseEffect(() => {\n    return () => {\n        onLeavePress();\n    };\n}, []);\nIf this error occurred you can either join through web app and remove the peer which is still present due to hot reloading or you can kill the app and rebuild it."
            },
            {
                title: '"trackId" is undefined (HMSView is rendering blank view)',
                objectID:
                    '/docs/react-native/v2/foundation/faq#trackid-is-undefined-hmsview-is-rendering-blank-view-150',
                link: '/docs/react-native/v2/foundation/faq#trackid-is-undefined-hmsview-is-rendering-blank-view',
                platformName: 'React Native',
                keywords: [],
                content:
                    'Peer objects can have undefined trackId. If you are trying to use trackId directly from Peer object, then you might endup with undefined trackId problem.\n\nWe recommend using ON_TRACK_UPDATE event for listening to track updates. When you receive TRACK_ADDED update type on this event, you can save received track and peer objects.\n\nThen you can use trackId from track object to show video in HMSView. This way your trackId will never be undefined.\n\nNote: ON_TRACK_UPDATE event is emitted for both "Audio" and "Video" tracks. For rendering video usecase, you only need to consider events received for "Video" tracks.\n\nSome Useful links:\n\nRender Video of Peer\nHMSTrackUpdate Event Listener'
            },
            {
                title: 'Unable to Join Meeting or getting error on join / preview functions of HMS Instance',
                objectID:
                    '/docs/react-native/v2/foundation/faq#unable-to-join-meeting-or-getting-error-on-join-preview-functions-of-hms-instance-151',
                link: '/docs/react-native/v2/foundation/faq#unable-to-join-meeting-or-getting-error-on-join-preview-functions-of-hms-instance',
                platformName: 'React Native',
                keywords: [],
                content:
                    "This problem can happen due to many reasons. To self-serve, We recommend you to check if:\n\nyou are using correct authToken and username.\n\nauthToken must contain correct roomId and role. role should be lowercase.\n\nAlso check out Auth Token and Security Guide.\n\nyou are calling static build function on HMSSDK class correctly. Do not create an instance of HMSSDK class yourself with new keyword.\n\nbuild function returns instance of HMSSDK class and also sets up SDK on native side.\n\n\nimport { HMSSDK } from '@100mslive/react-native-hms';\n\nconst hmsInstance = await HMSSDK.build();\nAlso check out Join Room Guide\n\nMeeting Joining link is not disabled"
            },
            {
                title: 'Run the Example app',
                objectID: '/docs/react-native/v2/foundation/faq#run-the-example-app-152',
                link: '/docs/react-native/v2/foundation/faq#run-the-example-app',
                platformName: 'React Native',
                keywords: [],
                content:
                    'To run the Example app on your system, follow these steps -\n\nClone 100ms React Native Package repository\n\nIn the project root, run npm install\n\nGo to the example folder, cd example\n\nIn the example folder, run npm install\n\nTo run on Android, run npx react-native run-android\n\nYou can run example app on Android Emulator using "deviceId" option, run npx react-native run-android --deviceId <device_id_here>\n\nTo run on iOS -\na. First run Pod Install in iOS folder, cd ios && pod install && cd ../\n\nb. Set the Correct Development Team in Signing & Capabilities in Xcode Build Settings to run on an actual iPhone or iPad. Apple Development Team Signing is not required for running the app on Simulators.\n\nc. Run the command npx react-native run-ios\n\nYou can run example app on iOS Simulator using "simulator" option, run npx react-native run-ios --simulator <simulator_name_here>.'
            },
            {
                title: 'UI components to test all the features and functionalities',
                objectID:
                    '/docs/react-native/v2/foundation/faq#ui-components-to-test-all-the-features-and-functionalities-153',
                link: '/docs/react-native/v2/foundation/faq#ui-components-to-test-all-the-features-and-functionalities',
                platformName: 'React Native',
                keywords: [],
                content:
                    '100ms React Native package does not provide UI components except HMSView. However, We have created UI for testing all features of React Native SDK in our example app and sample apps.\n\nYou can use UI from these apps to quickly test features and experiment in your apps.'
            },
            {
                title: 'Customize Track Settings',
                objectID: '/docs/react-native/v2/foundation/faq#customize-track-settings-154',
                link: '/docs/react-native/v2/foundation/faq#customize-track-settings',
                platformName: 'React Native',
                keywords: [],
                content:
                    'You can customize Video and Audio track settings of Local Peer with HMSTrackSettings, HMSVideoTrackSettings and HMSAudioTrackSettings classes.\n\nwhile setting up HMSSDK instance you can pass instance of HMSTrackSettings to build function available on HMSSDK class.\n\nRefer to Track Settings Guide for more info.\n'
            },
            {
                title: 'To customize more settings (other than defined on above mentioned classes) like video quality, aspect ratio, screenshare quality.',
                objectID:
                    '/docs/react-native/v2/foundation/faq#to-customize-more-settings-other-than-defined-on-above-mentioned-classes-like-video-quality-aspect-ratio-screenshare-quality-155',
                link: '/docs/react-native/v2/foundation/faq#to-customize-more-settings-other-than-defined-on-above-mentioned-classes-like-video-quality-aspect-ratio-screenshare-quality',
                platformName: 'React Native',
                keywords: [],
                content:
                    'You can change all these and more in 100ms dashboard. Check out Templates and Roles Guide'
            },
            {
                title: 'BLUETOOTH_CONNECT permission error/warning',
                objectID:
                    '/docs/react-native/v2/foundation/faq#bluetooth_connect-permission-errorwarning-156',
                link: '/docs/react-native/v2/foundation/faq#bluetooth_connect-permission-errorwarning',
                platformName: 'React Native',
                keywords: [],
                content:
                    'On Android 12 devices, new Bluetooth permissions have been added to interact with other nearby Bluetooth devices. To fix this error -\n\nDeclare BLUETOOTH_CONNECT permission in AndroidManifest.xml file.\n\n<uses-permission android:name="android.permission.BLUETOOTH" android:maxSdkVersion="30" />\n\n<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />\n\n<uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />\n\n<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />\nThe BLUETOOTH_CONNECT permission is runtime permission. Therefore, you must also request user approval at runtime before you join a call or display a preview in your app, like we do for Camera and Audio Permissions.\nWe suggest using react-native-permission to acquire permissions from both platforms.\n\nCheck out official Android Bluetooth Permissions page.\n\nYou can also check Our Android Integration Guide and permission related code in our Quickstart Sample App\n'
            },
            {
                title: 'Using HMS with another WebRTC library',
                objectID:
                    '/docs/react-native/v2/foundation/faq#using-hms-with-another-webrtc-library-157',
                link: '/docs/react-native/v2/foundation/faq#using-hms-with-another-webrtc-library',
                platformName: 'React Native',
                keywords: [],
                content:
                    "WebRTC is a core dependency of 100ms SDKs. While building your Real Time Audio Video apps, developers tend to utilize multiple libraries. So it can happen that some another package also has WebRTC as a dependency. In this scenario, your app might emit compile time errors, crash at run time or have unexpected behaviours. This usually happens due to multiple WebRTC instances within the app. To avoid these issues, it's recommended to only add 100ms package & remove any other packages that also depend on WebRTC. 100ms provides a rich set of features which you can easily customize to build your ideal Audio Video experiences.\n\n"
            },
            {
                title: 'Expo Support',
                objectID: '/docs/react-native/v2/foundation/faq#expo-support-158',
                link: '/docs/react-native/v2/foundation/faq#expo-support',
                platformName: 'React Native',
                keywords: [],
                content:
                    'Yes, Expo is supported by 100ms React Native SDK. You can follow our Expo Setup Guide to complete your setup.'
            },
            {
                title: 'Change Streaming Video Aspect Ratio',
                objectID:
                    '/docs/react-native/v2/foundation/faq#change-streaming-video-aspect-ratio-159',
                link: '/docs/react-native/v2/foundation/faq#change-streaming-video-aspect-ratio',
                platformName: 'React Native',
                keywords: [],
                content:
                    'Default Aspect Ratio of Streaming Video is 16:9. This can show many Peer Tiles in your streaming video.\n\nYou can change Aspect Ratio of Streaming video from -\n\n100ms Dashboard > Templates > Select a Template > Destinations tab > scroll down to Live Streaming > "Customize stream video output"\n\nYou may want to change default ratio as per your use case. for example, If you have only one Tile in your stream video, then you can make video aspect ratio as same as Peer Tile acpect ratio.\n\nThis will give your Stream Viewers very nice watching experience.\n\n'
            },
            {
                title: 'How to get HLS Stream URL?',
                objectID: '/docs/react-native/v2/foundation/faq#how-to-get-hls-stream-url-160',
                link: '/docs/react-native/v2/foundation/faq#how-to-get-hls-stream-url',
                platformName: 'React Native',
                keywords: [],
                content:
                    "HLS Stream URL is available in Room object. Check out below code snippet -\n\n\n// you can check if hls stream is running\nconst isStreaming = room.hlsStreamingState?.running;\n\n// you can access various variants of running hls stream\nconst hlsStreamingVariant = room.hlsStreamingState?.variants[0];\n\n// on stream variant, you have access to stream url\nconst sreamURL = hlsStreamingVariant.hlsStreamUrl;\n\n// Showing running stream in a video player\n<VideoPlayer url={hlsStreamingVariant.hlsStreamUrl} />;\nYou can get Room object by hmsInstance.getRoom method and HMSUpdateListenerActions.ON_ROOM_UPDATE event -\n\n\n// Initially get room object from `getRoom` method\nconst room = await hmsInstance.getRoom();\n\n// Add listener to receive Room Updates\nhmsInstance.addEventListener(\n    HMSUpdateListenerActions.ON_ROOM_UPDATE,\n    (data: { room: HMSRoom, type: HMSRoomUpdate }) => {\n        // Updated Room object\n        const room = data.room;\n\n        if (data.type === HMSRoomUpdate.HLS_STREAMING_STATE_UPDATED) {\n            console.log('HLS Streaming state has changed');\n        }\n    }\n);\nTo know how to start or stop HLS Streaming, check out HLS Streaming Docs\n\n"
            },
            {
                title: 'Video Player to play HLS Streams',
                objectID:
                    '/docs/react-native/v2/foundation/faq#video-player-to-play-hls-streams-161',
                link: '/docs/react-native/v2/foundation/faq#video-player-to-play-hls-streams',
                platformName: 'React Native',
                keywords: [],
                content:
                    'react-native-video is the most reliable package to play videos on React Native apps. We are also using this package in our example app to play HLS Streams.'
            },
            {
                title: 'How to Mute/Unmute Specific or All Remote Peers?',
                objectID:
                    '/docs/react-native/v2/foundation/faq#how-to-muteunmute-specific-or-all-remote-peers-162',
                link: '/docs/react-native/v2/foundation/faq#how-to-muteunmute-specific-or-all-remote-peers',
                platformName: 'React Native',
                keywords: [],
                content:
                    '100ms have changeTrackState APIs to request mute or unmute remote peers.\n\nRefer to Change Track State API docs to learn more.\n\nTo Mute all Remote Peers at once, you can refer here.'
            },
            {
                title: 'How to Mute/Unmute Specific or All Remote Peers only locally?\n',
                objectID:
                    '/docs/react-native/v2/foundation/faq#how-to-muteunmute-specific-or-all-remote-peers-only-locally-163',
                link: '/docs/react-native/v2/foundation/faq#how-to-muteunmute-specific-or-all-remote-peers-only-locally',
                platformName: 'React Native',
                keywords: [],
                content:
                    'When you mute audio or video of remote peer locally, you won\'t be able to hear or see the remote peer but it will be still audible and visible to others.\n\n100ms have "Playback Allowed" APIs to mute or unmute remote peers locally.\n\nRefer to Playback Allowed API docs to learn more.\n\nTo locally mute all Remote Peers at once, you can refer here.'
            },
            {
                title: 'Restrict Remote Peer from Speaking after their Audio is Muted',
                objectID:
                    '/docs/react-native/v2/foundation/faq#restrict-remote-peer-from-speaking-after-their-audio-is-muted-164',
                link: '/docs/react-native/v2/foundation/faq#restrict-remote-peer-from-speaking-after-their-audio-is-muted',
                platformName: 'React Native',
                keywords: [],
                content:
                    'Once you Mute a Peer, they can unmute themselves. To prevent peers from un-muting themselves, you should Change their Role to a Role which has less publishing permissions as per your use case instead of muting the peer.'
            },
            {
                title: 'Enable PIP Mode automatically when user leaves app',
                objectID:
                    '/docs/react-native/v2/foundation/faq#enable-pip-mode-automatically-when-user-leaves-app-165',
                link: '/docs/react-native/v2/foundation/faq#enable-pip-mode-automatically-when-user-leaves-app',
                platformName: 'React Native',
                keywords: [],
                content:
                    'Currently, Enabling Picture in Picture (PIP) mode automatically (that is without calling any function) is not supported.\n\nWe recommend enabling Picture in Picture (PIP) mode (by calling enablePipMode function) while app is active, on a button click or programmatically.'
            },
            {
                title: 'Enable PIP Mode in iOS device.',
                objectID: '/docs/react-native/v2/foundation/faq#enable-pip-mode-in-ios-device-166',
                link: '/docs/react-native/v2/foundation/faq#enable-pip-mode-in-ios-device',
                platformName: 'React Native',
                keywords: [],
                content:
                    'Picture in Picture (PIP) mode is not supported in iOS devices due to lack of permission of using multitasking-camera-access entitlement.\n\nWe are working on making this work. Thanks for your patience.'
            },
            {
                title: 'Using HMSSDK Instance in nested components without passing as props',
                objectID:
                    '/docs/react-native/v2/foundation/faq#using-hmssdk-instance-in-nested-components-without-passing-as-props-167',
                link: '/docs/react-native/v2/foundation/faq#using-hmssdk-instance-in-nested-components-without-passing-as-props',
                platformName: 'React Native',
                keywords: [],
                content:
                    "Don't call HMSSDK.build function just to get the hmsInstance in nested components without prop drilling to use various APIs.\n\nHMSSDK.build creates and returns new instances of SDK each time you call it. It is not returning the previously created SDK instance.\n\nWe recommend using State Management solutions like Redux or Context API to save your originally created hmsInstance into store and use this stored instance in your nested components."
            },
            {
                title: 'How many HMSView can be rendered?',
                objectID:
                    '/docs/react-native/v2/foundation/faq#how-many-hmsview-can-be-rendered-168',
                link: '/docs/react-native/v2/foundation/faq#how-many-hmsview-can-be-rendered',
                platformName: 'React Native',
                keywords: [],
                content:
                    "We recommend rendering separate HMSView for each trackId. It means If you have 50 peers with trackIds in a room, then you will render 50 HMSView for each peer.\n\nThis can have an impact on your apps' performance. Therefore, since ideally maximum 4-6 HMSView should be visible at a time because of small screen size of mobile devices.\n\nYou can use FlatList to render HMSView for large list of peers, this way HMSView that are not in visible area will never be mounted and HMSViews that goes out of visible area will be unmounted.\n\nBy using FlatList you are improving your apps' performance and rendering separate HMSView for each trackId.\n\nPro Tip: You can use key prop with trackId as value to bind HMSView with trackId. Example - <HMSView key={trackId} {...} />\n"
            },
            {
                title: 'Flutter version compatibility',
                objectID: '/docs/flutter/v2/foundation/faq#flutter-version-compatibility-169',
                link: '/docs/flutter/v2/foundation/faq#flutter-version-compatibility',
                platformName: 'Flutter',
                keywords: [],
                content: 'HMSSDK works with flutter 3.3.x or above.\n\n'
            },
            {
                title: 'Not getting event updates after hot reload/restart',
                objectID:
                    '/docs/flutter/v2/foundation/faq#not-getting-event-updates-after-hot-reloadrestart-170',
                link: '/docs/flutter/v2/foundation/faq#not-getting-event-updates-after-hot-reloadrestart',
                platformName: 'Flutter',
                keywords: [],
                content:
                    "This is caused because the platform channel needs to be reinitialized again, hence this is intended behaviour. The solution for this is to re-run the app.\n\nPractices for faster development :\n\nPerform the intended changes.\nLeave the room.\nPerform hot reload/restart and rejoin the room.\nVerify the changes.\nThe permanent solution for this is in pipeline, we will update once it's done.\n"
            },
            {
                title: 'Issues while using hmssdk_flutter with flutter 3.0.x',
                objectID:
                    '/docs/flutter/v2/foundation/faq#issues-while-using-hmssdk_flutter-with-flutter-30x-171',
                link: '/docs/flutter/v2/foundation/faq#issues-while-using-hmssdk_flutter-with-flutter-30x',
                platformName: 'Flutter',
                keywords: [],
                content:
                    'Flutter versions 3.0.0 to 3.0.5 had issues related to Platform View.\n\nRefer: Android Platform View issue & Flutter Platform View bug\n\nThese were resolved in Flutter versions 3.3.0 & above. Please update the Flutter version to 3.3.0 or above.\n'
            },
            {
                title: 'Is there any limit to the number of HMSVideoView on-screen at a time\n',
                objectID:
                    '/docs/flutter/v2/foundation/faq#is-there-any-limit-to-the-number-of-hmsvideoview-on-screen-at-a-time-172',
                link: '/docs/flutter/v2/foundation/faq#is-there-any-limit-to-the-number-of-hmsvideoview-on-screen-at-a-time',
                platformName: 'Flutter',
                keywords: [],
                content:
                    'HMSVideoView internally uses SurfaceView in android and UiKitView in iOS. It is recommended to render at most 3 to 4 videos on a Single page/screen of the app and rest should be paginated for optimum performance.\n'
            },
            {
                title: 'Do you have any implementation with popular State Management libraries -',
                objectID:
                    '/docs/flutter/v2/foundation/faq#do-you-have-any-implementation-with-popular-state-management-libraries-173',
                link: '/docs/flutter/v2/foundation/faq#do-you-have-any-implementation-with-popular-state-management-libraries',
                platformName: 'Flutter',
                keywords: [],
                content:
                    'Please find the implementations below:\n\nProvider\nBloc\nGetx\nMobx\nRiverpod'
            },
            {
                title: 'Not able to get room updates after joining the room',
                objectID:
                    '/docs/flutter/v2/foundation/faq#not-able-to-get-room-updates-after-joining-the-room-174',
                link: '/docs/flutter/v2/foundation/faq#not-able-to-get-room-updates-after-joining-the-room',
                platformName: 'Flutter',
                keywords: [],
                content:
                    'To listen to the room updates please attach HMSUpdateListener as:\n\n\nclass Meeting implements HMSUpdateListener {\n    Meeting(){\n        hmsSDK.addUpdateListener(updateListener);\n    }\n    ...\n}\nYou can find more details about HMSUpdateListener here\n'
            },
            {
                title: 'Join Room with Muted Audio/Video',
                objectID: '/docs/flutter/v2/foundation/faq#join-room-with-muted-audiovideo-175',
                link: '/docs/flutter/v2/foundation/faq#join-room-with-muted-audiovideo',
                platformName: 'Flutter',
                keywords: [],
                content:
                    'User can join the room with muted audio/video by default. Please find the docs here.\n'
            },
            {
                title: 'Get onPeerUpdate in preview',
                objectID: '/docs/flutter/v2/foundation/faq#get-onpeerupdate-in-preview-176',
                link: '/docs/flutter/v2/foundation/faq#get-onpeerupdate-in-preview',
                platformName: 'Flutter',
                keywords: [],
                content: 'User can get onPeerUpdate in preview the docs can be found here\n'
            },
            {
                title: 'Getting updates multiple times in the room',
                objectID:
                    '/docs/flutter/v2/foundation/faq#getting-updates-multiple-times-in-the-room-177',
                link: '/docs/flutter/v2/foundation/faq#getting-updates-multiple-times-in-the-room',
                platformName: 'Flutter',
                keywords: [],
                content:
                    'Please ensure removing the HMSUpdateListener while leaving the room.\n\n\nhmsSDK.removeUpdateListener(updateListener);\nYou can find more details about HMSUpdateListener here'
            },
            {
                title: 'Can I create a room using API?',
                objectID: '/docs/flutter/v2/foundation/faq#can-i-create-a-room-using-api-178',
                link: '/docs/flutter/v2/foundation/faq#can-i-create-a-room-using-api',
                platformName: 'Flutter',
                keywords: [],
                content: 'Yes,please find the link here'
            },
            {
                title: 'Receiving too many logs from SDK',
                objectID: '/docs/flutter/v2/foundation/faq#receiving-too-many-logs-from-sdk-179',
                link: '/docs/flutter/v2/foundation/faq#receiving-too-many-logs-from-sdk',
                platformName: 'Flutter',
                keywords: [],
                content:
                    'Logs can be turned OFF using the hmsLogSettings parameter of HMSSDK. More info about this can be found here'
            },
            {
                title: 'Do I need to do anything to handle poor internet connection?',
                objectID:
                    '/docs/flutter/v2/foundation/faq#do-i-need-to-do-anything-to-handle-poor-internet-connection-180',
                link: '/docs/flutter/v2/foundation/faq#do-i-need-to-do-anything-to-handle-poor-internet-connection',
                platformName: 'Flutter',
                keywords: [],
                content:
                    'Not much, just turn on a flag in dashboard, and show a proper UI when a video gets degraded/unsubscribed. More details here.'
            },
            {
                title: 'How do I implement Raise Hand, polls in application ?',
                objectID:
                    '/docs/flutter/v2/foundation/faq#how-do-i-implement-raise-hand-polls-in-application-181',
                link: '/docs/flutter/v2/foundation/faq#how-do-i-implement-raise-hand-polls-in-application',
                platformName: 'Flutter',
                keywords: [],
                content: 'You can do using peer metadata.'
            },
            {
                title: 'Why do I see videos getting stuck or frozen?',
                objectID:
                    '/docs/flutter/v2/foundation/faq#why-do-i-see-videos-getting-stuck-or-frozen-182',
                link: '/docs/flutter/v2/foundation/faq#why-do-i-see-videos-getting-stuck-or-frozen',
                platformName: 'Flutter',
                keywords: [],
                content:
                    'If you have enabled subscribe degradation from the dashboard, the SDK might go in the degradation mode on poor internet connection turning off some videos to ensure good call quality. When this is done, a flag on the track will be turned on to let the UI know. The UI should treat it similar to the track turning off for purpose of displaying avatar etc. More details here.'
            },
            {
                title: 'What is the maximum allowed duration for a session?',
                objectID:
                    '/docs/flutter/v2/foundation/faq#what-is-the-maximum-allowed-duration-for-a-session-183',
                link: '/docs/flutter/v2/foundation/faq#what-is-the-maximum-allowed-duration-for-a-session',
                platformName: 'Flutter',
                keywords: [],
                content:
                    'The maximum allowed duration for a session on the 100ms platform is 12 hours.'
            },
            {
                title: 'I want to suggest a new feature.',
                objectID: '/docs/flutter/v2/foundation/faq#i-want-to-suggest-a-new-feature-184',
                link: '/docs/flutter/v2/foundation/faq#i-want-to-suggest-a-new-feature',
                platformName: 'Flutter',
                keywords: [],
                content:
                    "Awesome, we're always looking out for new ideas and features. Please reach out to us over discord"
            }
        ];

        const contentAlias = cacheContentAlias(contentPath);
        createRecords(
            [docsPath],
            records,
            basePath,
            getRecordObject,
            contentAlias,
            pushRecursively,
            getSectionContent
        );

        // console.log(records.length, 'records created');

        const client = algoliasearch(appId, adminKey);
        const index = client.initIndex(algoliaIndex);
        try {
            await index.replaceAllObjects(records);
        } catch (err) {
            console.log(error);
        }

        console.log('Records updated in Algolia');
        return true;
    }
    return false;
}

module.exports = { updateIndex };
