import {
  FasilitasYangDimilikiPendaftaranHimpunan,
  Prisma,
} from "@prisma/client";

export type CreatedPendaftaranHimpunan = {
  user: Prisma.UserGetPayload<{
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
  }>;
  divisiPilihan: {
    divisiId: number;
    divisiName: string;
    alasan: string;
  }[];
  pengalamanOrganisasi: {
    name: string;
    jabatan: string;
    tahun: string;
  }[];
  fasilitasYangDimiliki: FasilitasYangDimilikiPendaftaranHimpunan | null;
  bersediaDipindahkan: boolean;
};
