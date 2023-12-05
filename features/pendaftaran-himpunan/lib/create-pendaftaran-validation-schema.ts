import z from "zod";

export const createPendaftaranValidationSchema = z.object({
  hobi: z.string({ required_error: "hobi is required" }),
  alasanMasukHimpunan: z.string({
    required_error: "alasanMasukHimpunan is required",
  }),
  bersediaDipindahkan: z.boolean({
    required_error: "bersediaDipindahkan is required",
  }),
  himpunanId: z.number({ required_error: "HimpunanId is required" }),
  divisiPilihan: z
    .array(
      z.object({
        divisiId: z.number({ required_error: "divisiId is required" }),
        divisiName: z.string({ required_error: "divisi name is required" }),
        alasan: z
          .string({ required_error: "Alasan is required" })
          .min(20, "alasan must contain minimum 20 character"),
      })
    )
    .refine((value) => value.length === 2, {
      message: "both divisi choice must be selected",
    })
    .refine((value) => value[0].divisiId !== value[1].divisiId, {
      message: "the selected divisi must different",
    }),
  pengalamanOrganisasi: z
    .array(
      z.object({
        name: z.string({
          required_error: "oraganization/event name is required",
        }),
        jabatan: z.string({
          required_error: "possition/jabatan is required",
        }),
        tahun: z.string({
          required_error: "eventTime/tahun is required",
        }),
      })
    )
    .min(0),
  fasilitasYangDimiliki: z.object({
    motor: z.boolean({ required_error: "facility 'motor' is required" }),
    mobil: z.boolean({ required_error: "facility 'mobil' is required" }),
    handphone: z.boolean({
      required_error: "facility 'handphone' is required",
    }),
    laptop: z.boolean({ required_error: "facility 'laptop' is required" }),
    handycam: z.boolean({ required_error: "facility 'handycam' is required" }),
    camera: z.boolean({ required_error: "facility 'camera' is required" }),
    other: z.optional(z.string()),
  }),
  skillPendaftaranHimpunan: z.object({
    publicSpeaking: z.boolean({
      required_error: "skill 'publicSpeaking' is required",
    }),
    modernDance: z.boolean({
      required_error: "skill 'modernDance' is required",
    }),
    tariTraditional: z.boolean({
      required_error: "skill 'tariTraditional' is required",
    }),
    alatMusik: z.boolean({
      required_error: "skill 'alatMusik' is required",
    }),
    menyanyi: z.boolean({
      required_error: "skill 'menyanyi' is required",
    }),
    fotografi: z.boolean({
      required_error: "skill 'fotografi' is required",
    }),
    videografi: z.boolean({
      required_error: "skill 'videografi' is required",
    }),
    design: z.boolean({
      required_error: "skill 'design' is required",
    }),
    buluTangkis: z.boolean({
      required_error: "skill 'buluTangkis' is required",
    }),
    futsal: z.boolean({
      required_error: "skill 'futsal' is required",
    }),
    catur: z.boolean({
      required_error: "skill 'catur' is required",
    }),
    pubg: z.boolean({
      required_error: "skill 'pubg' is required",
    }),
    mobileLegend: z.boolean({
      required_error: "skill 'mobileLegend' is required",
    }),
    valorant: z.boolean({
      required_error: "skill 'valorant' is required",
    }),
    other: z.optional(z.string()),
  }),
});
