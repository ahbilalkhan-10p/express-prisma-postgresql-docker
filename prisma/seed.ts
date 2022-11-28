import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { users } from './seedData'

const prisma = new PrismaClient()

const main = async () => {

  await prisma.$transaction(
    users?.map((item) =>
      prisma.user.upsert({
        update: {},
        create: {
          ...item,
        },
      })
    )
  )
}

main()
  .catch((err) => {
    console.log('Seeding error: ', err)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
