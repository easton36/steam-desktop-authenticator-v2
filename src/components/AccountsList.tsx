import { connect } from "react-redux";
import React, { useState, useMemo, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const AccountsList = ({ accounts, selectedAccount, setSelectedAccount }: {
	accounts: {
		[steamId: string]: string
	},
	selectedAccount: string,
	setSelectedAccount: (steamId: string) => void
}) => {
	const [accountFilter, setAccountFilter] = useState('');

	const filteredAccounts = useMemo(() => {
		if (accountFilter.length > 0) {
			return Object.keys(accounts).filter((steamId: string) => {
				return accounts[steamId]?.toLowerCase().includes(accountFilter.toLowerCase());
			});
		} else {
			return Object.keys(accounts);
		}
	}, [accountFilter, accounts]);

	return (
		<>
		<div className="relative border border-white rounded-md p-2 flex-grow overflow-y-scroll">
			<RadioGroup value={selectedAccount} onChange={setSelectedAccount}>
				<div className="space-y-1">
					{filteredAccounts.map((steamId: string) => (
						<RadioGroup.Option key={steamId} value={steamId} className={({ active, checked }) => `${active ? 'ring-1 ring-white ring-opacity-60 ring-offset-1 ring-offset-violet-300' : ''}
							${checked ? 'bg-violet-500 bg-opacity-75 text-white' : 'bg-white'}
							relative flex cursor-pointer rounded-md px-3 py-2 shadow-md focus:outline-none`}
						>
							{({ active, checked }) => (
								<div className="flex flex-row w-full items-center justify-between">
									<div className="flex items-center">
										<div className="text-14">
											<RadioGroup.Label as="p" className={`font-medium ${checked ? 'text-white' : 'text-black' }`}>
												{accounts[steamId]}
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

const mapStateToProps = (state: any) => ({
	accounts: state.settings.steamIdToUsername,
	selectedAccount: state.settings.selectedAccount || ''
});

const mapDispatchToProps = (dispatch: any) => ({
	setSelectedAccount: (steamId: string) => dispatch({ type: 'SET_STEAM_SELECTED_ACCOUNT', steamId })
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsList);