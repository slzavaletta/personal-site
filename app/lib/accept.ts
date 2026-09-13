/** Require an explicit Markdown media type. Prefer HTML on a quality tie. */
export function prefersMarkdown(accept: string | null) {
  if (!accept) return false;
  const ranges = accept
    .toLowerCase()
    .split(",")
    .map((part) => {
      const [type, ...parameters] = part.trim().split(";");
      const parameter = parameters
        .map((value) => value.trim())
        .find((value) => value.startsWith("q="));
      const q = parameter ? Number(parameter.slice(2)) : 1;
      return {
        type: type.trim(),
        q: Number.isFinite(q) && q >= 0 && q <= 1 ? q : 0,
      };
    });
  const markdown =
    ranges.find((range) => range.type === "text/markdown")?.q ?? 0;
  const html =
    (
      ranges.find((range) => range.type === "text/html") ??
      ranges.find((range) => range.type === "text/*") ??
      ranges.find((range) => range.type === "*/*")
    )?.q ?? 0;
  return markdown > 0 && markdown > html;
}
