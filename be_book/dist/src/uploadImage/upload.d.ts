export declare class UploadController {
    constructor();
    uploadFile(file: Express.Multer.File): Promise<{
        status: number;
        message: string;
        imageUrl: string;
        publicId: string;
    }>;
}
