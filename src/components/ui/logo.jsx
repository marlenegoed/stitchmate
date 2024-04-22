import {justAnotherHand} from './fonts';

export default function Logo () {
  return <p className={`
  ${justAnotherHand.className} antialiased
  text-4xl text-center text-slate-800 relative -bottom-1
  `}>
    stitchmate
  </p>;
}