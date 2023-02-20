import { Categories } from '@/components/Category';

const categories: { text: Categories; textSmall?: string; icon: string }[] = [
    {
        text: 'All Categories',
        textSmall: 'All',
        icon: 'PlaylistIcon'
    },
    {
        text: 'Quickstarts',
        icon: 'PlayCircleIcon'
    },
    {
        text: 'Apps',
        icon: 'AllAppsIcon'
    },
    {
        text: 'Features',
        icon: 'WrenchIcon'
    },
    {
        text: 'Plugins',
        icon: 'RocketIcon'
    },
    {
        text: 'Extras',
        icon: 'BoxIcon'
    }
];

export default categories;
