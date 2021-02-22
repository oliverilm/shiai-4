export interface Competition {
    name: string;
    image: string;
    slug: string;
    description: string;
    dateRange: string | any;
    location: string;
    registrationEndDate: string;
    owner: string;
    registrationFee: string;
    currency: string;
    priorityLevel: string;
    uuid: string;
    isOwner: boolean;
    isPublished: boolean;
    created: string;
}

export interface Category {
    id: number;
    sex: string;
    underValue: string;
    value: string;
    created: Date;
}

export interface WeightCategory {
    id: string;
    category: Category;
    weight: string;
    identifier: string;
    amountOverAllowed: string;
    created: Date;
}

export interface CategoryInCompetition {
    competition: string;
    weightCategory: WeightCategory;
    rules: string;
    created: Date;
}