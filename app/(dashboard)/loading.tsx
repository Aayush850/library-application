import { Spinner } from "@/components/ui/spinner";
const LoadingPage = () => {
 return (
    <div className="h-full flex flex-col justify-center items-center">
      <Spinner className="w-8 h-8 text-primary" />
    </div>
  );
};

export default LoadingPage;
