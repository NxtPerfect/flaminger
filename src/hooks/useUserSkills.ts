import { HumanLanguage, Technology } from "@/app/lib/definitions";
import { useEffect, useState } from "react";

type Skills = {
  technologies: Technology[],
  humanLanguages: HumanLanguage[]
}

export function useUserSkills() {
  const [skills, setSkills] = useState<Skills>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getSkills = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/user/skills', {
          method: "GET",
          credentials: "include"
        });

        const data = await response.json();

        setSkills((prev) => ({
          ...prev,
          technologies: response.ok ? data.technologies : prev?.technologies,
          humanLanguages: response.ok ? data.humanLanguages : prev?.humanLanguages
        }));
      } catch (error) {
        setSkills((prev) => ({
          ...prev,
          technologies: [],
          humanLanguages: [],
          error: error
        }));
        setError('Failed to load skills.');
      } finally {
        setIsLoading(false);
      }
    }

    getSkills();
  }, [])

  return { skills, isLoading, error };
}
