import {type Reminder} from './reminder';


// Example data 
export const mockReminders: Reminder[] = [

  {
    id: '-1',
    notification: true,
    title: 'Short Row 1',
    note: 'RS: Purl to 1 st before marker, sl 1 wiyb, sm, purl to the last 3 sts, w&t',
    repeat: {
      type: 'for-rows',
      from: 1,
      until: 1
    }
  },

  {
    id: '-2',
    notification: true,
    title: 'Short Row 2',
    note: 'WS: Knit to marker, sm, p1, knit to the last 3 sts, w&t.',
    repeat: {
      type: 'for-rows',
      from: 2,
      until: 2
    }
  },

  {
    id: '-3',
    notification: true,
    title: 'Short Rows 3 & 4',
    note: 'RS: Purl to 1 sts before marker, sl 1 wiyb, sm, purl to 4 sts before previously wrapped st, w&t. WS: Knit to marker, sm, p1, knit to 4 sts before previously wrapped st, w&t.',
    repeat: {
      type: 'for-rows',
      from: 2,
      until: 2
    }
  },

  {
    id: '-4',
    notification: false,
    title: 'decrease',
    note: 'K1, k2tog, knit to the last 3 sts, ssk, k1 (2 sts dec).',
    repeat: {
      type: 'every',
      interval: 9,
      times: 10,
      start: 1
    }
  },

];