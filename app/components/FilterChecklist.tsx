"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface FilterChecklistProps {
  title: string;
  name: string;
  items: string[];
  selected: string; 
  onSelect: (name: string, value: string) => void; 
  capitalize?: boolean;
}

const FilterChecklist = ({
  title,
  name,
  items,
  selected,
  onSelect,
  capitalize = false,
}: FilterChecklistProps) => {
  const router = useRouter();
  const handleCheckBoxChange = (item: string) => {
   
    const newValue = selected === item ? "" : item;
    onSelect(name, newValue);
    const params = new URLSearchParams(window.location.search);
    params.set(name,newValue);
    router.push(`/browse-jobs?${params.toString()}`)
  };

  return (
    <div className="pt-4 border-t border-neutral-800 space-y-3 first:pt-0 first:border-0">
      <label className="text-xs font-medium text-neutral-400">{title}</label>
      <div className="space-y-2">
        {items.map((item) => (
          <label
            key={item}
            className="flex items-center gap-2.5 text-xs text-neutral-300 hover:text-white cursor-pointer"
          >
            <input
              type="checkbox"
              name={name}
              value={item}
              checked={selected === item}
              onChange={() => handleCheckBoxChange(item)}
              className="rounded border-neutral-700 bg-[#18181c] text-indigo-600 focus:ring-0 cursor-pointer"
            />
            <span className={capitalize ? "capitalize" : ""}>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterChecklist;