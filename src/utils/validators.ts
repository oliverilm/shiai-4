import { CategoryInCompetitionPost } from "./interfaces";

interface CategoryData {
    competition: string;
    menWeights?: string[];
    womenWeights?: string[];
    unisexWeights?: string[];
    startingYear: number | null;
    endingYear: number | null;
    identifier: string;
    category: number | undefined;
    rules: string[];
    id?: number;
    amountOverAllowed: number;
}


export const validateCategory = (data: CategoryData): boolean => {

    return true;
}

export const formatCategory = ({
    competition,
    menWeights,
    womenWeights,
    unisexWeights,
    startingYear,
    endingYear,
    identifier,
    category,
    rules,
    id,
    amountOverAllowed
}: CategoryData): CategoryInCompetitionPost => {
    const data: CategoryInCompetitionPost = {
        competition,
        startingYear: startingYear?.toString() ?? "0",
        endingYear: endingYear?.toString() ?? "0",
        identifier,
        amountOverAllowed: amountOverAllowed.toString() ?? "0",
        category: category || 0,
        rules: JSON.stringify(rules)
    };
    if (id){
        data.id = id
    }
    data.menWeights = JSON.stringify(menWeights)
    data.womenWeights = JSON.stringify(womenWeights)
    data.unisexWeights = JSON.stringify(unisexWeights)

    return data;
}