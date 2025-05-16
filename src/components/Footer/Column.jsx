function FooterColumn  ( {Title , item1, item2, item3 , children})  {
    return ( 
        <div className="footer-cols">
          <h4>{Title}</h4>
          <ul>
            <li>
              <a href="#">{item1}</a>
            </li>
            <li>
              <a href="#">{item2}</a>
            </li>
            <li>
              <a href="#">{item3}</a>
            </li>
            {children}
          </ul>
        </div>  
     );
}
 
export default FooterColumn;