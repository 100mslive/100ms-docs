import { useEffect, useState } from 'react';
import { SearchIcon } from '@100mslive/react-icons';
import { Flex, Text } from '@100mslive/react-ui';

export default function ExampleSearch({ refine, css }) {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const debounceTimer = setTimeout(() => refine(searchTerm), 400);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    return (
        <Flex
            align="center"
            css={{
                color: '$textHighEmp',
                bg: '$surfaceDefault',
                padding: '$4 $6',
                border: '1px solid $borderLighter',
                borderRadius: '$1',
                ...css
            }}
            onClick={(e) => e.stopPropagation()}>
            <SearchIcon style={{ color: 'inherit', height: '24px', width: '24px' }} />
            <Text
                as="input"
                variant="body1"
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
                type="text"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                css={{
                    marginLeft: '16px',
                    backgroundColor: 'inherit',
                    outline: 'none',
                    border: 'none',
                    width: '100%',
                    fontWeight: '$regular'
                }}
            />
        </Flex>
    );
}

function get_bigrams(string) {
    let s = string.toLowerCase();
    let v = s.split('');
    for (let i = 0; i < v.length; i++) {
        v[i] = s.slice(i, i + 2);
    }
    return v;
}

export function string_similarity(str1, str2) {
    if (str1.length > 0 && str2.length > 0) {
        const pairs1 = get_bigrams(str1);
        const pairs2 = get_bigrams(str2);
        const union = pairs1.length + pairs2.length;
        let hits = 0;
        for (let x = 0; x < pairs1.length; x++) {
            for (let y = 0; y < pairs2.length; y++) {
                if (pairs1[x] == pairs2[y]) hits++;
            }
        }
        if (hits > 0) return (2.0 * hits) / union;
    }
    return 0.0;
}
