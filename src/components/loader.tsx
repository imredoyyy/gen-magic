import Image from "next/image";

const Loader = ({ label }: { label: string }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-4">
      <div className="relative size-10 animate-spin">
        <Image src="/logo-colorful.svg" alt="logo" fill />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default Loader;
