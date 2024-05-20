import {justAnotherHand, shortStack} from './fonts';

export default function Logo () {
  return <p className={`
  ${shortStack.className} antialiased
  text-4xl text-center text-slate-800 relative -bottom-1
  `}>
    stitchmate.xyz
  </p>;
}