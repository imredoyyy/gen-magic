import Header from "@/components/layout/header";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen w-full flex-col">{children}</main>
    </>
  );
};

export default LandingPageLayout;
