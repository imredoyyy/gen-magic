import Container from "@/components/layout/container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container innerClassName="items-center">{children}</Container>;
}
