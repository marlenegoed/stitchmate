import {justAnotherHand} from './fonts';

export default function Logo () {
  return <p className={`
  ${justAnotherHand.className} antialiased
  text-4xl text-center
  `}>
    stitchmate
  </p>;
}