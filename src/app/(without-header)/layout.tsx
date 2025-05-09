// app/(without-header)/layout.js
export default function WithoutHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
