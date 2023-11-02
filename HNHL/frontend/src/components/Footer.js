function Footer(){
    return (
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div class="col-md-4 d-flex align-items-center">
        <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
        </a>
        <span class="mb-3 mb-md-0 text-body-secondary">© 2023 Company, Inc</span>
        </div>

        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3"><a className="text-muted" href="#"><i class="fa-brands fa-twitter"></i></a></li>
        <li className="ms-3"><a className="text-muted" href="#"><i class="fa-brands fa-instagram"></i></a></li>
        <li className="ms-3"><a className="text-muted" href="#"><i class="fa-brands fa-facebook"></i></a></li>
        </ul>
    </footer>
    )
} 
export default Footer;