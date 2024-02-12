import type { uploadThingFileRouter } from "@/app/api/uploadthing/core";
import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";

export const UploadButton = generateUploadButton<uploadThingFileRouter>();
export const UploadDropzone = generateUploadDropzone<uploadThingFileRouter>();