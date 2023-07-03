import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chatbot',
  description: 'Take a moment to reflect with our chatbot',
};

export default function SignupLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}

      {children}
    </section>
  );
}
