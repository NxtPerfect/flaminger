import { ContractType, Filter, JobType, WorkhourType } from "@/app/lib/definitions";
import { ChangeEvent, MouseEvent, useState } from "react";

export function useFiltering() {
  const defaultFilter: Filter = {
    title: "",
    companyName: "",
    minSalary: 0,
    maxSalary: 0,
    jobType: [],
    contractType: [],
    workhourType: [],
    city: "",
    technologies: [],
    humanLanguages: []
  }
  const [filter, setFilter] = useState<Filter>(defaultFilter);

  function handleTitle(event: ChangeEvent<HTMLInputElement>) {
    const title = event.currentTarget.value;
    if (title.length === 0) {
      setFilter((cur) => {
        return { ...cur, title: "" };
      });
      return;
    }
    setFilter((cur) => {
      return { ...cur, title: title };
    });
  }

  function handleCompanyName(event: ChangeEvent<HTMLInputElement>) {
    const companyName = event.currentTarget.value;
    if (companyName.length === 0) {
      setFilter((cur) => {
        return { ...cur, companyName: "" };
      });
      return;
    }
    setFilter((cur) => {
      return { ...cur, companyName: companyName };
    });
  }

  function handleMinSalary(event: ChangeEvent<HTMLInputElement>) {
    const minSalary = event.currentTarget.valueAsNumber ?? 0;
    setFilter((cur) => {
      return { ...cur, minSalary: minSalary };
    });
  }

  function handleMaxSalary(event: ChangeEvent<HTMLInputElement>) {
    const maxSalary = event.currentTarget.valueAsNumber ?? 0;
    setFilter((cur) => {
      return { ...cur, maxSalary: maxSalary };
    });
  }

  function handleJobType(jobType: JobType) {
    if (filter.jobType.includes(jobType)) {
      const newJobTypes = filter.jobType.filter((cur) => cur !== jobType)
      setFilter((cur) => {
        return { ...cur, jobType: newJobTypes };
      });
      return;
    }
    setFilter((cur) => {
      return { ...cur, jobType: [...cur.jobType, jobType] }
    });
  }

  function handleWorkhourType(workhourType: WorkhourType) {
    if (filter.workhourType.includes(workhourType)) {
      const newWorkhourTypes = filter.workhourType.filter((cur) => cur !== workhourType)
      setFilter((cur) => {
        return { ...cur, workhourType: newWorkhourTypes };
      });
      return;
    }
    setFilter((cur) => {
      return { ...cur, workhourType: [...cur.workhourType, workhourType] }
    });
  }

  function handleContractType(contractType: ContractType) {
    if (filter.contractType.includes(contractType)) {
      const newContractTypes = filter.contractType.filter((cur) => cur !== contractType)
      setFilter((cur) => {
        return { ...cur, contractType: newContractTypes };
      });
      return;
    }
    setFilter((cur) => {
      return { ...cur, contractType: [...cur.contractType, contractType] }
    });
  }

  function handleCity(city: string) {
    if (city.length === 0) {
      setFilter((cur) => {
        return { ...cur, city: "" };
      });
      return;
    }
    setFilter((cur) => {
      return { ...cur, city: city };
    });
  }

  function addTechnology() {
    if (filter.technologies.length > 20) return;
    setFilter((cur) => {
      return { ...cur, technologies: [...cur.technologies, { name: "", experience: 0 }] };
    }
    );
  }

  function removeTechnology(e: MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault();
    if (filter.technologies.length === 0) return;
    setFilter((cur) => {
      const newTech = cur.technologies.filter((_, techIndex) => techIndex !== index);
      return { ...cur, technologies: newTech };
    });
  }

  function handleTechnologyName(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    e.preventDefault();
    const taskName = e.currentTarget.value;
    setFilter((cur) => {
      cur.technologies[index].name = taskName;
      return { ...cur };
    })
  }

  function handleTechnologyExperience(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    e.preventDefault();
    const taskExperience = e.currentTarget.value;
    setFilter((cur) => {
      cur.technologies[index].experience = taskExperience;
      return { ...cur };
    })
  }

  return {
    handleTitle,
    handleCompanyName,
    handleMinSalary,
    handleMaxSalary,
    handleJobType,
    handleWorkhourType,
    handleContractType,
    handleCity,
    addTechnology,
    removeTechnology,
    handleTechnologyName,
    handleTechnologyExperience,
    filter
  }
}
