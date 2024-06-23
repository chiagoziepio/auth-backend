 const path = require("path")
 const fs = require("fs")
 const fspromises = require("fs").promises
 const { format }= require("date-fns");
 const { v4: uuid } = require("uuid")

 const logAction = async(msg,logFile)=>{
    const dateTime = format(new Date(),'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${msg}\n`;
    try {
        if(!fs.existsSync(path.join(__dirname, "..", "logs"))){
            await fspromises.mkdir(path.join(__dirname, "..","logs"));
        }
        await fspromises.appendFile(path.join(__dirname, "..", "logs", logFile),logItem)
        
    } catch (error) {
        console.log(error);
    }
 }


 const logEvent = (req, res,next)=>{
    logAction(`${req.url}\t${req.method}`, "eventsLogs.txt");
    next()
 };

 const errorLogger = (err,req,res,next)=>{
    logAction(`${err.name}: ${err.message}`, "errorlog.txt")
    console.error(err.stack)
    res.status(400).json({msg:err.massage})
 }

 module.exports = { logEvent, errorLogger}