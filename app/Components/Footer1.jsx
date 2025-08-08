
// Add in the style sheet here 

import f1 from '../Styles/footer1.module.css'; 

export default function Footer({color}) {


  // Add in code to dynamically color the footer here 
    return (
        <footer className="p-4 footer sm:footer-horizontal footer-center text-base-content" style={{backgroundColor: color || "#FFFFF", position: 'fixed', bottom: '0%', height: '4.3em'}} >
</footer> 
    );
  }
  