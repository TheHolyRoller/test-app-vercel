'use client';

import { useRouter } from 'next/navigation';
import uc from '../Styles/AudioPermission.module.css'; 
import { nunito } from '../fonts/nunito';
import Image from 'next/image';
import ivvi_group from '../assets/ivvi_group.svg'; 
import Link from 'next/link';
import AudioButtons from '../Components/AudioButtons';


export default function EmailPermission() {
    const router = useRouter();



    const Section = "Audio Permission";
    const audio_url = 'https://fra.cloud.appwrite.io/v1/storage/buckets/dood_gifs/files/6943fef60015171f5d65/view?project=67d4d9140008273c9d84&mode=admin';
    const question_text = `Hello. Welcome to our Dyslexia Screener. Shall I read out the questions for you?`;
    const currentIMG = 'https://fra.cloud.appwrite.io/v1/storage/buckets/dood_gifs/files/69440a9500117e2eaa5c/view?project=67d4d9140008273c9d84&mode=admin';
    
    // Placeholder functions
    const getLabelColorBySection = (section) => "#033699";

    return (
        <div className={uc.mainContainer}>


          <article 
          className={`${uc.card} ${nunito.className}`} 
          id={uc.firstCARD} 
          style={{
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
              height: '500px', 
              position: 'relative'



            }}
          >
      <div 
          className={uc.cardCategoryColorContainer} 
          style={{
              backgroundColor: '#4168b3',
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
  
          }}
      >
          {audio_url && (
              <audio 
                  key={audio_url} 
                  controls 
                  autoPlay 
                  style={{ opacity: '0', position: 'absolute' }}
                  onPlay={() => console.log('🎵 Audio Started Playing:', audio_url)}
                  onError={(e) => console.error('❌ Audio Error:', e)}
              >
                  <source src={audio_url} type="audio/mp3" />
              </audio>
          )}
          
  
          <div className={`${uc.categoryLabelContainer} ${nunito.className}`}>
              <label className={`${uc.categoryLabel} ${nunito.className}`}>
  
  
                  <div className={`${uc.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>
                  Welcome
                  </div>
              </label>
          </div>
      </div>
      <div className={uc.supportingTextSectionContainer} >

        <p  className={uc.supportingText} style={{fontWeight: 'lighter'}}>


        {question_text}

        </p>

</div>

  

        <header className={uc.headerImageContainer}>

          <Image className={uc.mainImage}  src={currentIMG} width={200} height={210} alt='audio' /> 
          </header>

  
      <article className={uc.card} id={uc.cardOne}></article>
      <article className={uc.card} id={uc.cardTwo}></article>
      <article className={uc.card} id={uc.cardThree}></article>
      <article className={uc.card} id={uc.cardFour}></article>
  </article>

<Link   

href='/quiz' prefetch

>
<section className={uc.buttonSectionContainer} style={{cursor: 'pointer'}}>

  <div className={uc.ctaContainer} style={{cursor: 'pointer'}}>

      <AudioButtons/> 

  </div>
  
</section>
</Link>
      </div>
    );
} 