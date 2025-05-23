import b from '../Styles/Barchart.module.css'; 
import idea from '../assets/idea.svg'; 
import Image from 'next/image';


export default function Barchart(){




    return(

        <>
        <main className={b.mainChartContainer}>
            <div className={b.mainChartSubContainer}>
                <section className={b.chartContainer}>
                
                    <div className={b.mainChartSubContainer}>
                    <div className={b.mainTitleContainer}>
                <div className={b.mainTitleSubContainer}>

                    <div className={b.infoGraphicContainer}>
                    </div>

                    <h1 className={b.mainBarChartTitle}>
                        Quiz Results 
                    </h1>
                </div>
                </div>
                    <ul className={b.barChartMainList}>
                        <li className={b.barChartListItem}>

                            <article className={b.barContainer}>
                            <div className={b.backgroundBar}>
                            </div>

                            <div className={b.progressBarContainer}>
                            <div className={b.progressBar}>
                            <div className={b.progressBarSubContainer}>
                                
                            <div className={b.iconContainer}>
                            <div className={b.iconSubContainer}>
                                <div className={b.iconBackground}>
                                    <Image src={idea} height={30} width={30} alt='idea'/>
                                </div>
                            </div>
                            </div> 

                            <div className={b.titleContainer}>
                            <div className={b.titleSubContainer}>
                            <div className={b.barTitle}>Reading</div>

                                <div className={b.percentageContainer}>
                                    100%
                                </div>

                            </div>
                            </div>
                            <div className={b.lineContainer}>
                            <div className={b.lineSubContainer}>

                                <div className={b.line}>
                                <div className={b.dotContainer}>
                                    <div className={b.dot}>`</div>
                                </div>
                                </div>
                            </div>            
                            </div>

                            </div>
                            </div>
                            </div>
                            </article>


                            <article className={b.resultExplanationContainer}>

                                {/* Add in the main title container here  */}
                            <div className={b.resultExplanationTitleContainer}>
                                <h1 className={b.resultExplanationTitle}>
                                    Reading 
                                </h1>

                            </div>
                            {/* Add in the explanation container here */}
                            <div className={b.resultExplanationText}>

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidip ex ea

                            </div>
                            </article>
                        </li>
                    </ul>
                    </div>
                </section>
            </div>
        </main>
        </>
    )







}