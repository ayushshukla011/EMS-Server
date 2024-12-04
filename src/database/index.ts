import { PrismaClient } from '@prisma/client'
import { PrismaClientInitializationError } from '@prisma/client/runtime/library'



const prisma = new PrismaClient()

console.log('DB Init')



async function main() {
    await prisma.$connect();
    console.log("DB Connected");
}

main()
  .catch(async (e) => {
    // console.error(e)
    console.log('Prisma failed to connect to the database.', {e});
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });




export default prisma