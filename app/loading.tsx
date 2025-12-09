import { Spinner } from "@/components/ui/spinner";
const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="size-8 text-primary" />
    </div>
  );
};

export default LoadingPage;
