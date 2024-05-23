import generateBlobId from '@/lib/generate-blob-id'
import {connection, db} from './db'
import {projects, sections, reminders, userSettings} from './schema'
import generateColor from '@/lib/generate-color'

async function seed() {

  await db.delete(projects)
  await db.delete(sections)
  await db.delete(reminders)
  await db.delete(userSettings)

  // await db.insert(userSettings).values({userId: 'user_2ggkIiS15V0w7nm0Nu5MOUIT27A'})

  for (let i = 0; i <= 100; i++) {


    const projectIds = await db.insert(projects).values({title: 'My First Project', color: generateColor(), blobId: generateBlobId(), userId: 'user_2ggkIiS15V0w7nm0Nu5MOUIT27A'}).returning({id: projects.id})

    const sectionIds = await db.insert(sections).values({title: 'my First Section', projectId: projectIds[0].id, position: 0, active: true}).returning({id: sections.id})

    await db.insert(reminders).values([
      {
        sectionId: sectionIds[0].id,
        title: 'Short Row 1',
        note: 'RS: Purl to 1 st before marker, sl 1 wiyb, sm, purl to the last 3 sts, w&t',
        type: 'range',
        from: 1,
        until: 2
      },

      {
        sectionId: sectionIds[0].id,
        title: 'Short Row 2',
        note: 'WS: Knit to marker, sm, p1, knit to the last 3 sts, w&t.',
        type: 'range',
        from: 2,
        until: 2
      },

      {
        sectionId: sectionIds[0].id,
        title: 'Short Rows 3 & 4',
        note: 'RS: Purl to 1 sts before marker, sl 1 wiyb, sm, purl to 4 sts before previously wrapped st, w&t. WS: Knit to marker, sm, p1, knit to 4 sts before previously wrapped st, w&t.',
        type: 'range',
        from: 2,
        until: 2
      },

      {
        sectionId: sectionIds[0].id,
        notification: false,
        title: 'decrease',
        note: 'K1, k2tog, knit to the last 3 sts, ssk, k1 (2 sts dec).',
        type: 'repeating',
        interval: 9,
        times: 10,
        start: 1
      }
    ])

  }
  console.log('done seeding')
  await connection.end()


}

seed()

