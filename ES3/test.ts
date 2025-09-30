import { companySchema } from './companyschema';

import { generateMock } from "@anatine/zod-mock";

const sample = generateMock(companySchema); // valid example

const N_EXAMPLES = 5000;

for (let i = 0; i < N_EXAMPLES; i++) {
    const sample = generateMock(companySchema); // valid example
    console.log(`Sample Company ${i + 1}:`, sample);
}
