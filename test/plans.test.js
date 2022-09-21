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

    beforeEach(async function () {
        // clean the tables before each test run
        await db.query('TRUNCATE TABLE users restart identity;');
        await db.query('DELETE FROM users;')
    });

    it('should be able to allocate Sapho to the sms100 - Price Plan',async function(){
        let regEntry = dataFactory(db)
        await regEntry.Allocate("Sapho","sms100");
        assert.deepEqual([ {id: 1 ,username: "Sapho",plan_id: 1 } ], await regEntry.getCustomers(1))
    });

    it('should be able to allocate Thanos to the call100 - Price Plan',async function(){
        let regEntry = dataFactory(db)
        await regEntry.Allocate("Thanos","call100");
        assert.deepEqual([ { id: 1, username: 'Thanos', plan_id: 2 } ], await regEntry.getCustomers(2))
    });

    it('should be able to get the total cost for a call & sms made by Hluma on call100 - Price Plan',async function(){
        let regEntry = dataFactory(db)
        await regEntry.Allocate("Hluma","call100");
        const usage = "call, sms";
        await regEntry.integrateData("Hluma", usage)
        assert.deepEqual( "2", await regEntry.integrateData("Hluma", usage))
    });




   
    

    after( async function() {
        db.$pool.end();
    });


})
