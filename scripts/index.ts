import { defineConfig, parse, Logger } from "@terrazzo/parser";
import fs from "node:fs";

//// NOTE
// Terrazzo doesn't seem to correctly use refrences of sets in modifiers
// example 
// in the tokens.resolver.json, the size-mode contexts reference "#/sets/common"
// but Terrazzo doesn't correctly resolve this reference, the source object isn't taken into account,
// resulting in token names : sources.0.duration.fast 

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

  const lightPermutation = parseResult.resolver.apply({ "color-mode": "light", "size-mode": "md" });

  console.log("light permutation", lightPermutation);
  console.log("Parsing completed successfully");
} catch (error) {
  console.error("Error occurred during parsing:", error);
}
