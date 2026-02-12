import { test, expect } from '@playwright/test';
import { MyAccountPage } from '../pages/MyAccountPage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
import { Database } from "../utils/database";

//Load JSON test data logindata.json

const jsonPath="testdata/logindata.json";
const jsonTestData=DataProvider.getTestDataFromJson(jsonPath);


for(const data of jsonTestData)
{
   test(`Login Test with JSON Data: ${data.testName} @datadriven`, async({page})=>{

        const config = new TestConfig(); // create instance


        if(data.expected.toLowerCase()==='success')
        {
            //query database, exit if user already created.
            const userExists = await Database.doesUserExist(data.email);

            if(!userExists)
            {
            console.log(`User with email ${data.email} does not exist. Please run the environment user creation setup routines first.`);
            expect(userExists).toBeTruthy(); // Fail the test if user does not exist
            }
        }


        await page.goto(config.appUrl);    // getting appURL from test.config.ts file

        const homePage = new HomePage(page);
        const loginPage = await homePage.navigateLogin();
        await loginPage.login(data.email, data.password);

        if(data.expected.toLowerCase()==='success')
        {
            const myAccountPage = new MyAccountPage(page);
            const isLoggedIn = await myAccountPage.doesPageExist();
            expect(isLoggedIn).toBeTruthy();

        }
        else{
            const errorMessage=await loginPage.alerts.getAlertDangerMessage();
            //expect(errorMessage).toBe('Warning: No match for E-Mail Address and/or Password.');
            expect(errorMessage).toContain('Warning: No match');
        }
    })

}



//Load CSV test data logindata.json

const csvPath = "testdata/logindata.csv";
const csvTestData = DataProvider.getTestDataFromCsv(csvPath);


for(const data of csvTestData)
{
   test(`Login Test with CSV Data: ${data.testName} @datadriven`, async({page})=>{


        if(data.expected.toLowerCase()==='success')
        {
            //query database, exit if user already created.
            const userExists = await Database.doesUserExist(data.email);

            if(!userExists)
            {
            console.log(`User with email ${data.email} does not exist. Please run the environment user creation setup routines first.`);
            expect(userExists).toBeTruthy(); // Fail the test if user does not exist
            }
        }


        const config = new TestConfig(); // create instance
        await page.goto(config.appUrl);    // getting appURL from test.config.ts file

        const homePage = new HomePage(page);
        const loginPage = await homePage.navigateLogin();
        await loginPage.login(data.email, data.password);

        if(data.expected.toLowerCase()==='success')
        {
            const myAccountPage=new MyAccountPage(page);
            const isLoggedIn=await myAccountPage.doesPageExist();
            expect(isLoggedIn).toBeTruthy();

        }
        else{
            const errorMessage=await loginPage.alerts.getAlertDangerMessage();
            //expect(errorMessage).toBe('Warning: No match for E-Mail Address and/or Password.');
            // Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."
            expect(errorMessage).toContain('Warning: No match');    
        }
    })

}