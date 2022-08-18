import { useEffect, useState } from 'react';

const colours = {
    'all systems operational': '$success',
    'partial system outage': '$warning',
    'major service outage': '$error'
};

function useStatusPage() {
    const [statusPage, setStatusPage] = useState({
        description: 'Loading',
        colour: '$warning'
    });
    useEffect(() => {
        fetch('https://status.100ms.live/api/v2/status.json')
            .then((res) => res.json())
            .then((data) => {
                setStatusPage({
                    description: data.status.description,
                    colour: colours[data.status.description.toLowerCase()]
                });
            });
    }, []);

    return [statusPage];
}

export default useStatusPage;
