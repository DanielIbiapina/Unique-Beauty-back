import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = ["Cabelo", "Unhas", "Depilação", "Outros"];

  for (const categoryName of categories) {
    await prisma.category.create({
      data: {
        name: categoryName,
      },
    });
  }

  const services = [
    { name: "Corte", price: 50, categoryName: "Cabelo" },
    { name: "Tratamento", price: 80, categoryName: "Cabelo" },
    { name: "Coloração", price: 120, categoryName: "Cabelo" },
    { name: "Escova", price: 40, categoryName: "Cabelo" },
    { name: "Alongamento Gel", price: 100, categoryName: "Unhas" },
    { name: "Com Francesa", price: 60, categoryName: "Unhas" },
    { name: "Verniz", price: 30, categoryName: "Unhas" },
    { name: "Manutenção", price: 50, categoryName: "Unhas" },
    { name: "Axilas", price: 150, categoryName: "Depilação" },
    { name: "Virilha Completa", price: 80, categoryName: "Depilação" },
    { name: "Perna Inteira", price: 80, categoryName: "Depilação" },
    { name: "Maquiagem profissional", price: 100, categoryName: "Outros" },
    { name: "Massagem Corporal", price: 70, categoryName: "Outros" },
  ];

  for (const service of services) {
    const category = await prisma.category.findUnique({
      where: { name: service.categoryName },
    });

    if (category) {
      await prisma.service.create({
        data: {
          name: service.name,
          price: service.price,
          categoryId: category.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
