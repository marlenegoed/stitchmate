import {justAnotherHand} from './fonts';

export default function Logo () {
  return <p className={`
  ${justAnotherHand.className} antialiased
  text-3xl text-left
  `}>
    stitchmate
  </p>;
}