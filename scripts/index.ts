import { defineConfig, parse, Logger } from "@terrazzo/parser";
import fs from "node:fs";

const resolverFile = new URL("../tokens/tokens.resolver.json", import.meta.url);

const config = defineConfig(
  {
    outDir: "./dist",
  },
  { cwd: new URL(import.meta.url) },
);

try {
  const parseResult = await parse(
    [
      {
        filename: resolverFile,
        src: fs.readFileSync(resolverFile, "utf-8"),
      },
    ],
    {
      config,
      logger: new Logger({ level: "debug" }),
    },
  );

  console.log("Parsing result:", Object.keys(parseResult));

  const lightPermutation = parseResult.resolver.apply({ "color-mode": "light" });

  console.log("light permutation", lightPermutation);
} catch (error) {
  console.error("Error occurred during parsing:", error);
}
