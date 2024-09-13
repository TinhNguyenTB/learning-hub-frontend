export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }

    interface ICategory<subCategory> {
        id: string
        name: string
        subCategories: ISubcategory[]
    }

    interface ISubcategory {
        id: string
        name: string
        categoryId: string
    }

    interface ICourse {
        id: string
        title: string
        subTitle: string
        description: string
        imageUrl: string
        price: number
        isPublished: boolean
        instructorId: string
        categoryId: string
        subCategoryId: string
        levelId: string
    }
}
