//const { format } = require('date-fns')
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import colors from "colors";

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const __dirname = path.resolve();
  console.log(colors.red(__dirname));
  const existFile = fs.existsSync(path.join(__dirname, "backend", "logs"));

  try {
    if (!existFile) {
      // console.log(colors.red("Logs folder does not exist"));
      fs.mkdirSync(path.join(__dirname, "backend", "logs"));
      // await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "backend", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  console.log(colors.yellow(req.headers.referer));
  logEvents(`${req.method}\t${req.url}\t${req.headers.referer}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

export { logEvents, logger };
