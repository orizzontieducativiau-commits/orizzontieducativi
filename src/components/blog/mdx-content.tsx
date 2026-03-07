import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";

interface MdxContentProps {
  source: string;
}

/** Custom components available inside MDX files */
const mdxComponents = {
  /** Section heading in Caveat (handwriting) font */
  SectionHeading: ({ children }: { children: ReactNode }) => (
    <h2 className="font-caveat text-3xl md:text-4xl">{children}</h2>
  ),
  /** Wraps Italian content (no special font — matches English body) */
  ItalianSection: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
};

export function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald-600 prose-a:underline-offset-2 hover:prose-a:text-emerald-700 prose-img:rounded-xl prose-table:text-sm prose-p:leading-relaxed prose-li:leading-relaxed">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
