import React from 'react'

import p from '../Styles/PhoneBarChart.module.css'; 


function PhoneBarChart({ writingPercentage,
    memoryPercentage,
    readingPercentage,
    examResultsPercentage,
    organisationalPercentage, 
    memoryScore, 
    writingScore, 
    readingScore, 
    examResultsScore, 
    organisationalScore,  
    percentage,
    finalScore, 
    isExplanationPage = false,
    onNext


}) {

    // Create bar chart data structure
    const categoryData = [
        {
            name: 'Reading',
            percentage: readingScore,
            color: '#FF6B6B',
            score: readingScore
        },
        {
            name: 'Writing',
            percentage: writingScore,
            color: '#4ECDC4',
            score: writingScore
        },
        {
            name: 'Memory',
            percentage: memoryScore,
            color: '#45B7D1',
            score: memoryScore
        },
        {
            name: 'Tests',
            percentage: examResultsScore,
            color: '#96CEB4',
            score: examResultsScore
        },
        {
            name: 'Planning',
            percentage: organisationalScore,
            color: '#FECA57',
            score: organisationalScore
        }
    ];

        console.log('these are the percentages in the phone bar chart functional component  \n', writingPercentage,
            memoryPercentage,
            readingPercentage,
            examResultsPercentage,
            organisationalPercentage); 

            console.log('reading percentage in the bar chart page \n', readingPercentage);

            console.log('these are the scores from the categories \n',   memoryScore, 
                writingScore, 
                readingScore, 
                examResultsScore, 
                organisationalScore); 
                
                console.log('this is the final score in the phone bar chart \n', percentage); 

  return (
    <>


    {/* Add in the overall compound score here  */}

     <main className={p.mainChartContainer}>
            <div className={p.mainChartSubContainer}>


            <div className={p.mainHeadlineContainer}>

                <h1 className={p.mainHeadline}>

                    {isExplanationPage ? "The 5 Areas" : "Your Dyslexia Score"}

                </h1>



            </div>

            {!isExplanationPage && (
                <div className={p.mainScore}>
                    {finalScore}
                    <span className={p.refSpan}>
                        /100
                    </span>
                </div>
            )}

            {isExplanationPage && (
                <div className={p.mainScore} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    {finalScore}
                    <span className={p.refSpan} style={{ fontSize: '1.2rem' }}>
                        /100
                    </span>
                </div>
            )}
            
            {/* <div className={p.impactMessage}>
                <p className={p.impactText}>
                    {percentage >= 70 
                        ? "This Indicates your work could be significantly impacted by Dyslexia"
                        : "This indicates your work could be mildly impacted by Dyslexia"
                    }
                </p>
            </div> */}

                <section className={p.chartContainer} >
                
                    <div className={p.mainChartSubContainerTextSection}>
                    <div className={p.mainTitleContainer}>
                <div className={p.mainTitleSubContainer}>


                </div>
                </div>

                    <div className={p.barChartSection}>
                        {categoryData.map((category, index) => (
                            <div key={index} className={p.barChartItem}>
                                <div className={p.barContainer}>
                                    <div className={p.barBackground}>
                                        <div 
                                            className={p.barFill}
                                            style={{
                                                width: `${category.percentage}`,
                                                backgroundColor: category.color,
                                                height: '35px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                paddingLeft: '16px', 
                                                paddingBottom: '1em'
                                            }}
                                        >
                                            <div style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '12px',
                                                color: 'white',
                                                fontWeight: '600',
                                                fontSize: '1rem', 
                                                paddingTop: '15px'
                                            }}>
                                                <span>{category.name}</span>
                                                <span>{Math.round(category.percentage)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <ul className={p.barChartMainList}>
                        <li className={p.barChartListItem}>

                            <article className={p.resultExplanationContainer}>

                            <div className={p.resultExplanationTitleContainer}>
                            </div>
                          
                            </article>
                        </li>
                    </ul>
                    </div>

                {/* Add in the button here  */}
                    <div className={p.buttonContainer}>

                        <div className={p.button} onClick={onNext} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}}>

                        Next

                        </div>


                    </div>

                </section>
            </div>
        </main>
        </>
  )
}

export default PhoneBarChart