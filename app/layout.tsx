import Providers from "./Providers"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <title>Slot Tracker</title>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}