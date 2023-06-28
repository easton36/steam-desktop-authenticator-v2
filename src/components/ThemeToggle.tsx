import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

const ThemeToggle = () => {
	const [darkMode, setDarkMode] = useState(true);

	return (
		<Switch checked={darkMode} onChange={setDarkMode} className={`${darkMode ? 'bg-violet-700' : 'bg-violet-300' }
			relative inline-flex h-[30px] w-[58px] shrink-0 cursor-pointer rounded-full border-2 border-transparent
			transition-colors duration-200 ease-in-out focus-visible:ring-opacity-75`}>
			<span className={`${darkMode ? 'translate-x-7' : 'translate-x-0' } pointer-events-none inline-block h-[26px]
				w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}>
				{darkMode ? (
					<MoonIcon className="h-[26px] text-gray-500" />
				) : (
					<SunIcon className="h-[26px] text-yellow-500" />
				)}
			</span>
		</Switch>
	)
};

export default ThemeToggle;