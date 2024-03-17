const express = require("express");
const compression = require("compression");
const cors=require("cors");
const httpStatus=require("http-status");
const routes =require("./routes/index");
const helmet=require("helmet");
const passport=require("passport");
const {errorHandler} = require("./middlewares/error");
const {jwtStrategy}=require("./config/passport");
const ApiError=require("./utils/ApiError");

const app=express();

// for setting the HTTP security headers 
app.use(helmet());

// json parser
app.use(express.json());


//for parsing the urlencoded req body
app.use(express.urlencoded({extended:true}));

// for compression the request data leads to improvement in nodejs performance
app.use(compression());


// enables linking forntend with backend

app.use(cors());

app.options("*",cors());


app.use(passport.initialize());
passport.use("jwt",jwtStrategy);

// reroute all api

app.use("/api",routes);


// if no matches the particulr route  send the 404 code
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found")); 
});

// err handler
app.use(errorHandler);


module.exports=app;
