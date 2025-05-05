
import cd from '../Styles/cardOne.module.css'; 



export default function ScratchCard(){



    return(


        <section className={cd.cardStackContainer}>

        {/* Add in the card list here  */}
        <ul className={cd.cardList}>

        {/* Add in the cards here  */}

        <li className={cd.cardListElements} id={cd.cardOne}>

            <article className={cd.cardItem} id={cd.cardOne} >

                Card 

            </article>


        </li>
        <li className={cd.cardListElements} id={cd.cardTwo}>

            <article className={cd.cardItem} id={cd.cardTwo} >

                Card 

            </article>


        </li>
        <li className={cd.cardListElements} id={cd.cardThree}>

            <article className={cd.cardItem} id={cd.cardThree} >

                Card 

            </article>


        </li><li className={cd.cardListElements} id={cd.cardFour} >

            <article className={cd.cardItem} id={cd.cardFour} >

                Card 

            </article>


        </li>
        <li className={cd.cardListElements} id={cd.cardFive} >

            <article className={cd.cardItem} id={cd.cardFive} >

                Card 

            </article>


        </li>
        <li className={cd.cardListElements}>

            <article className={cd.cardItem} id={cd.cardSix} >

                Card 

            </article>


        </li>


        </ul>

        Card Stack 

        </section>


    )



}