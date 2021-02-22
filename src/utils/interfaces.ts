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
    underValue: string;
    value: string;
    created: Date;
}

export interface CategoryInCompetition {
    menWeights: string;
    womenWeights: string;
    unisexWeights: string;
    identifier: string;
    amountOverAllowed: string;
    startingYear: string;
    endingYear: string;
    competition: Competition;
    category: Category;
    rules: string;
    created: string;
}