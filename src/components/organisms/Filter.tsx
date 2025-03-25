import React, { ChangeEvent, useState } from 'react'
import ActionButton from '../atoms/ActionButton'
import TextInput from '../atoms/TextInput'

export default function Filter() {
  const [title, setTitle] = useState<string>("");

  function handleTitleInput(event: ChangeEvent<HTMLInputElement>) {
    const _name = event.currentTarget.value;
    setTitle((cur) => {
      console.log("Current", cur);
      return _name;
    });
  }

  function submitFilter() {
    const controller = new AbortController;
    const signal = controller.signal;
    fetch(`/api/offers/1/${title}/minsal/maxsal/remote/full/b2b/city`,
      {
        method: "GET",
        credentials: "include",
        signal
      })
      .then(async (res) => {
        const data = await res.json();
        console.log(res, data, data.offset, data.name);
      })
      .finally(() => controller.abort());
  }

  return (
    <div className={`flex flex-col w-1/6 gap-4 bg-neutral-900 p-4
text-black dark:text-white rounded-md`}>
      <TextInput
        name="title"
        placeholder="Webdeveloper"
        onChange={handleTitleInput} />
      <input name="company" placeholder="Microsoft" />
      <input name="minSalary" placeholder="$5,000" />
      <input name="maxSalary" placeholder="$50,000" />
      <input type="checkbox" name="remote" />
      <input type="checkbox" name="hybrid" />
      <input type="checkbox" name="stationary" />
      <input type="checkbox" name="part-time" />
      <input type="checkbox" name="full-time" />
      <input type="checkbox" name="internship" />
      <input type="checkbox" name="B2B" />
      <input type="checkbox" name="employmentContract" />
      <select name="city">
        <option value="NewJersey" >
          New Jersey
        </option>
        <option value="Berlin" >
          Berlin
        </option>
      </select>
      <ActionButton variant="alt" onClick={submitFilter}>
        Filter
      </ActionButton>
    </div>
  )
}

