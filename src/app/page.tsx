import ActionButton from "@/components/atoms/ActionButton";
import HeroSection from "@/components/molecules/HeroSection";

export default function Home() {
  return (
    <>
      <div className="h-[100svh] w-[100svw] flex flex-col items-center justify-around">
        <div className="flex flex-col items-center">
          <h1 className="text-[9rem] font-bold tracking-tighter w-fit text-rose-600">
            Flaminger
          </h1>
          <p className="mt-[-2rem] w-fit text-[4rem] font-thin font-sans">
            Your one stop shop for finding jobs!
          </p>
        </div>
        <ActionButton variant="big" isLoading={false}>Start Searching!</ActionButton>
      </div>
      <div className="flex flex-col gap-32 w-full justify-around items-center">
        <HeroSection imagePath="/hero/rejection.jpg">
          <h2 className="text-4xl font-bold tracking-wide leading-relaxed">
            Are you tired of being rejected without any reason?
          </h2>
          <p className="text-justify text-pretty">
            We know about the confusion of getting rejected
            without any reason, maybe it was injustice
            or maybe we didn&apos;t fit the job as well as we thought.
            We&apos;re here to help you overcome that problem,
            on our platform every job rejected job application
            must have a rejection reason that user can check
            on their profile.</p>
        </HeroSection>
        <HeroSection imagePath="/hero/company.jpg">
          <h2 className="text-4xl font-bold tracking-wide leading-relaxed">Do you want to know if the company accepts only a few people, or you just suck?</h2>
          <p className="text-justify text-pretty">
            Some companies only accept the absolute best on the market,
            while others aren&apos;t as strict about their hiring process.
            How do you know without spending hours of research on other
            non-reputable websites? Flaminger knows, as we possess
            the acceptance rate per each company that is shared with any
            user. You can find the percentage next to company name
            in each job offer posted. Isn&apos;t that amazing?
          </p>
        </HeroSection>
      </div>
    </>
  );
}
