import assert from "assert";
import dataFactory from "../dataFactory.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({});

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:sap123@localhost:5432/bill_plans';

const config = {
    connectionString
}

if (process.env.NODE_ENV == 'production') {
    config.ssl = {
        rejectUnauthorized: false
    }
}



const db = pgp(config);

describe("Testing functions with database logic", function(){

    // beforeEach(async function () {
    //     // clean the tables before each test run
    //     // await db.query('TRUNCATE TABLE reg_plates restart identity;');
    //     await db.query('DELETE FROM reg_numbers;')
    // });

    it('should be able to get cost for SMS100 - Price Plan',async function(){
        let regEntry = dataFactory(db)
        await regEntry.addData("Sapho","sms100");
        assert.deepEqual([ { call_price: 2.35 , sms_price: 0.20 } ], await regEntry.getData())
    });
    it('should be able to get cost for SMS100 - Price Plan',async function(){
        let regEntry = dataFactory(db)
        await regEntry.addData("","sms100");
        assert.deepEqual("error provide your name and your prefered plan", await regEntry.errors())
    });

    it('should be able to get cost for CALL100 - Price Plan',async function(){
        let regEntry = dataFactory(db)
        await regEntry.addData("Thami","call100");
        assert.deepEqual([ { call_price: 1.75 , sms_price: 0.45 } ], await regEntry.getData())
    });

    it('should be able to get cost for text-me - Price Plan',async function(){
        let regEntry = dataFactory(db)
        await regEntry.addData("Hluma","text-me");
        assert.deepEqual([ { call_price: 1.54 , sms_price: 0.17 } ], await regEntry.getData())
    });

    it('should be able to get cost for Call',async function(){
        let regEntry = dataFactory(db)
        await regEntry.addData("Thanos","call100");
        
        assert.deepEqual("01.75", await regEntry.getTotalType())
    });

    it('should be able to get totalcost for Sms',async function(){
        let regEntry = dataFactory(db)
        await regEntry.addData("Thanos","sms100");
        assert.deepEqual("02.35", await regEntry.getTotalType())
    });

    it('should be able to get totalcost for text-me',async function(){
        let regEntry = dataFactory(db)
        await regEntry.addData("Thanos","text-me");
        assert.deepEqual("01.54", await regEntry.getTotalType())
    });

   
    

    


})
