export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <title>Create Data</title>
        <body className="bg-img">
          {children}
        </body>
      </html>
    )
  }