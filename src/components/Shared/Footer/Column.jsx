function FooterColumn  ( {Title , item1, item2, item3 , children})  {
    return ( 
        <div className="flex-[1_1_180px] min-w-[150px] footer-cols">
          <h4 className="font-bold mb-[10px]">{Title}</h4>
          <ul className="list-none p-0">
            <li className="mb-[0.5rem] opacity-60">
              <a className="text-decoration-none text-[#333] font-size-[0.9rem] hover:text-[#000]" href="#">{item1}</a>
            </li>
            <li className="mb-[0.5rem] opacity-60">
              <a className="text-decoration-none text-[#333] font-size-[0.9rem] hover:text-[#000]" href="#">{item2}</a>
            </li>
            <li className="mb-[0.5rem] opacity-60">
              <a className="text-decoration-none text-[#333] font-size-[0.9rem] hover:text-[#000]" href="#">{item3}</a>
            </li>
            {children}
          </ul>
        </div>  
     );
}
 
export default FooterColumn;