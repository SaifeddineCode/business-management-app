import rateLimit from "express-rate-limit";



export const loginLimiter = rateLimit({
    windowMs : 10 * 60 * 1000, // this is around 10 minutes meaning, you can not do more than 5 request per 10 minutes ... -_- saif explanation ahaha
    max : 5,
    message:{
        error : "TOO many login attempts, try again later"
    },
    standardHeaders:true,
    legacyHeaders:false
})



