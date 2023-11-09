import logo from '../logo.svg'
import {Link} from 'react-router-dom';
import { useState,useEffect} from 'react';
function Categories(){
    const baseUrl='http://127.0.0.1:8000/api';
        const [categories,setCategories]=useState([]);
        const [totalResult,setTotalResults]=useState(0);

        useEffect(() => {
            fetchData(baseUrl+'/categories');
        },[]);

        function fetchData(baseurl){
            fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.results);
                setTotalResults(data.count);
            });
        }

        function changeUrl(baseurl){
            fetchData(baseurl);
        }

        var links=[];
        var limit=1;
        var totalLinks=totalResult/limit;
        for(let i=1; i<=totalLinks; i++){
            links.push(<li class="page-item"><Link onClick={()=>changeUrl(baseUrl+`/categories/?page=${i}`)} to ={`/categories/?page=${i}`} class="page-link">{i}</Link></li>)
        }


    return (
    <section className="container mt-4">
        <h3 className='mb-4'>All Categories</h3>
        <div className='row mb-4'>
                {
                categories.map((category) =>
                <div className='col-12 col-md-3 mb-4'>
                    <div className="card">
                        <img src={logo} className="card-img-top" alt={category.title}/>
                        <div className="card-body">
                            <h4 className="card-title"><Link to={`/category/${category.title}/${category.id}`}>{category.title}</Link></h4>
                        </div>
                    </div>
                </div>
                
                )
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
export default Categories;