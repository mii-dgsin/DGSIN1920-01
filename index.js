var express = require("express");
var path = require('path');
var app = express();
app.get("/hello", (req, res) => {
    res.send("hello world");
});

app.use("/", express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT || 8080).on("error",(e)=>{
    console.error("Server NOT ready!");
});

console.log("Server ready");