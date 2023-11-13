import { Fragment, useState } from "react";
import { Listbox, Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default async function Search() {
  const schools = [
    { name: "University of California, Los Angeles" },
    { name: "University of California, Berkeley" },
    { name: "University of California, Santa Cruz" },
    { name: "University of California, San Diego" },
    { name: "University of California, Davis" },
    { name: "University of California, Riverside" },
    { name: "University of California, Irvine" },
    { name: "University of California, Santa Barbara" },
    { name: "University of California, Merced" },
  ];

  const res = await fetch("http://localhost:3000/api/agreements");
  const agreements = await res.json();
  return (
    <div>
      {agreements.length}
      <ul>
        {agreements.map((agreement: any) => (
          <li>
            {agreement.label}
            <ul>
              {agreement.entries.map((entry: any) => (
                <li>
                  {entry.away} VS. {entry.home}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
