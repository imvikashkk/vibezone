export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
          <div className="relative w-screen h-screen overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/HomeImageFull.png')] bg-fixed"></div>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="absolute inset-0 backdrop-filter backdrop-blur-sm"></div>
            <div className="absolute w-screen h-screen overflow-auto py-8">{children}</div>
          </div>
  );
}
