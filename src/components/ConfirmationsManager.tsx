import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';

const ConfirmationsManager = () => {
	const accountName = "testAccount456";

	return (
		<div className="relative border border-white rounded-md p-2 pt-3 mt-2 flex flex-row items-center">
			<div className="absolute left-2 -top-2.5 text-white text-xs bg-gray-700 px-1">
				Account: {accountName}
			</div>

			<button
				className="w-full bg-violet-500 hover:bg-violet-400 text-md text-white px-5 py-2 rounded-md"
			>
				View Confirmations
			</button>
			
		</div>
	);
};

export default connect()(ConfirmationsManager);