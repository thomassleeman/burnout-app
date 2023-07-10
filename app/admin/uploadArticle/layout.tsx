import { ReactNode, Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Upload Article",
  description: "Compose an article to be uploaded for users to read",
};

interface UploadArticleLayoutProps {
  children: ReactNode;
}

export default function UploadArticleLayout({
  children,
}: UploadArticleLayoutProps) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
