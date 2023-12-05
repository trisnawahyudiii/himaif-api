import { FasilitasYangDimilikiPendaftaranHimpunan } from "@prisma/client";
import {
  CreatedPendaftaranHimpunan,
  PendaftaranHimpunanWithAttributes,
} from "../types";

export const pendaftaranPayloadMapper = (
  payload: PendaftaranHimpunanWithAttributes
): CreatedPendaftaranHimpunan => {
  const {
    name,
    image,
    nickName,
    email,
    nim,
    gender,
    idLine,
    agama,
    address,
    tempatTanggalLahir,
    phone,
    penyakitKhusus,
  } = payload.user;

  const divisiPilihan = payload.divisiPilihan.map((pilihan) => ({
    divisiId: pilihan.divisi.id,
    divisiName: pilihan.divisi.name,
    alasan: pilihan.alasan,
  }));

  const pengalamanOrganisasi = payload.PengalamanOrganisasiHimpunan.map(
    ({ name, jabatan, tahun }) => ({ name, jabatan, tahun })
  );

  return {
    user: {
      name,
      image,
      nickName,
      email,
      nim,
      gender,
      idLine,
      agama,
      address,
      tempatTanggalLahir,
      phone,
      penyakitKhusus,
    },
    divisiPilihan,
    pengalamanOrganisasi,
    fasilitasYangDimiliki: payload.FasilitasYangDimilikiPendaftaranHimpunan,
    bersediaDipindahkan: payload.bersediaDipindahkan,
    hobi: payload.hobi,
    skill: payload.skill,
    alasanMasukHimpunan: payload.alasanMasukHimpunan,
  };
};
