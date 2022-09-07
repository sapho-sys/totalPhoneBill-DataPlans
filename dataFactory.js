function MyLogic(data){
    const db = data;
    var totalCost =0;
    // var type ="";
    var billSelected;
    async function addData(planType){
          billSelected = await db.manyOrNone('SELECT sms_price, call_price FROM price_plans WHERE plan_name = $1',[planType]);
        // return billSelected[0].id
       

    }

    async function getData(){
        return billSelected;     
    }

    async function setType(type){
         if(type === "Call"){
            totalCost += billSelected.call_price;
        }else if(type === "SMS"){
            totalCost += billSelected.sms_price;
        }
    }

    async function getTotalType(){
        return totalCost;
    }
    return{
        addData,
        getData,
        setType,
        getTotalType

    }



}

export default MyLogic;