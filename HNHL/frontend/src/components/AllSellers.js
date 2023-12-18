import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import SingleSeller from './SingleSeller';
import { useState,useEffect} from 'react';

function AllSellers(props){
        const baseUrl='http://127.0.0.1:8000/api';
        const [SellerList,setSellerList]=useState([]);
        const [totalResult,setTotalResults]=useState(0);

        useEffect(() => {
            fetchData(baseUrl+'/vendors');
        },[]);

        function fetchData(baseurl){
            fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setSellerList(data.results);
                setTotalResults(data.count);
            });
        }

        function changeUrl(baseurl){
            fetchData(baseurl);
        }

        var links=[];
        var limit=12;
        var totalLinks=totalResult/limit;
        for(let i=1; i<=totalLinks; i++){
            links.push(<li class="page-item"><Link onClick={()=>changeUrl(baseUrl+`/vendors/?page=${i}`)} to ={`/vendors/?page=${i}`} class="page-link">{i}</Link></li>)
        }

        
        return(
            <section className='container'>
                <h3 className='mb-4'>All Sellers</h3>
                <div className='row mb-4'>
                    {
                    SellerList.map((seller) => <SingleSeller seller={seller}/>)
                    }
                    
                </div>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        {links}
                    </ul>
                </nav>
            </section>  
            )
}
export default AllSellers;