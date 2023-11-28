import { Prisma } from "@prisma/client";

export type PendaftaranHimpunanWithAttributes =
  Prisma.PendaftaranHimpunanGetPayload<{
    include: {
      user: {
        select: {
          name: true;
          image: true;
          nickName: true;
          email: true;
          nim: true;
          gender: true;
          idLine: true;
          agama: true;
          address: true;
          tempatTanggalLahir: true;
          phone: true;
          penyakitKhusus: true;
        };
      };
      divisiPilihan: {
        select: {
          divisi: true;
          alasan: true;
        };
      };
      PengalamanOrganisasiHimpunan: true;
      FasilitasYangDimilikiPendaftaranHimpunan: true;
    };
  }>;
