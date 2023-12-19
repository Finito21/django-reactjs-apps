import logo from '../logo.svg'
import {Link} from 'react-router-dom';
import { useState,useEffect} from 'react';
function Categories(){
    const baseUrl='http://127.0.0.1:8000/api';
        const [categories,setCategories]=useState([]);

        useEffect(() => {
            fetchData(baseUrl+'/categories');
        },[]);

        function fetchData(baseurl){
            fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.results);
            });
        }

       
    return (
    <section className="container mt-4">
        <h3 className='mb-4'>All Categories</h3>
        <div className='row mb-4'>
                {
                categories.map((category) =>
                <div className='col-12 col-md-3 mb-4'>
                    <div className="card text-center" >
                        <Link to={`/category/${category.title}/${category.id}`}>
                            <img src={category.category_img} className="card-img-top" alt={category.title} style={{ height: '250px', width: '100%' }}/>
                        </Link>
                        <div className="card-body text-center">
                            <h4 className="card-title"><Link to={`/category/${category.title}/${category.id}`} style={{ textDecoration: 'none', color: 'black' }}>{category.title}</Link></h4>
                        </div>
                    </div>
                </div>
                
                )
                }
            
        </div>

    </section>
    )
} 
export default Categories;