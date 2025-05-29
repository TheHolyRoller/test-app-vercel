import React from 'react'

import p from '../Styles/PhoneBarChart.module.css'; 


function PhoneBarChart() {
  return (
    <>
     <main className={p.mainChartContainer}>
            <div className={p.mainChartSubContainer}>
                <section className={p.chartContainer}>
                
                    <div className={p.mainChartSubContainer}>
                    <div className={p.mainTitleContainer}>
                <div className={p.mainTitleSubContainer}>

                    <div className={p.infoGraphicContainer}>
                    </div>

                    <h1 className={p.mainBarChartTitle}>
                        Quiz Results 
                    </h1>
                </div>
                </div>
                    <ul className={p.barChartMainList}>
                        <li className={p.barChartListItem}>

                            <article className={p.barContainer}>
                            <div className={p.backgroundBar}>
                            </div>
                          

                            <div className={p.progressBarContainer}>
                            
                            <div className={p.progressBar}>
                            <div className={p.percentageContainer}>
                                    80%
                                </div>
                                <div className={p.categoryLabel}>
                                Reading
                            </div>
                            <div className={p.progressBarSubContainer}>
                            
                            
                                </div>
                            </div>
                            </div>
                            </article>


                            <article className={p.resultExplanationContainer}>

                                {/* Add in the main title container here  */}
                            <div className={p.resultExplanationTitleContainer}>
                                <h1 className={p.resultExplanationTitle}>
                                    Reading 
                                </h1>

                            </div>
                            {/* Add in the explanation container here */}
                            <div className={p.resultExplanationText}>

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

export default PhoneBarChart