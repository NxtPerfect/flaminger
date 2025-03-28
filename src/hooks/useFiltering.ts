import { Filter } from "@/app/lib/definitions";
import { ChangeEvent, useState } from "react";

export function useFiltering() {
  const defaultFilter: Filter = {
    title: "",
    companyName: "",
    minSalary: 0,
    maxSalary: 0,
    jobType: "",
    contractType: "",
    workhourType: "",
    city: ""
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

  return {
    handleTitle,
    handleCompanyName,
    handleMinSalary,
    handleMaxSalary,
    filter
  }
}
