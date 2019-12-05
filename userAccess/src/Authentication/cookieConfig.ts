import { CookieOptions } from "express";

export const confCookieToken:CookieOptions = {
    httpOnly: true,
    maxAge: 3600000,
    secure: true,
};