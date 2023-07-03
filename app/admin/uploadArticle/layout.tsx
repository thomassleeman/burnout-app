import { Suspense } from 'react';
import Loading from './loading';

export const metadata = {
  title: 'Upload Article',
  description: 'Compose an article to be uploaded for users to read',
};

export default function UploadArticleLayout({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
