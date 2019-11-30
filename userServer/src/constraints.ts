import { optVInputString } from './types';
import validator from 'validator';

export const textInputConst:optVInputString = {
    inputLanguage: "en-US",
    stringLength: {
        min: 3,
        max: 60,
    },
};

export const passInputConst:validator.IsLengthOptions = {
    min: 5,
    max: 40
};