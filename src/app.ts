import path from "path";
import express, { Application, Request, Response, NextFunction } from "express";
import swaggerUI from "swagger-ui-express";
import bodyParser from "body-parser";

import helmet from "helmet";
import { RegisterRoutes } from "./routes/routes";
import { AppDataSource } from "./db/data-source";


const app: Application = express();
const PORT = process.env.PORT || 8085;

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disables CSP
    dnsPrefetchControl: false, // Disables DNS prefetch control
    frameguard: false, // Disables clickjacking protection
    hidePoweredBy: false, // Won't hide X-Powered-By header
    hsts: false, // Disables Strict-Transport-Security
    ieNoOpen: false, // Disables X-Download-Options for IE8+
    noSniff: false, // Won't set X-Content-Type-Options
    permittedCrossDomainPolicies: false, // Disables Adobe hosts file
    referrerPolicy: false, // No referrer policy will be set
    xssFilter: false, // Disables XSS filter in browsers
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

AppDataSource.initialize()

// Static resources
app.use(express.static('public'));

// Swagger docs
app.use("/docs", swaggerUI.serve, async (_req: Request, res: Response) => {
    return res.send(
        swaggerUI.generateHTML(await import("../public/swagger.json"))
    );
});

RegisterRoutes(app);

// Other routes and middleware...
// ... (all your other routes, middlewares, and logic)

app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    // ... (rest of your server startup logic, if any)
});