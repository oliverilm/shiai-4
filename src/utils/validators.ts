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
    if (menWeights && menWeights.length > 0) {
        data.menWeights = JSON.stringify(menWeights)
    }
    if (womenWeights && womenWeights.length > 0) {
        data.womenWeights = JSON.stringify(womenWeights)
    }
    if (unisexWeights && unisexWeights.length > 0) {
        data.unisexWeights = JSON.stringify(unisexWeights)
    }

    return data;
}