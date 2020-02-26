import { IntConstText, optVInputString } from "../types";

export const constNickname:IntConstText = {
    alpha: "en-US",
    length: {min: 3, max: 30},
};

export const textInputConst:optVInputString = {
    inputLanguage: "en-US",
    stringLength: {
        min: 3,
        max: 60,
    },
};