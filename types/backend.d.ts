
export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: Record<string, string>;
        nextOption?: RequestInit;
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

    interface ICategory {
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
        instructor: {
            name: string,
            id: string
        }
        instructorId: string
        categoryId: string
        subCategoryId: string
        levelId: string
        level: {
            name: string,
            id: string
        }
        sections: ISection[]
        comments?: IComment[]
        ratings?: IRating[]
        averageRating?: number
        statusName: string
    }

    interface ILevel {
        id: string
        name: string
    }

    interface IResource {
        id: string
        name: string
        fileUrl: string
        sectionId: string
    }

    interface ISection {
        id: string
        title: string
        description: string
        videoUrl: string
        position: number
        isPublished: boolean
        isFree: boolean
        courseId: string
        resources: IResource[]
    }

    interface IComment {
        id: string
        content: string
        userId: string
        courseId: string
        createdAt: Date
        updatedAt: Date
    }

    interface IRating {
        id: string
        content: string
        quality: number
        userId: string
        courseId: string
        createdAt: Date
        updatedAt: Date
    }
}
