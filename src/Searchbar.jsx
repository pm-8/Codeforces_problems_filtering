import React, { useState, useEffect } from 'react';

function Searchbar() {
    const [query, setQuery] = useState('');
    const [problems, setProblems] = useState([]);

    const fetchData = async (value) => {
        try {
            const response = await fetch('https://codeforces.com/api/problemset.problems');
            const data = await response.json();
            const prob = data.result.problems.filter((problem) => {
                return (
                    value &&
                    problem &&
                    problem.tags &&
                    problem.tags.includes(value)
                );
            });
            setProblems(prob);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (value) => {
        setQuery(value);
    };

    useEffect(() => {
        if (query) {
            fetchData(query);
        } else {
            setProblems([]);
        }
    }, [query]);

    return (
        <div>
            <input 
                placeholder="Type to search tags..."
                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />
            {problems.length > 0 && (
                <ul>
                    {problems.map((problem, index) => (
                        <li key={index}>
                            <a 
                                href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {problem.name}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Searchbar;
