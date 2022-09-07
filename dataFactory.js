function MyLogic(data){
    const db = data;
    var totalCost =0;
    var errorMsg = '';
    // var type ="";
    var billSelected;
    async function addData(User, planType){
        if(User !== '' && planType !== ''){
            billSelected = await db.manyOrNone('SELECT sms_price, call_price FROM price_plans WHERE plan_name = $1',[planType]); 
            if( await setType("CALL")){
                totalCost += billSelected[0].call_price;
            }else if( await setType("SMS")){
                totalCost += billSelected[0].sms_price;
            }
        }else{
            errorMsg = 'error provide your name and your prefered plan';

        }
         

    }

    async function getData(){
        return billSelected;     
    }

    async function errors(){
        return errorMsg;

    }


    async function setType(type){
       return type;
    }

    async function getTotalType(){
        return totalCost;
    }
    return{
        addData,
        getData,
        setType,
        getTotalType,
        errors

    }



}

export default MyLogic;