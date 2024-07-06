import { useState,useEffect } from 'react'
import Searchbar from './Searchbar';
function App() {
  // const [data,setData] = useState([]);
  // useEffect(()=>{
  //   fetch('https://codeforces.com/api/problemset.problems')
  // .then((result)=>{result.json()
  //   .then((res) => {
  //     setData(res);
  //   })
  //   .catch((err)=>{
  //     console.log(`An error has occured: ${err}`);
  //   })
  // })
  // },[])
  

  return (
    <>
      <Searchbar></Searchbar>
    </>
  )
}

export default App
