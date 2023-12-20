////Sprawdzone/////////////////////////////////////////////////////////////////////////////////////////
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import SingleProduct from './SingleProduct';
import { useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';

function TagProducts(props){
        const baseUrl='http://127.0.0.1:8000/api';
        const [products,setProducts]=useState([]);
        const [totalResult,setTotalResults]=useState(0);
        const {tag} = useParams();
        

        useEffect(() => {
            fetchData(baseUrl+'/products/'+tag);
        },[]);


        
        function fetchData(baseurl) {
            fetch(baseurl)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.results);
                    setProducts(data.results);
                    setTotalResults(data.count);
                });
        }
        
        function changeUrl(page) {
            const newUrl = `${baseUrl}/products/${tag}/?page=${page}`;
            fetchData(newUrl);
        }
        
        var links = [];
        var limit = 1;
        var totalLinks = Math.ceil(totalResult / limit); // Calculate total pages
        
        for (let i = 1; i <= totalLinks; i++) {
            links.push(
                <li class="page-item" key={i}>
                    <Link
                        onClick={() => changeUrl(i)}
                        to={`/products/${tag}/?page=${i}`}
                        class="page-link"
                    >
                        {i}
                    </Link>
                </li>
            );
        }
    ////Sprawdzone/////////////////////////////////////////////////////////////////////////////////////////
    



    return(
        <section className='container'>
        <h3 className='mb-4'>All Products</h3>
        <div className='row mb-4'>
            {
            products.map((product) => <SingleProduct product={product}/>)
            }
            
        </div>
            
             


        
    </section>  
        )
}
export default TagProducts;