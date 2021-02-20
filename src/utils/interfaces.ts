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