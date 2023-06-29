import SteamCommunity from 'steamcommunity';
import { LoginSession, EAuthTokenPlatformType } from 'steam-session';
import SteamTotp from 'steam-totp';
import { ConstructorOptions } from 'steam-session/dist/interfaces-external';

interface AccountProps {
	steamId: string,
	username: string,
	password: string | null,
	sharedSecret: string,
	identitySecret: string,
	refreshToken: string,
	proxy: {
		httpProxy: string | null,
		socksProxy: string | null
	}
};

const Account = ({
	steamId,
	username,
	password,
	sharedSecret,
	identitySecret,
	refreshToken,
	proxy: {
		httpProxy,
		socksProxy
	}
}: AccountProps) => {
	const community = new SteamCommunity();
	
	const steamSessionOpts: ConstructorOptions = {};
	if(httpProxy) steamSessionOpts['httpProxy'] = httpProxy;
	if(socksProxy) steamSessionOpts['socksProxy'] = socksProxy;

	// Steam session
	let session: LoginSession | null = null;	

	/**
	 * steam-session LoginSession event listener
	 */
	const initializeLoginSessionListeners = () => {
		if(!session) throw new Error('No login session');

		session.on('authenticated', _loginSessionAuthenticated);
	};

	/**
	 * Fetch Steam session web cookies
	 */
	const getWebCookies = () => session && session.getWebCookies();
	/**
	 * Fetch Steam refresh token
	 */
	const getRefreshToken = () => session && session.refreshToken;
	/**
	 * Fetch Steam access token
	 */
	const getAccessToken = () => session && session.accessToken;
	/**
	 * Get steam totp code
	 */
	const getSteamTotpCode = () => SteamTotp.generateAuthCode(sharedSecret);
	/**
	 * Get steam server time
	 */
	const getSteamServerTime = () => SteamTotp.time();

	/**
	 * Create a Steam login session
	 */
	const createLoginSession = async () => {
		session = new LoginSession(EAuthTokenPlatformType.MobileApp, steamSessionOpts);
		initializeLoginSessionListeners();

		// if we already have a refreshToken, we don't need to login again
		if(refreshToken){
			session.refreshToken = refreshToken;
			await session.refreshAccessToken();

			return true;
		}

		if(typeof password !== 'string') throw new Error('Password is not a string');
		// Start login session with credentials
		const credentialsAuth = await session.startWithCredentials({
			accountName: username,
			password
		});

		return credentialsAuth;
	};

	/**
	 * Submit Steam Guard code to login session
	 */
	const submitSteamGuardCode = async (code: string) => {
		if(!session) throw new Error('No login session');
		try{
			await session.submitSteamGuardCode(code);

			return true;
		} catch(err: any){
			const errorMessage = err.message;

			return errorMessage;
		}
	};

	/**
	 * Fetch Steam account trade confirmations
	 */
	const fetchConfirmations = () => new Promise((resolve, reject) => {
		const currentTime: number = Math.floor(Date.now() / 1000)
		const confirmationKey: string = SteamTotp.getConfirmationKey(identitySecret, currentTime, 'conf');
		community.getConfirmations(currentTime, confirmationKey, (err, confirmations) => {
			if(err) return reject(err);

			return resolve(confirmations);
		});
	});

	/**
	 * Accept a Steam trade confirmation
	 */
	const acceptConfirmation = (confirmationId: string) => new Promise((resolve, reject) => {
		community.acceptConfirmationForObject(identitySecret, confirmationId, (err) => {
			if(err) return reject(err);

			return resolve(true);
		});
	});

	/**
	 * Accept all Steam trade confirmations
	 */
	const acceptAllConfirmations = () => new Promise((resolve, reject) => {
		const currentTime: number = Math.floor(Date.now() / 1000)
		const confirmationKey: string = SteamTotp.getConfirmationKey(identitySecret, currentTime, 'conf');
		const allowKey: string = SteamTotp.getConfirmationKey(identitySecret, currentTime, 'allow');
		community.acceptAllConfirmations(currentTime, confirmationKey, allowKey, (err) => {
			if(err) return reject(err);

			return resolve(true);
		});
	});

	/**
	 * When LoginSession is authenticated
	 */
	const _loginSessionAuthenticated = () => {
		console.log(`[${steamId}] LoginSession authenticated`);

		// Set steamcommunity cookies
		const cookies = getWebCookies();
		if(cookies && Array.isArray(cookies) && cookies.length > 0){
			community.setCookies(cookies);
		}
	};

	return {
		createLoginSession,
		fetchConfirmations,
		submitSteamGuardCode,
		getWebCookies,
		getRefreshToken,
		getAccessToken,
		getSteamTotpCode,
		getSteamServerTime,
		acceptConfirmation,
		acceptAllConfirmations
	};
};

export default Account;