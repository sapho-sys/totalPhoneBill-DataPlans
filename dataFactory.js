function MyLogic(data){
    const db = data;
    var totalsmsCost = 0;
    var totalcallCost = 0;
   async function Allocate(username, plan){
    const check = await db.manyOrNone('SELECT id FROM price_plans WHERE plan_name = $2',[username, plan]);
    let newId = check[0].id;
    console.log(newId)
      await enterData(username, newId);
      await getCustomers(newId);

   }

   async function enterData(username, planId){
        const entry = await db.none('INSERT INTO users (username, plan_id) VALUES ($1 , $2)',[username, planId]);
        
   }

   async function getCustomers(planId){
    const getData =await db.manyOrNone('SELECT * FROM users WHERE plan_id = $1', [planId]);
    console.log(getData);
    return getData;
   }

   async function getData(){
    const getData = await db.manyOrNone('SELECT * FROM users')
   }

  async function integrateData(username, usagestring){
    const joinData = await db.manyOrNone('SELECT * FROM price_plans JOIN  users ON price_plans.id = users.plan_id WHERE users.username = $1',[username]);
   const usagestring2 = usagestring.split(",");
   let totalAmt=0;
   for(let i=0; i < usagestring2.length;i++){
    let rendered=usagestring2[i].trim();
    if(rendered ==='call'){
      totalAmt += Math.round(joinData[0].call_price);
    }else if(rendered === 'sms'){
      totalAmt += Math.round(joinData[0].sms_price);
    }
  }


   
   
     
   ;

    return totalAmt;



  }

  async function getTextCost(){
    return  totalsmsCost
  }

  async function getCallCost(){
    return totalcallCost
  }

  async function getTotal(){
    return (await getTextCost() + await getCallCost() );

  }
  



   return {
    Allocate,
    enterData,
    getCustomers,
    getData,
    integrateData,
    getTextCost,
    getCallCost,
    getTotal
   }
   



}

export default MyLogic;