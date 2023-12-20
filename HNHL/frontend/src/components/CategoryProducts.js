////Sprawdzone/////////////////////////////////////////////////////////////////////////////////////////
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import SingleProduct from './SingleProduct';
import { useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';

function CategoryProducts(props){
        const baseUrl='http://127.0.0.1:8000/api';
        const [products,setProducts]=useState([]);
        const [totalResult,setTotalResults]=useState(0);
        const {category_slug,category_id} = useParams();
        

        useEffect(() => {
            fetchData(baseUrl+'/products/?category='+category_id);
        },[]);


        
        function fetchData(baseurl){
            fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.results);
                setTotalResults(data.count);
            });
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
export default CategoryProducts;