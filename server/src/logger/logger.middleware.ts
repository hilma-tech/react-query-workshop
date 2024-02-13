import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as chalk from "chalk";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger("HTTP");

    use(request: Request, response: Response, next: NextFunction) {
        const { method, originalUrl } = request;

        const startTime = Date.now();

        response.on("finish", () => {
            const endTime = Date.now();

            const timeElapsed = endTime - startTime;
            const { statusCode } = response;

            const isError =
                statusCode.toString().startsWith("5") || statusCode.toString().startsWith("4");

            const methodAndUrl = chalk.green(`${method} {${originalUrl}}`);

            const status = chalk[isError ? "redBright" : "greenBright"](statusCode);

            const time = chalk.yellow(`+${timeElapsed}ms`);

            this.logger.log(`${methodAndUrl} ${status} ${time}`);
        });

        next();
    }
}
