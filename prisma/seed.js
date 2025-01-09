import { PrismaClient }  from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const usuario = await prisma.usuarios.create({
    data: {
      cpf: 12345,
      nome: 'Bibliotecário',
      senha: 12345,
      tipo: 'func'
    },
  })

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })