import ActionButton from "@/components/ActionButton";

export default function Home() {
  return (
    <>
      <span className="h-[100svh] w-[100svw] flex flex-col items-center justify-around">
        <span className="flex flex-col items-center">
          <h1 className="text-[9rem] font-bold tracking-tighter w-fit text-rose-600">Flaminger</h1>
          <span className="mt-[-2rem] w-fit text-[4rem] font-thin font-sans">Your one stop shop for finding jobs!</span>
        </span>
        <ActionButton variant="big" isLoading={false}>Start Searching!</ActionButton>
      </span>
      <h2>Are you tired of being rejected without any reason?</h2>
      <h2>Do you want to know if the company accepts only a few people, or you just suck?</h2>
      <h2>What if the recruiter had to give a reason for rejection?</h2>
    </>
  );
}
