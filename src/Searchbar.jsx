import React from 'react'
import {useState, useEffect} from 'react'
function Searchbar() {
    const [problems,setProblems] = useState([]);
    const [query,setQuery] = useState('');
    const [rating,setRating] = useState(800);
    const fetchData = async (val, rate)=>{
        try{
            const response = await fetch('https://codeforces.com/api/problemset.problems');
            const data = await response.json();
            const prob = data.result.problems.filter((problem)=>{
                return(
                    val &&
                    rate &&
                    problem &&
                    problem.tags.includes(val) &&
                    problem.rating == rate
                )
            });
            console.log(prob);
            setProblems(prob);
        }
        catch(error){
            console.error("Error in fetching data: " + error);
        }
    }
    useEffect(()=>{
        if(query,rating){
            fetchData(query,rating);
        }
        else{
            setProblems([]);
        }
    },[query,rating])
    const handleChange = (value)=>{
        setQuery(value);
    }
    const handleRating = (val)=>{
        console.log(val);
        setRating(val);
    }
  return (   
    <>
    <div>
    <input 
    name = "Tags"
    value = {query}
    placeholder='Tags'
    onChange = {(e) => handleChange(e.target.value)}/>
    </div>
    <div>
    <input type="range" min = "800" max = "3000" value={rating} step = "200" onChange = {(e)=>handleRating(e.target.value)}/>
    </div>
    {problems.length > 0 && (
                <ul>
                    {problems.map((problem, index) => (
                        <li key={index}>
                            <a 
                                href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}
                            >
                                {problem.name}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
    </>
  )
}

export default Searchbar