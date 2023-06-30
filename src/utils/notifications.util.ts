import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';

export const notify = async (title: string | null, body: string) => {
	const permissionGranted = await isPermissionGranted();
	if(!permissionGranted) throw new Error('Notifications permission not granted');

	await sendNotification({
		title: title || 'Steam Desktop Authenticator v2',
		body
	});
};

export const requestNotificationsPermission = async () => {
	const permissionGranted = await isPermissionGranted();
	if(permissionGranted) return true;

	const permission = await requestPermission();

	return permission === 'granted';
};