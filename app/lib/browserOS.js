'use client';

export const browserOS = async () => {


    console.log('browserOS function'); 

    if (typeof navigator === 'undefined') {
        console.log('navigator is undefined; likely running on the server');
        return false;
    }


    console.log('post-navigator check');
    console.log('navigator.userAgent exists:', typeof navigator.userAgent === 'string');
    console.log('navigator.platform:', navigator.platform);
    console.log('navigator.userAgentData exists:', !!navigator.userAgentData);
    console.log('navigator.userAgentData.getHighEntropyValues exists:', !!(navigator.userAgentData && navigator.userAgentData.getHighEntropyValues));

    if( navigator && navigator.userAgentData && navigator.userAgentData.getHighEntropyValues){


        console.log('this is the if statement'); 


        const ua = await navigator.userAgentData.getHighEntropyValues([

            "platform", 
            "platformVersion", 
            "uaFullVersion"

        ]); 

        console.log('this is the UA object \n',  ua); 
        console.log('ua.platform:', ua.platform, 'ua.platformVersion:', ua.platformVersion, 'ua.uaFullVersion:', ua.uaFullVersion);




        // Now map the values here 
        const info = {};
        info.os = ua.platform;        
        info.osVersion = ua.platformVersion; 
        info.browserVersion = ua.uaFullVersion;
        
        console.log('this is the OS platform \n', ua.platform); 


        let OSVersion = info.osVersion; 
        OSVersion = parseFloat(OSVersion); 
        const browserType = info.browserVersion; 


        console.log("this is the OS Version (numeric) \n", OSVersion); 
        console.log('this is the browser type/version \n', browserType);

        // Get the brands here 

        // const brands = await navigator.userAgentData.getHighEntropyValues(["uaFullVersion"]); 
        const brands = navigator.userAgentData.brands || [];
        console.log('these are the brands \n', brands);
        
        
        ua.browser = brands.length ? brands[brands.length - 1].brand : "Unknown";

        const chromeBrowser = ua.browser; 
        

        console.log('this is the browser brand \n', ua.browser); 
        console.log('computed info.os:', info.os, 'computed OSVersion:', OSVersion, 'chromeBrowser:', chromeBrowser);

        if(info.os === 'macOS'){


            if(OSVersion === 15 || OSVersion > 15){


                    console.log('this is the browser info \n', browserType);

                    console.log('this is the OS Version and it matches the 15 num \n', OSVersion); 

                    
                    if(chromeBrowser === "Chrome"){


                        console.log('Chrome browser')
                        return true; 

                    }

                    else{
                        
                        return false; 


                    }


            }

        }

    }


    else{

        console.log('fallback used in the else statement')
        // Fallback using userAgent when userAgentData is not available
        const uaString = navigator.userAgent || '';
        const platformString = navigator.platform || '';
        console.log('fallback UA string:', uaString);
        console.log('fallback platform string:', platformString);

        let os = 'Unknown';
        let osVersionRaw = '';
        let browserBrand = 'Unknown';

        if (/Windows NT/.test(uaString)) {
            os = 'Windows';
            console.log('user is using the windows OS!!!!!')
            const match = uaString.match(/Windows NT ([0-9.]+)/);
            osVersionRaw = match ? match[1] : '';
        } else if (/Mac OS X/.test(uaString) || /Macintosh/.test(uaString) || /MacIntel/.test(platformString)) {
            os = 'macOS';
            const match = uaString.match(/Mac OS X ([0-9_]+)/);
            osVersionRaw = match ? match[1].replace(/_/g, '.') : '';
        } else if (/Android/.test(uaString)) {
            os = 'Android';
            const match = uaString.match(/Android\s([0-9.]+)/);
            osVersionRaw = match ? match[1] : '';
        } else if (/(iPhone|iPad|iPod)/.test(uaString)) {
            os = 'iOS';
            const match = uaString.match(/OS\s([0-9_]+)/);
            osVersionRaw = match ? match[1].replace(/_/g, '.') : '';
        }
        console.log('fallback parsed OS:', os, 'raw version:', osVersionRaw);

        if (/Edg\//.test(uaString)) {
            browserBrand = 'Edge';
        } else if (/OPR\//.test(uaString)) {
            browserBrand = 'Opera';
        } else if (/Chrome\//.test(uaString) && !/Chromium\//.test(uaString) && !/Edg\//.test(uaString) && !/OPR\//.test(uaString)) {
            browserBrand = 'Chrome';
        } else if (/Firefox\//.test(uaString)) {
            browserBrand = 'Firefox';
            console.log('the user is using the firefox browser!!!!!!!::::::'); 
            
        } else if (/Safari\//.test(uaString) && /Version\//.test(uaString)) {
            browserBrand = 'Safari';
        }
        console.log('fallback parsed browser brand:', browserBrand);

        const parsedOsVersion = os === 'macOS' ? parseFloat((osVersionRaw || '').split('.').slice(0, 2).join('.')) : parseFloat(osVersionRaw || '0');

        if (os === 'macOS') {
            if (parsedOsVersion === 15 || parsedOsVersion > 15) {
                console.log('fallback macOS parsedOsVersion:', parsedOsVersion);
                if (browserBrand === 'Chrome') {
                    console.log('returning TRUE: macOS >= 15 and Chrome detected via UA fallback');
                    return true;
                } else {
                    console.log('returning FALSE: macOS >= 15 but not Chrome via UA fallback');
                    return false;
                }
            }
        }
        console.log('returning FALSE: conditions not met in fallback path');
        return false; 


    }

}