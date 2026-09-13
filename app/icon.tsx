import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const symbol = await readFile(
    join(process.cwd(), "app/brand/slz-symbol.png"),
  );

  return new ImageResponse(
    <img
      alt=""
      width={size.width}
      height={size.height}
      src={`data:image/png;base64,${symbol.toString("base64")}`}
    />,
    size,
  );
}
