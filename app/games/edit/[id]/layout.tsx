export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <title>Edit Data</title>
        <body className="bg-img">
          {children}
        </body>
      </html>
    )
  }