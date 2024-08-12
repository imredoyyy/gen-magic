import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

import { getApiLimitCount } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="relative h-full">
      <div className="hidden h-full bg-gray-700 md:fixed md:inset-y-0 md:flex md:w-[17rem] md:flex-col">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>
      <main className="md:pl-[17rem]">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
