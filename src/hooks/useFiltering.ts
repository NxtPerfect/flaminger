import { Filter } from "@/app/lib/definitions";
import { ChangeEvent, useState } from "react";

export function useFiltering() {
  const defaultFilter: Filter = {
    title: "any",
    companyName: "any",
    minSalary: 0,
    maxSalary: 999999,
    jobType: "any",
    contractType: "any",
    workhourType: "any",
    city: "any"
  }
  const [filter, setFilter] = useState<Filter>(defaultFilter);

  function handleTitle(event: ChangeEvent<HTMLInputElement>) {
    const title = event.currentTarget.value;
    if (title.length === 0) {
      setFilter((cur) => {
        return { ...cur, title: "any" };
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
        return { ...cur, companyName: "any" };
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
    const maxSalary = event.currentTarget.valueAsNumber ?? 999999;
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
