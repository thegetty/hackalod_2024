import local_en from "./en.json";
import merge from "lodash.merge";
import { locales } from "@thegetty/getty-ui";

const en = merge(locales.messages.en, local_en, local_en);

export const messages = { en };
