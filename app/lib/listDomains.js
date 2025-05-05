import { Resend } from 'resend';

export const list = () => {

    const resend = new Resend('re_123456789');

    const res = resend.domains.list();
    console.log('this is the list of domains \n', res); 

    return res; 


}



