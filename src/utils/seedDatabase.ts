import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = ["Cabelo", "Unhas", "Depilação", "Outros"];

  await prisma.category.findMany();
  for (const categoryName of categories) {
    await prisma.category.create({
      data: {
        name: categoryName,
      },
    });
  }

  const services = [
    { name: "Corte", price: 50, duration: 30, categoryName: "Cabelo" },
    { name: "Tratamento", price: 80, duration: 60, categoryName: "Cabelo" },
    { name: "Coloração", price: 120, duration: 120, categoryName: "Cabelo" },
    { name: "Escova", price: 40, duration: 45, categoryName: "Cabelo" },
    {
      name: "Alongamento Gel",
      price: 100,
      duration: 90,
      categoryName: "Unhas",
    },
    { name: "Com Francesa", price: 60, duration: 60, categoryName: "Unhas" },
    { name: "Verniz", price: 30, duration: 30, categoryName: "Unhas" },
    { name: "Manutenção", price: 50, duration: 45, categoryName: "Unhas" },
    { name: "Axilas", price: 150, duration: 30, categoryName: "Depilação" },
    {
      name: "Virilha Completa",
      price: 80,
      duration: 45,
      categoryName: "Depilação",
    },
    {
      name: "Perna Inteira",
      price: 80,
      duration: 60,
      categoryName: "Depilação",
    },
    {
      name: "Maquiagem profissional",
      price: 100,
      duration: 60,
      categoryName: "Outros",
    },
    {
      name: "Massagem Corporal",
      price: 70,
      duration: 60,
      categoryName: "Outros",
    },
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
          duration: service.duration,
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
