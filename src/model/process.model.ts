import { Schema, model } from "mongoose";

let stringCommon = {
  type: String,
  trim: true,
};

const processSchema = new Schema(
  {
    documentName: {
      ...stringCommon,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    status: {
      ...stringCommon,
      enum: ["Em andamento", "Finalizado"],
      default: "Em andamento",
    },
    details: {
      ...stringCommon,
      required: true,
      minlength: 3,
      maxlength: 600,
    },
    dateInit: {
      type: Date,
      transform: (v: Date): string => v.toLocaleDateString(),
      default: new Date(),
    },
    comments: [{ type: String, minlength: 3, maxlength: 600 }],
    dateEnd: {
      type: Date,
      transform: (v: Date): string => v.toLocaleDateString(),
    },
    setor: {
      ...stringCommon,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Process", processSchema);
