import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const originalAccounts = [
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
	const [accounts, setAccounts] = useState([
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
	]);
	const [selected, setSelected] = useState(accounts[1]);
	const [accountFilter, setAccountFilter] = useState('');

	useEffect(() => {
		if (accountFilter.length > 0) {
			setAccounts(originalAccounts.filter((account) => {
				return account.name.toLowerCase().includes(accountFilter.toLowerCase());
			}));
		} else {
			setAccounts(originalAccounts);
		}
	}, [accountFilter]);

	return (
		<>
		<div className="relative border border-white rounded-md p-2 flex-grow overflow-y-scroll">
			<RadioGroup value={selected} onChange={setSelected}>
				<RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
				<div className="space-y-1">
					{accounts.map((account) => (
						<RadioGroup.Option key={account.name} value={account} className={({ active, checked }) => `${active ? 'ring-1 ring-white ring-opacity-60 ring-offset-1 ring-offset-violet-300' : ''}
							${checked ? 'bg-violet-500 bg-opacity-75 text-white' : 'bg-white'}
							relative flex cursor-pointer rounded-md px-3 py-2 shadow-md focus:outline-none`}
							onClick={() => setSelected(account)}
						>
							{({ active, checked }) => (
								<div className="flex flex-row w-full items-center justify-between">
									<div className="flex items-center">
										<div className="text-14">
											<RadioGroup.Label as="p" className={`font-medium ${ checked ? 'text-white' : 'text-black' }`}>
												{account.name}
											</RadioGroup.Label>
										</div>
									</div>
									{checked && (
										<div className="text-white ">
											<FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4" />
										</div>
									)}
								</div>
							)}
						</RadioGroup.Option>
					))}
				</div>
			</RadioGroup>
		</div>

		<div className="flex flex-row items-center">
			<p className="text-sm text-white font-medium">Filter:</p>
			<input type="text" placeholder="Type an account name..." className="border border-white rounded-md text-sm ml-2 bg-gray-700 text-white px-2 py-1 flex-1" value={accountFilter} onChange={(e) => {
				setAccountFilter(e.target.value);
			}}/>
		</div>
		</>
	);
};

export default connect()(AccountsList);