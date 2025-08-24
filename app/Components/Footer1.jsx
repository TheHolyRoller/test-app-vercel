
// Add in the style sheet here 
import f1 from '../Styles/footer1.module.css'; 
import { useQuiz } from '../lib/context/QuizContext';

export default function Footer() {
  const { navColor } = useQuiz();

  console.log('this is the footers color \n', navColor); 

  

  return (
        <footer id={f1.footer} className="p-4 footer sm:footer-horizontal footer-center text-base-content" style={{ backgroundColor: navColor,  }} >
</footer> 
    );
  }
  