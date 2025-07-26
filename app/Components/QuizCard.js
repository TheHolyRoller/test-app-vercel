'use client'
import Image from 'next/image';
import q from '../Styles/Quiz.module.css';
import { useState, useEffect } from 'react';
import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { usePathname } from 'next/navigation';
import { nunito } from '../fonts/nunito';
import { chewy } from '../fonts/chewy';
import mute from '../assets/mute.svg'; 

import soundOn from '../assets/volume.svg'; 
import styled from "styled-components";


const QuizCard = ({ 
    question_text, 
    audio_url, 
    Section, 
    currentIMG,
    currentQuestion
    
}) => {

    // Answer button state and logic from QuizAnswer
    const { handleAnswer, buttonCounters, incrementButtonCounter } = useQuiz();
    const { sound, toggleUserSound } = useUser();
    const pathname = usePathname(); 
    const [answer, setAnswer] = useState();
    const [iconColor, setIconColor] = useState('');


    console.log('this is the sound instance variable \n', sound); 

    const handleClick = async (userAnswer) => {
        console.log('🎯 Answer Selected:', {
            answer: userAnswer,
            question_text: currentQuestion?.question_text
        });
        
        await setAnswer(userAnswer);
        await setIconColor(Section); 
        handleAnswer(userAnswer);
    };



    // Create the color hash map here 
    const colorMap = {






    }


    useEffect(() => {

        console.log('this is the current icon color \n', iconColor); 
        console.log('this is the current section \n', Section);
    }, [iconColor, Section]);


    useEffect(() => {

        if(Section){

            document.documentElement.style.setProperty('--svg-fill-color', getLabelColorBySection(Section)); 
        }


    }, [Section])

    // Scroll to top when on quiz route
    useEffect(() => {
        if (pathname === '/quiz') {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    console.log("Rendering QuizCard with the following props:");
    console.log("Question Text:", question_text);
    console.log("Audio URL:", audio_url);
    console.log("Section:", Section);
    console.log("Current Image:", currentIMG);
    console.log("Current Question:", currentQuestion);

    const getColorBySection = (Section) => {
        // Add debug logging
        console.log('getColorBySection called with:', Section);
        
        // Handle undefined or null case
        if (!Section) {
            console.warn('Section is undefined or null, using default color');
            return '#4c2a74';
        }

        // Normalize the section name
        const normalizedSection = Section.trim().toLowerCase();
        console.log('Normalized section:', normalizedSection);

        switch(normalizedSection) {
            case 'reading': 
                return 'rgb(120, 213, 145)'; 
            case 'writing': 
                return 'rgb(44, 152, 224)'; 
            case 'plans': 
                return 'rgb(199, 59, 46)'; 
            case 'memory': 

                return 'rgb(231, 126, 34)'; 
            case 'tests': 

                return 'rgb(244, 198, 14)'; 
            default: 
                console.warn('Unknown section:', Section, 'using default color');

                return '#4c2a74';  
        }
    }

    const getNavbarColorBySection = (Section) => {
        // Add debug logging
        console.log('getNavbarColorBySection called with:', Section);
        
        // Handle undefined or null case
        if (!Section) {
            console.warn('Section is undefined or null, using default navbar color');
            return '#2c1a3e';
        }

        // Normalize the section name
        const normalizedSection = Section.trim().toLowerCase();
        console.log('Normalized navbar section:', normalizedSection);

        switch(normalizedSection) {
            case 'reading': 

                return 'rgb(119, 210, 143)'; 
            case 'writing': 

                return 'rgb(30, 120, 180)'; 
            case 'plans': 

                return 'rgb(160, 40, 30)'; 
            case 'memory': 

                return 'rgb(200, 100, 20)'; 
            case 'tests': 
                return 'rgb(220, 170, 10)'; 
            default: 
                console.warn('Unknown navbar section:', Section, 'using default navbar color');
                return '#2c1a3e';  
        }
    }

    const getLabelColorBySection = (Section) => {
        // Handle undefined or null case
        if (!Section) {
            // return '#3a2850';
            return '#ffff'; 

        }

        // Normalize the section name
        const normalizedSection = Section.trim().toLowerCase();

        // Add in a fallback function so that it uses the url path to find the color if no normalized Section is defined 
        switch(normalizedSection) {
            case 'reading': 
                return 'rgb(90, 170, 115)'; // Darker green
            case 'writing': 
                return 'rgb(25, 100, 160)'; // Darker blue
            case 'plans': 
                return 'rgb(140, 35, 25)'; // Darker red
            case 'memory': 
                return 'rgb(180, 90, 15)'; // Darker orange
            case 'tests': 
                return 'rgb(200, 150, 0)'; // Darker yellow
            default: 
                return '#3a2850';  // Darker purple
        }
    }

    // Add debug logging for the component render
    console.log('QuizCard render - Section:', Section);
    console.log('Selected card color:', getColorBySection(Section));
    console.log('Selected navbar color:', getNavbarColorBySection(Section));


    const StyledSVG = styled.svg`
  width: 5px;
  height: 5px;
  background-color: ${(props) => props.color};
  background-image: url(${(props) => props.src});`;

    return (
        <>
{/* 

                // backgroundColor: getNavbarColorBySection(Section),


*/}

        {/*  This is the background color that is hiding behind the bottom navigation make it dynamic and tweak it's positioning  */}
        {/* Navbar background strip */}
        <div 
            className={q.navbarStrip}
            style={{
               
            }}
        />

        <article 
            className={`${q.card} ${nunito.className}`} 
            id={q.firstCARD} 
            style={{
                marginTop: pathname === '/quiz' ? '-1em' : '0',
                position: 'relative',
                zIndex: 200,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)', 

            }}


        >
            <div 
                className={q.cardCategoryColorContainer} 
                style={{
                    backgroundColor: getColorBySection(Section),    
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

                <div className={`${q.categoryLabelContainer} ${nunito.className}`}>
                    <label className={`${q.categoryLabel} ${nunito.className}`}>

                        {/* Add in the category section container here  */}


                        <div className={`${q.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>

                        <span style={{paddingTop: '5px'}}>

                        {Section}
                        </span>
                        


                        <div className={q.soundIconContainer} onClick={toggleUserSound} >
                                {/* <Image src={soundOn} width={20} height={20} alt='sound on' className={q.soundIcon}  /> */}

                                <div className={q.iconBackground} style={{marginTop: '-5px'}} >

                                     {sound === true ? (

                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512" style={{ position: 'relative', zIndex: '9999999'}} className={q.soundIcon} >
                                            <path d="M0 0 C1.46880615 0.00845947 1.46880615 0.00845947 2.96728516 0.01708984 C12.53699012 0.17809937 20.86987432 1.16426458 28.46484375 7.44921875 C37.71468435 17.10386638 38.54914207 27.98159081 38.51069641 40.69735718 C38.51372016 42.05419615 38.51761076 43.41103341 38.52228898 44.76786768 C38.53254893 48.48163413 38.53039229 52.19530382 38.52610838 55.90907812 C38.52363752 59.9200834 38.5326598 63.9310656 38.54014587 67.94206238 C38.55288486 75.79436806 38.55468756 83.64663953 38.55234561 91.4989538 C38.5505614 97.88264406 38.5523143 104.26632395 38.55657005 110.65001297 C38.55716524 111.55913567 38.55776043 112.46825837 38.55837366 113.40493024 C38.55958543 115.25191366 38.56079956 117.09889707 38.56201603 118.94588049 C38.57288848 136.26077927 38.57073047 153.57565856 38.56463119 170.89055844 C38.55946226 186.72307531 38.57071735 202.55553064 38.58972941 218.38803534 C38.60911159 234.65374122 38.61736314 250.91941799 38.61360615 267.18513548 C38.61169469 276.31353189 38.61417634 285.44187593 38.62832069 294.57026291 C38.6402403 302.34135412 38.64163287 310.11236073 38.62953053 317.88345312 C38.62364592 321.84622401 38.62253077 325.80884018 38.63453293 329.77160072 C38.64540542 333.40366712 38.64227236 337.03544987 38.62827124 340.66750307 C38.62438192 342.59435075 38.63516026 344.52121109 38.64656812 346.44802892 C38.57494008 357.98770371 36.51987102 366.94339053 28.25 375.3125 C19.89532053 382.16333716 10.72476436 382.65735632 0.3125 382.625 C-0.72068359 382.64111328 -1.75386719 382.65722656 -2.81835938 382.67382812 C-13.33778547 382.68049021 -20.28826617 380.59611543 -27.9453125 373.296875 C-33.98933362 367.03777978 -39.32536479 360.10399836 -44.75 353.3125 C-73.41822858 317.57290935 -113.67925541 300.01941173 -156.84570312 287.72363281 C-164.71399009 285.44620537 -172.20052656 282.90927199 -179.55078125 279.26171875 C-180.19121872 278.94467484 -180.83165619 278.62763092 -181.49150085 278.30097961 C-187.44497 275.20226701 -192.45623177 271.51886806 -195.9375 265.6875 C-196.40542969 264.93210937 -196.87335938 264.17671875 -197.35546875 263.3984375 C-201.15834933 254.98309953 -202.19425691 246.7732937 -202.15405273 237.62158203 C-202.16434761 235.95337402 -202.16434761 235.95337402 -202.17485046 234.25146484 C-202.19301833 230.60761422 -202.18929493 226.96419831 -202.18359375 223.3203125 C-202.18816048 220.76642722 -202.19346752 218.21254317 -202.19947815 215.65866089 C-202.20838977 210.31779395 -202.20624537 204.97708266 -202.19604492 199.63623047 C-202.18457384 193.49504415 -202.19863533 187.35429509 -202.2254414 181.21316636 C-202.25041362 175.26564881 -202.25275186 169.31826511 -202.24632454 163.37069321 C-202.24617197 160.85828805 -202.25216292 158.34587421 -202.26461601 155.83349991 C-202.39725266 124.68920319 -202.39725266 124.68920319 -193.75 114.3125 C-193.31558594 113.76464844 -192.88117188 113.21679688 -192.43359375 112.65234375 C-182.72937344 101.58612761 -166.43408192 98.04394711 -152.91845703 93.94509888 C-135.73110743 88.71523103 -118.84477575 83.39448855 -102.75 75.3125 C-102.03666504 74.9613916 -101.32333008 74.6102832 -100.58837891 74.24853516 C-76.64205713 62.37280757 -56.54466092 45.31397097 -40.1875 24.25 C-28.50706133 9.22236774 -19.79943929 -0.11791397 0 0 Z " fill="--svg-fill-color" transform="translate(247.75,64.6875)"/>
                                            <path d="M0 0 C5.15664954 4.60894929 9.09755391 10.12751648 12.69921875 15.9921875 C13.12332031 16.68199707 13.54742187 17.37180664 13.984375 18.08251953 C50.56753027 78.39346615 58.20616682 151.14208226 42.03564453 219.21704102 C35.59055122 244.9244259 24.97617686 269.8059099 10.13671875 291.8046875 C9.71720947 292.42939941 9.2977002 293.05411133 8.86547852 293.69775391 C4.3672046 300.0655432 -0.98993125 305.16876425 -8.59375 307.33203125 C-14.90806088 308.38608951 -20.85145618 307.79850378 -26.42578125 304.5546875 C-33.27663434 299.62319407 -36.64715477 293.99307013 -38.05078125 285.7421875 C-38.59470337 277.59600504 -35.48034837 272.32408224 -31.05078125 265.7421875 C-17.65454458 244.83300986 -8.56855199 222.97400209 -3.05078125 198.7421875 C-2.89625488 198.06575195 -2.74172852 197.38931641 -2.58251953 196.69238281 C9.01371603 143.9679912 -0.52332182 85.2345876 -29.6171875 39.65234375 C-31.12748398 37.31897879 -32.67161796 35.01949653 -34.23828125 32.72265625 C-37.91732879 26.67284316 -39.10441108 20.66551236 -37.62109375 13.734375 C-35.45050877 6.90105193 -30.98455646 1.56112813 -24.92578125 -2.1953125 C-16.39585245 -5.34767749 -7.70017183 -5.01808951 0 0 Z " fill="--svg-fill-color" transform="translate(425.05078125,104.2578125)"/>
                                            <path d="M0 0 C5.3985366 5.12494631 8.8992443 10.85325504 12 17.5625 C12.42224854 18.46581055 12.84449707 19.36912109 13.27954102 20.29980469 C20.28361161 35.78290668 24.74510189 52.17499101 27 69 C27.0928125 69.65097656 27.185625 70.30195313 27.28125 70.97265625 C31.8781369 106.50002498 26.20762689 152.76740411 4.1796875 182.453125 C-0.93432797 187.91113254 -6.35120852 190.12788956 -13.8125 190.5 C-20.98180937 190.28465153 -26.77966744 188.2537385 -31.8828125 183.09765625 C-36.45462116 177.34424487 -38.5233546 171.74460489 -38.3046875 164.3828125 C-37.73280934 159.910432 -35.84550838 156.08062408 -34 152 C-18.8110151 117.93886434 -15.06593812 82.71265736 -28.44921875 47.09375 C-30.51384404 41.74616089 -32.67780061 36.47194572 -35.3125 31.375 C-38.19254325 25.6149135 -39.04227963 19.89913042 -37.3515625 13.57421875 C-34.90892075 6.69515503 -31.49512585 1.26373244 -24.828125 -2.09375 C-16.25711969 -5.2857106 -7.80794336 -4.99331521 0 0 Z " fill="--svg-fill-color" transform="translate(361,163)"/>
                                            </svg>



                            ) : (


                                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="22" height="22"  className={q.soundIcon}>
                                                        <path d="M0 0 C8.97289354 6.23995237 13.78767761 14.39377241 16 25 C16.4145125 29.77065612 16.40958015 34.51560373 16.38768005 39.30198669 C16.39185919 40.73408759 16.39733988 42.16618517 16.40399987 43.59827667 C16.41839704 47.51085928 16.41422782 51.42323022 16.40683305 55.33582413 C16.40208946 59.56427534 16.4146217 63.79268153 16.42485046 68.02111816 C16.44202016 76.29594522 16.44288232 84.57069628 16.43763756 92.84553652 C16.43359143 99.57290053 16.43504467 106.30024212 16.44038582 113.02760506 C16.44113424 113.98612456 16.44188266 114.94464406 16.44265376 115.9322096 C16.44418528 117.87961022 16.44572363 119.82701084 16.44726873 121.77441145 C16.460987 140.02406815 16.45556068 158.27368195 16.44408352 176.52333767 C16.43415053 193.20865141 16.44709416 209.89385427 16.47101771 226.57915091 C16.49541611 243.7252103 16.50501484 260.87121806 16.49836498 278.01729447 C16.49487459 287.63810804 16.49709309 297.25883634 16.51461601 306.87963676 C16.52934718 315.06898536 16.5299614 323.25818861 16.5125451 331.44753437 C16.50404052 335.62313208 16.50187224 339.79847025 16.51719666 343.97405434 C16.53106988 347.80169197 16.52624724 351.62884835 16.50695742 355.45645834 C16.50143711 357.48586489 16.51544684 359.51529611 16.53031152 361.54465574 C16.44477657 372.21636213 14.56300025 381.34176782 6.9765625 389.21875 C-2.17499869 397.46600672 -11.5549009 400.66725528 -23.84765625 400.265625 C-34.1560853 399.39700892 -40.94591483 394.63065563 -48.97070312 388.53466797 C-51.8891085 386.32760635 -54.84304571 384.16990775 -57.79394531 382.0065918 C-60.22063359 380.22568379 -62.64223994 378.43806982 -65.0625 376.6484375 C-68.33013884 374.23260799 -71.60081353 371.82101067 -74.875 369.4140625 C-82.92888248 363.49240161 -90.95990134 357.54331651 -98.94873047 351.53417969 C-107.25369379 345.29464612 -115.63076572 339.15286921 -124 333 C-127.31312392 330.56334678 -130.62546459 328.12563249 -133.9375 325.6875 C-134.6694458 325.14947754 -135.4013916 324.61145508 -136.15551758 324.05712891 C-136.87634521 323.52651855 -137.59717285 322.9959082 -138.33984375 322.44921875 C-139.09305908 321.91361328 -139.84627441 321.37800781 -140.62231445 320.82617188 C-143 319 -143 319 -145.44604492 316.61132812 C-155.09003509 307.8309918 -165.01077537 308.85177479 -177.4375 309.125 C-181.39457521 309.16986117 -185.35127717 309.1899511 -189.30859375 309.1953125 C-190.72163536 309.19979904 -190.72163536 309.19979904 -192.16322327 309.20437622 C-207.26123438 309.11462996 -218.65199125 304.83110682 -229.703125 294.44921875 C-239.75379963 283.73191774 -241.45482713 271.20867003 -241.40405273 257.01416016 C-241.40976929 255.64447986 -241.41673846 254.27480431 -241.42485046 252.90513611 C-241.44265649 249.21694587 -241.4416373 245.52899517 -241.43590808 241.84077501 C-241.43279754 238.74719769 -241.43892932 235.65366515 -241.44494683 232.56009424 C-241.45894956 225.25421694 -241.45746669 217.94845669 -241.44604492 210.64257812 C-241.43457103 203.13813246 -241.44863666 195.63404449 -241.4754414 188.12964594 C-241.4976868 181.65621307 -241.50421589 175.18289175 -241.49836498 168.70942342 C-241.49501485 164.85649437 -241.4972794 161.00379441 -241.51461601 157.15089798 C-241.53022486 153.52434261 -241.52597789 149.89831189 -241.50731087 146.2717762 C-241.50194199 144.3289467 -241.51603279 142.38609282 -241.53100586 140.4433136 C-241.41607093 126.5544307 -237.7057029 115.18630807 -228.12109375 105.00390625 C-218.23946448 95.7211636 -207.23604583 92.72068733 -194.046875 92.859375 C-191.87757224 92.84218494 -189.70829671 92.82122506 -187.5390625 92.796875 C-184.16100241 92.76374721 -180.78903311 92.74940634 -177.41113281 92.80078125 C-160.63254941 93.01862063 -150.63469888 90.14601372 -138.08128357 78.83799744 C-134.57816311 75.74436497 -130.84090328 72.95591053 -127.125 70.125 C-125.63833989 68.96349671 -124.15240014 67.80106905 -122.66796875 66.63671875 C-114.99922159 60.64412892 -107.23173594 54.77977964 -99.48388672 48.89013672 C-95.81745353 46.10013026 -92.15839006 43.30053963 -88.5 40.5 C-84.00807183 37.06264279 -79.51399229 33.62814661 -75.015625 30.19921875 C-74.15372559 29.54219971 -73.29182617 28.88518066 -72.40380859 28.20825195 C-70.63699546 26.86290584 -68.86909361 25.5189883 -67.10009766 24.17651367 C-62.50139369 20.68397081 -57.92554664 17.16668638 -53.3828125 13.6015625 C-52.46016602 12.88331299 -51.53751953 12.16506348 -50.58691406 11.42504883 C-48.8397085 10.06399646 -47.09892185 8.69464331 -45.36621094 7.31518555 C-32.21452522 -2.883301 -15.55318106 -9.02830202 0 0 Z " fill="var(--svg-fill-color)" transform="translate(283,58)"/>
                                                        <path d="M0 0 C1.63388672 -0.04253906 1.63388672 -0.04253906 3.30078125 -0.0859375 C10.68297593 0.91879027 15.50485306 5.76528971 20.49609375 10.890625 C21.10767838 11.50645447 21.719263 12.12228394 22.34938049 12.7567749 C24.28180893 14.70586074 26.20348241 16.66516292 28.125 18.625 C29.44135769 19.95642122 30.75840852 21.28715751 32.07617188 22.6171875 C35.28801545 25.86192847 38.49026263 29.11586833 41.6875 32.375 C45.81148598 30.76057138 48.48512218 27.76322848 51.484375 24.6328125 C52.61950512 23.47237588 53.7549313 22.31222881 54.890625 21.15234375 C56.66296183 19.33055774 58.43194639 17.50576496 60.1953125 15.67529297 C61.90760605 13.90205175 63.63257019 12.14191011 65.359375 10.3828125 C65.87425476 9.84101349 66.38913452 9.29921448 66.9196167 8.74099731 C71.43115777 4.16932746 76.40961693 0.93224012 82.8125 -0.15625 C89.22063009 -0.08659641 94.54815613 0.2681136 99.6875 4.375 C104.7667187 9.70364462 107.40431169 14.86346491 108 22.25 C107.71494009 30.84940248 103.77558348 36.01458404 97.83203125 41.71875 C96.83957649 42.70059265 96.83957649 42.70059265 95.82707214 43.70227051 C93.72957715 45.77197601 91.61531296 47.82352463 89.5 49.875 C88.06721109 51.28268636 86.63555798 52.69152976 85.20507812 54.1015625 C81.7122129 57.53956326 78.20420769 60.96139831 74.6875 64.375 C75.87098022 65.80972656 75.87098022 65.80972656 77.07836914 67.2734375 C77.52217422 67.81145996 77.96597931 68.34948242 78.42323303 68.90380859 C79.86691731 70.5837828 81.40704139 71.97841471 83.125 73.375 C87.19886641 76.86577485 91.05148626 80.55228782 94.875 84.3125 C95.46917725 84.88548828 96.06335449 85.45847656 96.67553711 86.04882812 C102.90250663 92.22606565 107.34309592 98.20893881 107.9375 107.125 C107.83834549 113.78074635 105.40594869 119.65655131 100.6875 124.375 C94.53018105 128.63333273 89.14243347 130.07133994 81.6875 129.375 C69.80331458 126.49979385 61.37464771 115.20469062 53.0625 106.8125 C52.15371094 105.89919922 51.24492187 104.98589844 50.30859375 104.04492188 C48.09922045 101.82392029 45.89223969 99.60059967 43.6875 97.375 C39.45717208 99.00366353 36.73156785 102.1653498 33.671875 105.37109375 C32.49132976 106.58181363 31.3103255 107.79208608 30.12890625 109.00195312 C28.28272829 110.90375657 26.44071878 112.80914085 24.60693359 114.72290039 C22.82746863 116.57541203 21.03226105 118.41147814 19.234375 120.24609375 C18.69762146 120.81492783 18.16086792 121.3837619 17.60784912 121.96983337 C13.11321866 126.52273583 8.63040429 128.67249217 2.25390625 129.80859375 C-4.37446517 129.82151455 -10.13398877 128.24109346 -15.140625 123.7265625 C-19.58863964 118.78192486 -21.59929686 114.29239994 -21.6875 107.5625 C-21.73003906 106.09876953 -21.73003906 106.09876953 -21.7734375 104.60546875 C-20.67923483 96.93677716 -16.21292087 91.69586189 -10.796875 86.46875 C-10.18104553 85.85858032 -9.56521606 85.24841064 -8.9307251 84.61975098 C-6.98392878 82.69513843 -5.02362494 80.78499871 -3.0625 78.875 C-1.73084806 77.56343624 -0.40010954 76.2509444 0.9296875 74.9375 C4.17183635 71.7391793 7.42616703 68.5537515 10.6875 65.375 C7.11471512 61.10044054 3.45933315 57.05226978 -0.5703125 53.1953125 C-1.53574974 52.25712075 -2.50057538 51.31829932 -3.46484375 50.37890625 C-4.9510314 48.93586757 -6.44052509 47.49712032 -7.94091797 46.06884766 C-14.73499998 39.58591104 -20.16362738 33.87119886 -21.84375 24.37109375 C-21.75660617 17.2361927 -20.67680667 11.87981136 -15.62890625 6.62109375 C-10.59346138 2.12709457 -6.8835584 0.08088788 0 0 Z " fill="--svg-fill-color" transform="translate(362.3125,192.625)"/>
                                                        </svg>

                            )}
                                </div>

                        </div>

                        </div>
                    </label>
                </div>
            </div>

            {question_text && (
                <div className={`${q.question_textContainer} ${nunito.className}`} style={{ marginTop: '-4.5rem' }}>
                    <h2 className={`${q.question_text} ${nunito.className}`}>
                        {question_text}
                    </h2>
                </div>
            )}
            
            <div className={q.imageSectionContainer}>
                <div className={q.doodleContainer}>
                    {currentIMG && (
                        <Image 
                            src={currentIMG}
                            className={q.currentIMG}
                            alt='quiz illustration'
                            width={200}
                            height={200}
                            unoptimized
                            onLoad={() => console.log('🖼️ Image Loaded:', currentIMG)}
                            onError={(e) => console.error('❌ Image Error:', e)}
                            style={{
                                marginTop: '-3.5rem',
                                objectFit: 'contain', 
                                zIndex: '0', 
                               
                            }}
                        />
                    )}
                    
                </div>
            </div>

            <article className={q.card} id={q.cardOne}></article>
            <article className={q.card} id={q.cardTwo}></article>
            <article className={q.card} id={q.cardThree}></article>
            <article className={q.card} id={q.cardFour}></article>
        </article>

        {/* Integrated Answer Section - Only show on /quiz route */}
        {pathname === '/quiz' && (
            <section className={`${q.mainAnswerContainer} ${nunito.className}`}>
                <article className={`${q.answerSection} ${nunito.className}`}>
                    <div className={`${q.buttonList} ${nunito.className}`}>

                        <div className={q.buttonStackContainer} 
                          onClick={() => handleClick('no')}
                          onMouseEnter={() => console.log('🖱️ Hovering No Button')}
                        >
                            <div className={`${q.button} ${chewy.className}`} id={q.noButton} onClick={() => incrementButtonCounter('noNum')} >
                                {buttonCounters.noNum > 0 && (
                                    <span className={q.numSpan}>
                                    {buttonCounters.noNum}
                                    </span>
                                )}
                                No 
                            </div>
                            <div className={q.buttonStack} id={q.noStackOne}></div>
                            <div className={q.buttonStack} id={q.noStackTwo}></div>
                            <div className={q.buttonStack} id={q.noStackThree}></div>
                            <div className={q.buttonStack} id={q.noStackFour}></div>
                            <div className={q.buttonStack} id={q.noStackFive}></div>
                            <div className={q.buttonStack} id={q.noStackSix}></div>
                        </div>

                        <div className={q.buttonStackContainer} onClick={() => handleClick('sometimes')} onMouseEnter={() => console.log('🖱️ Hovering Sometimes Button')} >
                            <div className={`${q.button} ${chewy.className}`} id={q.sometimesButton} onClick={() => incrementButtonCounter('sometimesNum')} >
                                {buttonCounters.sometimesNum > 0 && (
                                    <span className={q.numSpan}>
                                    {buttonCounters.sometimesNum}
                                    </span>
                                )}
                                Some 
                                times 
                            </div>
                            <div className={q.buttonStack} id={q.sometimesStackOne}></div>
                            <div className={q.buttonStack} id={q.sometimesStackTwo}></div>
                            <div className={q.buttonStack} id={q.sometimesStackThree}></div>
                            <div className={q.buttonStack} id={q.sometimesStackFour}></div>
                            <div className={q.buttonStack} id={q.sometimesStackFive}></div>
                            <div className={q.buttonStack} id={q.sometimesStackSix}></div>
                        </div>

                        <div className={q.buttonStackContainer}   
                        onClick={() => handleClick('yes')}
                        onMouseEnter={() => console.log('🖱️ Hovering Yes Button')}>
                            <div className={`${q.button} ${chewy.className}`} id={q.yesButton} onClick={() => incrementButtonCounter('yesNum')}>
                                {buttonCounters.yesNum > 0 && (
                                    <span className={q.numSpan}>
                                    {buttonCounters.yesNum}
                                    </span>
                                )}
                                Yes 
                            </div>
                            <div className={q.buttonStack} id={q.yesStackOne}></div>
                            <div className={q.buttonStack} id={q.yesStackTwo}></div>
                            <div className={q.buttonStack} id={q.yesStackThree}></div>
                            <div className={q.buttonStack} id={q.yesStackFour}></div>
                            <div className={q.buttonStack} id={q.yesStackFive}></div>
                            <div className={q.buttonStack} id={q.yesStackSix}></div>
                            <div className={q.buttonStack} id={q.yesStackSeven}></div>

                        </div>
                    </div>
                </article>
            </section>
        )}
        </>
    );
};

export default QuizCard; 