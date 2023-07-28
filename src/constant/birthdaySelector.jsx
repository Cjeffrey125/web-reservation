import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

const BirthdaySelector = ({ selectedDay, setSelectedDay, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }) => {
  const [open, setOpen] = useState(false);

  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const months = [
    { value: '', label: 'Month' },
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' },
  ];
  const years = Array.from({ length: 100 }, (_, index) => 2024 - index);

  return (
    <div className="w-72 font-medium ">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-transparent w-full p-2 flex items-center justify-between rounded  ${
          selectedDay || selectedMonth || selectedYear ? 'text-gray-700' : ''
        }`}
      >
        <div className="flex items-center space-x-2 ">
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="block appearance-none w-28 bg-transparent border border-gray-400 px-2 py-1 rounded-full focus:outline-none focus:border-black "
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none bg-transparent">
              <BiChevronDown size={20} />
            </div>
          </div>

          <div className="relative">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="block appearance-none w-28 bg-transparent border border-gray-400 px-2 py-1 rounded-full focus:outline-none focus:border-black"
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <BiChevronDown size={20} />
            </div>
          </div>

          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="block appearance-none w-28 bg-transparent border border-gray-400 px-2 py-1 rounded-full focus:outline-none focus:border-black"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none bg-transparent">
              <BiChevronDown size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdaySelector;
