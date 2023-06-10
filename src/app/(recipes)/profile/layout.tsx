export const metadata = {
  title: 'OnlyGoodRecipes',
  description: 'The website to add recipes created with nextjs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
