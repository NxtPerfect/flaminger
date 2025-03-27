import { HumanLanguage, Technology } from "@/app/lib/definitions";
import { useEffect, useState } from "react";

type Skills = {
  technologies: Technology[],
  humanLanguages: HumanLanguage[]
}

export function useUserSkills() {
  const [skills, setSkills] = useState<Skills>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getSkills = async () => {
      const controller = new AbortController();
      const signal = controller.signal;
      try {
        const response = await fetch('/api/user/skills', {
          method: "GET",
          credentials: "include",
          signal
        });

        const data = await response.json();

        setSkills((prev) => ({
          ...prev,
          technologies: response.ok ? data.technologies : prev?.technologies,
          humanLanguages: response.ok ? data.humanLanguages : prev?.humanLanguages
        }));
        controller.abort();
      } catch (error) {
        setSkills((prev) => ({
          ...prev,
          technologies: [],
          humanLanguages: [],
          error: error
        }));
        setError('Failed to load skills.');
        controller.abort();
      } finally {
      }
    }

    getSkills();
  }, [])

  return {
    skills,
    error
  };
}
