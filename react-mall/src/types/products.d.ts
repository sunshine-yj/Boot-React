interface ProductDTO {
    pno: number;
    pname: string;
    price: number;
    pdesc: string;
    uploadFileNames: string[];
    delFlag: boolean;
}

interface ProductAddResult {
    result?: number;
    error?: string;
}

interface ProductTaskResult {
    actionType: string;
    result: string;
    error?: string;
}