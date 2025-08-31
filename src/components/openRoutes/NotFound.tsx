import PrimaryButton from "../buttons/PrimaryButton";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <h2 className="md:text-5xl text-4xl font-semibold">Page not found</h2>
      <PrimaryButton link="/" title="Back to Home" />
    </div>
  );
};

export default NotFound;
