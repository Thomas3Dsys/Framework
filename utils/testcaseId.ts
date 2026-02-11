import { TestInfo  } from "@playwright/test";

export function setTestCaseId(testInfo:TestInfo, customId:string)
{
    console.log("Assigning Test Case ID: "+customId+" to test: "+testInfo.title);
    testInfo.annotations.push({ type: 'test_case_id', description: customId });
}