import {Noto_Sans} from 'next/font/google';
import {Kalam} from 'next/font/google'
import {Open_Sans} from 'next/font/google';
import {Nunito_Sans} from 'next/font/google';


export const notoSans = Noto_Sans({subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']});

export const kalam = Kalam({subsets: ['latin'], weight: ['300', '400', '700']})

export const openSans = Open_Sans({subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800']})

export const nunitoSans = Nunito_Sans({subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000']})


