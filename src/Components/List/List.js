import {useState,useEffect} from 'react';// react hooks
import axios from 'axios' // library
import './List.css';
import Card from '../Card/Card';




const List = () => {

  let [data,setData] = useState([])
  let [updatedData,setUpdatedData] = useState([...data]);
  let [inputText,setInputText] = useState("");
    let [loading,setLoading] = useState(true); 
    let [showPage,setShowPage] = useState(15);


    let showMore = ()=>{
      setShowPage(preVal => preVal+15);
  }

  useEffect(()=>{
        
    async function fetchData(){
        let url = 'https://exercisedb.p.rapidapi.com/exercises';
        
        const options1 = { 
            params: {limit: '300'},
            headers: {
                'X-RapidAPI-Key': 'b9350a77aamsh275af636d12bf8bp17e7fbjsn07455251fd67',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        }
        const options2 = { 
            params: {limit: `${showPage}`},
            headers: {
                'X-RapidAPI-Key': '4986fb1656msh3ef2babc5c69ce5p1f9345jsn4373e881a9bb',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        }
        try{
            const response1 = await axios.get(url,options1); 
            const response2 = await axios.get(url,options2); 
            setData(response1.data);
            setUpdatedData(response2.data);
            setLoading(false);
        }catch(error){
            console.log(error);
        }
    }
    fetchData();
},[showPage]);


let searchInput = (e)=>{
  let updatedVal = e.target.value;
  setInputText(e.target.value);
  let updatedList = [...data];
  
  if(updatedVal == ""){
      updatedList = [...data];
      // console.log("manya");
  }else{
      updatedList = updatedList.filter((item)=>{
          return item.bodyPart.toLowerCase().includes(updatedVal.toLowerCase()) || item.name.toLowerCase().includes(updatedVal.toLowerCase()) || item.target.toLowerCase().includes(updatedVal.toLowerCase()) ;
      })
  } 
  setUpdatedData(updatedList);

}


  return (
    <div className='list_container'>
        <div className="list_header_section">
            <h1>Exercise List</h1>
            <input type="search" value={inputText} placeholder='Search by target,body part, or exercise' onChange={searchInput} />
        </div>
        {loading ?<p>Loading...</p>: <div className="list-content-data">
            <div className="list-content">
            {
              updatedData.map((e)=>{
                    return <Card {...e} key={e.id}/>
                })
            }
            </div>
            
            <button onClick={showMore} className='load_btn'>Load More</button>
        </div>}

    </div>
  )
}

export default List
