import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const accounts = [
	{
		  name: 'testAccount123'
	},
	{
		name: 'testAccount456'
	},
	{
		name: 'testAccount789'
	},
	{
		name: 'testAccount321'
	},
	{
		name: 'testAccount654'
	},
	{
		name: 'testAccount987'
	}
];

const AccountsList = () => {
	const [selected, setSelected] = useState(accounts[1]);

	return (
		<div className="relative border border-white rounded-md p-2 flex-grow overflow-y-scroll scrollbar-none">
			<RadioGroup value={selected} onChange={setSelected}>
				<RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
				<div className="space-y-2">
					{accounts.map((account) => (
						<RadioGroup.Option key={account.name} value={account} className={({ active, checked }) => `${active ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-violet-300' : ''}
							${checked ? 'bg-violet-500 bg-opacity-75 text-white' : 'bg-white'}
							relative flex cursor-pointer rounded-md px-4 py-3 shadow-md focus:outline-none`}
							onClick={() => setSelected(account)}
						>
							{({ active, checked }) => (
								<div className="flex flex-row w-full items-center justify-between">
									<div className="flex items-center">
										<div className="text-sm">
											<RadioGroup.Label as="p" className={`font-medium ${ checked ? 'text-white' : 'text-black' }`}>
												{account.name}
											</RadioGroup.Label>
										</div>
									</div>
									{checked && (
										<div className="text-white h-5 w-5">
											<FontAwesomeIcon icon={faCircleCheck} className="w-full h-full" />
										</div>
									)}
								</div>
							)}
						</RadioGroup.Option>
					))}
				</div>
			</RadioGroup>
		</div>
	);
};

export default connect()(AccountsList);