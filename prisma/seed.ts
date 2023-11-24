import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.role.createMany({
    data: [{ name: "SUPER_ADMIN" }, { name: "ADMIN" }, { name: "MAHASISWA" }],
    skipDuplicates: true,
  });

  const encryptedPassword = hashSync("BukitBersalju2015%", 10);

  let superAdmin = await prisma.user.findUnique({
    where: { email: "himaif.udayana@gmail.com" },
  });

  if (!superAdmin) {
    superAdmin = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "himaif.udayana@gmail.com",
        address: "Gedung BG Lt 2, Kampus Informatika, Jimbaran",
        gender: "LAKI_LAKI",
        nim: "2008561999",
        password: encryptedPassword,
        phone: "081237754778",
        agama: "hindu",
        tempatTanggalLahir: "Jimbaran, 14 April 2006",
        UserRole: {
          createMany: {
            data: [{ roleId: 1 }, { roleId: 2 }, { roleId: 3 }],
          },
        },
      },
      include: {
        UserRole: {
          select: {
            role: true,
          },
        },
      },
    });
  }

  console.log({ roles, superAdmin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
