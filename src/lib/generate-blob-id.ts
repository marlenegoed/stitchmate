export default function generateBlobId(existingIds = [-1]): number {
  let randomId
  do {
    randomId = Math.floor(Math.random() * 8)
  } while (existingIds.includes(randomId))
  return randomId
}