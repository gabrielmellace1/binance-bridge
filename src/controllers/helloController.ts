import { Route, Get } from "tsoa";

@Route("hello")
export class HelloController {
  @Get()
  public async sayHello(): Promise<string> {
    return "Hello, tsoa!";
  }
}
