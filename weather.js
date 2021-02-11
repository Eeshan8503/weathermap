const express=require("express");
const app =express();
const bp=require("body-parser");
const https=require("https");
app.use(bp.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.use(express.static("public"));
app.post("/",function(req,res){
  const city=req.body.city;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=cfe6c59edaa1e021175988b8ee3bb934&units=metric";
  https.get(url,function(response){
    response.on("data",function(data){
      const a=JSON.parse(data);
      const temp=a.main.temp;
      res.write("<h1>The temprature at " + city +" is "+temp+" degree celcius</h1>");
      const wd=a.weather[0].description;
      const icon=a.weather[0].icon;
      const iconurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>"+wd+"</h1>");
      res.write("<img src="+iconurl+">");
      res.send();
    });
  });
});
app.listen(3000, function(){
  console.log("SERVER RUNNING");
});
