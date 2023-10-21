import { logEvents } from "./logger.js";

const errorHandler = (err, req, res, next) => {
  console.log(colors.cyanBright("errorHandler", err));
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.referer}`,
    "errLog.log"
  );
  console.log(colors.red(err.stack) || err);

  const status = res.statusCode ? res.statusCode : 500; // server error

  res.status(status);

  res.json({ message: err.message, isError: true });
};

export default errorHandler;
