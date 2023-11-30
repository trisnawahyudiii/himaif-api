import { Request, Response } from "express";
import {
  pendaftaranPayloadMapper,
  createPendaftaranValidationSchema,
} from "../features/pendaftaran-himpunan/lib";
import { CreatedPendaftaranHimpunan } from "../features/pendaftaran-himpunan/types";
import createHttpError from "http-errors";
import { db } from "../lib/db";
import { handleError } from "../lib/handleError";
import { SuccessResponse } from "../types";

export const create = async (req: Request, res: Response) => {
  try {
    const validatedData = createPendaftaranValidationSchema.parse(req.body);

    const target = await db.himpunan.findUnique({
      where: { id: validatedData.himpunanId },
    });

    if (!target) throw createHttpError(404, "Himpunan not found");

    const data = await db.pendaftaranHimpunan.create({
      data: {
        bersediaDipindahkan: validatedData.bersediaDipindahkan,
        himpunanId: validatedData.himpunanId,
        userId: req.user.id,
        divisiPilihan: {
          createMany: {
            data: validatedData.divisiPilihan.map((pilihan) => ({
              divisiId: pilihan.divisiId,
              alasan: pilihan.alasan,
            })),
          },
        },
        PengalamanOrganisasiHimpunan: {
          createMany: {
            data: validatedData.pengalamanOrganisasi.map((pengalaman) => ({
              name: pengalaman.name,
              jabatan: pengalaman.jabatan,
              tahun: pengalaman.tahun,
            })),
          },
        },
        FasilitasYangDimilikiPendaftaranHimpunan: {
          create: validatedData.fasilitasYangDimiliki,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            nickName: true,
            email: true,
            nim: true,
            gender: true,
            idLine: true,
            agama: true,
            address: true,
            tempatTanggalLahir: true,
            phone: true,
            penyakitKhusus: true,
          },
        },
        divisiPilihan: {
          select: {
            divisi: true,
            alasan: true,
          },
        },
        PengalamanOrganisasiHimpunan: true,
        FasilitasYangDimilikiPendaftaranHimpunan: true,
      },
    });

    const createdPendaftaran: CreatedPendaftaranHimpunan =
      pendaftaranPayloadMapper(data);

    const successResponse: SuccessResponse<CreatedPendaftaranHimpunan> = {
      meta: {
        success: true,
        message: "Register attempted successfully",
      },
      payload: createdPendaftaran,
    };

    return res.status(201).json(successResponse);
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const data = await db.pendaftaranHimpunan.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
            nickName: true,
            email: true,
            nim: true,
            gender: true,
            idLine: true,
            agama: true,
            address: true,
            tempatTanggalLahir: true,
            phone: true,
            penyakitKhusus: true,
          },
        },
        divisiPilihan: {
          select: {
            divisi: true,
            alasan: true,
          },
        },
        PengalamanOrganisasiHimpunan: true,
        FasilitasYangDimilikiPendaftaranHimpunan: true,
      },
    });

    const pendaftaranData = data.map((pendaftaran) =>
      pendaftaranPayloadMapper(pendaftaran)
    );

    const successResponse: SuccessResponse<CreatedPendaftaranHimpunan[]> = {
      meta: {
        success: true,
        message: "Registration data obtained successfully",
      },
      payload: pendaftaranData,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
};

export const getSingle = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (
      !req.user.role.includes("SUPER_ADMIN") &&
      parseInt(req.user.id) !== parseInt(userId)
    ) {
      throw createHttpError(
        403,
        "You are not permited to access other user registration data"
      );
    }
    const pendaftaran = await db.pendaftaranHimpunan.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            nickName: true,
            email: true,
            nim: true,
            gender: true,
            idLine: true,
            agama: true,
            address: true,
            tempatTanggalLahir: true,
            phone: true,
            penyakitKhusus: true,
          },
        },
        divisiPilihan: {
          select: {
            divisi: true,
            alasan: true,
          },
        },
        PengalamanOrganisasiHimpunan: true,
        FasilitasYangDimilikiPendaftaranHimpunan: true,
      },
    });

    if (!pendaftaran) throw createHttpError(404, "Pendaftaran not found");

    const pendaftaranData = pendaftaranPayloadMapper(pendaftaran);

    const successResponse: SuccessResponse<CreatedPendaftaranHimpunan> = {
      meta: {
        success: true,
        message: "Data obtained successfully",
      },
      payload: pendaftaranData,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const target = await db.pendaftaranHimpunan.findUnique({
      where: { userId: parseInt(userId) },
    });

    if (!target)
      throw createHttpError(404, "PendaftaranHimpunan data not found");

    const deletedData = await db.pendaftaranHimpunan.delete({
      where: { id: target.id },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            nickName: true,
            email: true,
            nim: true,
            gender: true,
            idLine: true,
            agama: true,
            address: true,
            tempatTanggalLahir: true,
            phone: true,
            penyakitKhusus: true,
          },
        },
        divisiPilihan: {
          select: {
            divisi: true,
            alasan: true,
          },
        },
        PengalamanOrganisasiHimpunan: true,
        FasilitasYangDimilikiPendaftaranHimpunan: true,
      },
    });

    const pendaftaranData = pendaftaranPayloadMapper(deletedData);

    const successResponse: SuccessResponse<CreatedPendaftaranHimpunan> = {
      meta: {
        success: true,
        message: "Data PendaftaranHimpunan deleted successfully",
      },
      payload: pendaftaranData,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
};
