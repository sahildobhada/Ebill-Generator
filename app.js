const express=require("express");
const bodyparser=require("body-parser")
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    var units=Number(req.body.units);
    var types=req.body.type;
    var place=req.body.place;
    var fc=fixcharge(types,place);
    var ec=EnergyCharges(units);
    var wheelingcharges=units*1.35;
    var facharge=fac(units);
    var Electricityduty=(fc+ec+wheelingcharges+facharge)*0.16;
    var total=fc+ec+wheelingcharges+Electricityduty+facharge;
    res.write("<h1>Electric Bill Details</h1>");
    res.write("<h3>Fixed Charges      :"+fc+"</h3>");
    res.write("<h3>Energy Charges      :"+ec+"</h3>");
    res.write("<h3>Wheeling Charges      :"+wheelingcharges+"</h3>");
    res.write("<h3>F.A.C      :"+facharge+"</h3>");
    res.write("<h3>Electricity DSuty (16%)      :"+Electricityduty+"</h3>");
    res.write("-----------------------------------------------");
    res.write("<h1>Total Amount           :"+total+"</h1>");
    res.send();
});

function fixcharge(types,place){
    types=types.toLowerCase();
    place=place.toLowerCase();
    if(types=="commercial"){
        return 427;
    }else{
        if(place=="rural"){
            return 105;
        }
    }
    return 115;
}
function EnergyCharges(units){
    var sum=0;
 
    if(units<=100){
        sum=units*3.36;
    }else{
        sum=(units-100)*7.34 +336;
    }
    return sum;
}
function fac(units){
    var sum=0;
    if(units<=100){
        sum=units*0.65;
    }else{
        sum=(units-100)*1.45 +65;
    }
    return sum;
}



app.listen(5000);