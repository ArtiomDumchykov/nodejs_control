import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { UploadedFile } from "express-fileupload";
import path from "path";

import { configs } from "../configs";
import { EFileType } from "../enums";

class S3Service {
  private s3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: configs.AWS_S3_REGION,
      credentials: {
        secretAccessKey: configs.AWS_S3_SECRET_KEY,
        accessKeyId: configs.AWS_S3_ACCESS_KEY,
      },
    });
  }

  public async uploadFile(
    file: UploadedFile,
    fileId: string,
    fileType: EFileType,
  ): Promise<string> {
    const filePath = this.buildPath(fileType, fileId, file.name);

    await this.s3Client.send(
      new PutObjectCommand({
        Key: filePath,
        Body: file.data,
        ACL: "public-read",
        ContentType: file.mimetype,
        Bucket: configs.AWS_S3_BUKET,
      }),
    );
    return filePath;
  }

  public async deleteFile(fileKey: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Key: fileKey,
        Bucket: configs.AWS_S3_BUKET,
      }),
    );
  }
  public buildPath(
    fileType: EFileType,
    fileId: string,
    fileName: string,
  ): string {
    return `${fileType}/${fileId}/${randomUUID()}${path.extname(fileName)}`;
  }
}

const s3Service = new S3Service();

export { s3Service };
