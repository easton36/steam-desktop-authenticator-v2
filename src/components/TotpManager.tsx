import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import Tippy, { tippy } from '@tippyjs/react';

const TotpManager = () => {
	const totpCode = 'DQV3N'; // Replace with your actual TOTP code
	const initialSeconds = 30;
	const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
	
	useEffect(() => {
		const timer = setInterval(() => {
		  if (secondsRemaining > 0) {
			setSecondsRemaining((prevSeconds) => prevSeconds - 1);
		  } else {
			setSecondsRemaining(initialSeconds);
		  }
		}, 1000);
	
		return () => {
		  clearInterval(timer);
		};
	  }, [secondsRemaining]);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(totpCode);
		// You can also add some visual feedback to indicate the code was copied
	};

	const progressStyle = {
		width: secondsRemaining === 0 ? '100%' : `${(secondsRemaining / initialSeconds) * 100}%`,
		transition: secondsRemaining === 0 ? 'width 0.5s linear' : 'none',
	};

	// tippy copyButton will be triggered on click
	// tippy progressStyle will be triggered on hover
	useEffect(() => {
		tippy('#copyButton', {
			trigger: 'click',
			content: 'Copied!',
			duration: 500,
			theme: 'success'
		});
	}, []);

	return (
		<div className="relative border border-white rounded-md p-2 pt-3 mt-2 flex flex-row items-center">
			<div className="absolute left-2 -top-2.5 text-white text-xs bg-gray-700 px-1">
				Login Token
			</div>

			<div className="flex flex-col w-full">
				<div className="flex flex-row items-center">
					<input className="w-full border-0 bg-white px-3 py-2 rounded text-center text-22 h-10 font-medium" type="text" value={totpCode} readOnly />
					<button
						id="copyButton"
						className="ml-2 bg-violet-500 hover:bg-violet-400 duration-100 text-white px-5 py-2 rounded h-10"
						onClick={copyToClipboard}
					>
						Copy
					</button>
				</div>

				<Tippy theme="SDA" content={
					<p>{secondsRemaining} seconds remaining</p>
				}>
					<div id="progressBar" className="relative h-4 bg-gray-100 mt-2 rounded-md">
						<div className={`absolute top-0 left-0 h-full bg-green-500 rounded-l-md ${secondsRemaining === initialSeconds || secondsRemaining === 0 ? 'rounded-r-md' : ''}`} style={progressStyle} />
					</div>
				</Tippy>
			</div>
			
		</div>
	);
};

export default connect()(TotpManager);