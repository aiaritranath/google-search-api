export const metadata = {
  title: 'Google Search API',
  description: 'Private JSON search API by @its_aritra_nath',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}