import { app } from "@/app.ts";
import publicHandler from "@/handlers/public.ts";
import notFoundHandler from "@/handlers/notFound.ts";
import exampleHandler from "@/handlers/example.ts";
import fooHandler from "@/handlers/foo.ts";
import "@/handlers/demo.ts";

app.use("/foo", fooHandler);
app.use("/example", exampleHandler);
app.use("/", publicHandler);
app.use("/", notFoundHandler);

app.serve();
