import { companySchema } from './companyschema';

import { generateMock } from "@anatine/zod-mock";

const sample = generateMock(companySchema); // valid example

console.log("Sample Company:", sample);