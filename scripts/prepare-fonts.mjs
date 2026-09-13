import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { unzipSync } from "fflate";

// Obtain the owner's selected fonts from the foundry; never commit font binaries.
// See app/fonts/README.md for provenance and the owner's publishing decision.
const archiveUrl =
  "https://cdn.shopify.com/s/files/1/2642/6578/files/PP_Neue_Montreal_-_Free_for_Personal_Use_v3.0.zip?v=1777379510";
const archiveHash =
  "a3993ef72dce43aebb1d72b712f2126551c237099df011a15187a2ccdf8e0f10";
const root = "PP Neue Montreal - Free for Personal Use v3.0/";
const destination = new URL("../app/fonts/neue-montreal/", import.meta.url);
const files = [
  [
    "otf/PPNeueMontreal-Regular.otf",
    "PPNeueMontreal-Regular.otf",
    "69bcecee993d4564980d8e082d4f15a461fd1f7e8ebbc36e8533d9e95f0131f8",
  ],
  [
    "otf/PPNeueMontreal-Semibold.otf",
    "PPNeueMontreal-Semibold.otf",
    "437ad49efdf9812ec50df7440fab56f66f1c8311ce9f276c1473919b63a1050d",
  ],
  [
    "otf/PPNeueMontrealText-Book.otf",
    "PPNeueMontrealText-Book.otf",
    "68326174f523318abe1353e36539668b58016be78b7c89331f2f0b4a888c6a89",
  ],
  [
    "EULA-PangramPangram-FreeForPersonalUse-MAY2021.pdf",
    "EULA.pdf",
    "f2ef571bf670748a4a585e84e28ae9061ec88ddc1b5e84349fae772b3c8bdaa9",
  ],
];
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const cached = await Promise.all(
  files.map(async ([, name, expected]) => {
    try {
      return hash(await readFile(new URL(name, destination))) === expected;
    } catch (error) {
      if (error.code === "ENOENT") return false;
      throw error;
    }
  }),
);

if (cached.every(Boolean)) {
  console.info("Neue Montreal: verified local fonts.");
} else {
  const response = await fetch(archiveUrl, {
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`Font download failed: ${response.status}`);
  const archive = new Uint8Array(await response.arrayBuffer());
  if (hash(archive) !== archiveHash)
    throw new Error("Font archive changed. Review the official source first.");
  const selected = new Set(files.map(([source]) => root + source));
  const extracted = unzipSync(archive, {
    filter: (entry) => selected.has(entry.name),
  });
  // Verify the entire selection before writing only these fixed local paths.
  for (const [source, , expected] of files) {
    if (
      !extracted[root + source] ||
      hash(extracted[root + source]) !== expected
    )
      throw new Error(`Font integrity check failed: ${source}`);
  }
  await mkdir(destination, { recursive: true });
  for (const [source, name] of files)
    await writeFile(new URL(name, destination), extracted[root + source]);
  console.info("Neue Montreal: prepared three original fonts and license.");
}
