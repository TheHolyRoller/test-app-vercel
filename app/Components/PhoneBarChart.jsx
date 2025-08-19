import React from 'react'
import { nunito } from '../fonts/nunito';


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
    score,
    finalScore, 
    isExplanationPage = false,
    onNext

}) {

    // Debug logging to see what values are being received
    console.log('📊 PhoneBarChart - Received Props:', {
        percentage,
        score,
        finalScore,
        isExplanationPage,
        writingPercentage,
        memoryPercentage,
        readingPercentage,
        examResultsPercentage,
        organisationalPercentage
    });


    const MAX_SCORE = 20; 

    const categoryData = [
        {
            name: 'Reading',
            percentage: (readingScore / MAX_SCORE) * 100,
            color: '#FF6B6B',
            score: readingScore
        },
        {
            name: 'Writing',
            percentage: (writingScore / MAX_SCORE) * 100,
            color: '#4ECDC4',
            score: writingScore
        },
        {
            name: 'Memory',
            percentage: (memoryScore / MAX_SCORE) * 100,
            color: '#45B7D1',
            score: memoryScore
        },
        {
            name: 'Tests',
            percentage: (examResultsScore / MAX_SCORE) * 100,
            color: '#96CEB4',
            score: examResultsScore
        },
        {
            name: 'Planning',
            percentage: (organisationalScore / MAX_SCORE) * 100,
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

    {/* Replace this main container with the card element and it's main container */}

    {/* Add in the relevant styles from the classes into the style sheet and then place the phone bar chart component into the card element. */}


    <main className={p.mainContainer} style={{outline: '0px solid red', paddingTop: '60px'}}>
            
            <article 
              className={`${p.card} ${nunito.className}`} 
              id={p.firstCARD} 
              style={{
                  position: 'relative',
                  zIndex: 200,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
    
              }}
              >
            <div 
              className={p.cardCategoryColorContainer} 
              style={{
                  backgroundColor: '#012973',
                  boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
              }}
          >

          
              
              <div className={`${p.categoryLabelContainer} ${nunito.className}`} style={{}} >
                  <label className={`${p.categoryLabel} ${nunito.className}`}>
                      <div className={`${p.labelContainer} ${nunito.className}`} style={{}}>
                      results
                      </div>
                  </label>
              </div>
          </div>
    
    
                  <div className={p.mainScore}>
                        <span className={p.scoreSpan}>

                        {score}
                        </span>
                        <span className={p.refSpan}>
                            /100
                        </span>
                    </div>



                    <div className={p.barChartSection}>
                        {categoryData.map((category, index) => (
                            <div key={index} className={p.barChartItem}>
                                <div className={p.barContainer}>
                                    <div className={p.barBackground}>
                                        <div 
                                            className={p.barFill}
                                            style={{
                                                width: `${category.percentage}%`,
                                                // width: '50rem',
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
                                                <span>{Math.round(category.score)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                  
    
          <article className={p.card} id={p.cardOne}></article>
          <article className={p.card} id={p.cardTwo}></article>
          <article className={p.card} id={p.cardThree}></article>
          <article className={p.card} id={p.cardFour}></article>


      </article>
    
                        

      <div className={p.buttonContainer}>

<div className={p.button} onClick={onNext} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}}>

Next

</div>
</div>

    
      </main>
        </>
  )
}

export default PhoneBarChart