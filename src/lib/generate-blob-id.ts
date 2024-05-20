import {projectColorEnum} from '@/database/schema';

export default function generateBlobId(): number {
  return Math.floor(Math.random() * projectColorEnum.enumValues.entries.length)
}