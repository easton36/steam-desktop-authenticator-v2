import { decryptData } from '../src/utils/encryption.util';
import { describe, test, expect } from '@jest/globals';

describe('Encryption Compatibility', () => {
    const password = 'testPassword';
    const encryptedData = 'ZXGWHAkv3qI5+AHKWcWrCT8nEeso+dSEuqyYt+7GkqmdLkABNlyow0h8mhCn24eW0+eMGF8+Mkcu30YGjM/mjdigkE6o8vqfy6GbTiEP38qOeibtz0gf7pnc4aYIcvwyKUKjlO65K46ORHtQ9T2cT5U2aTLKZdrDhRS4BNiCmFaPf2hpTY+bHh/c2ZHEeea+mDl3JuI80UEG2+uVdTDYz09IUNG3aJhd/VY1gUEE+8R7IWlUhYrZX9T1Pk3nVY58QFjnG/kkXXaO8+Jd/G10ATvGiJOwO3jvyVcXdeErPrS3berANmVkNf2YX9pNRXvQTEosOqfMcEbZG5HKeQriUHUP9EgDZ/iQ4i5L/86sAlqGFXsbf0sqCu6Sdm6eKBHOB/9ULo+wELcHRfo2XMNtqSNnEissaJ+RCjfokJH8eI6Ognr9dr0IF9QSJiAQ/qI+MbSaXbwijAF/u1CTK3RlYI/wvMMP7GqY8XhPYoiFABPrCAwxVWptDtLeddZx7Wp8E6pcCmqErnnYE3+gVka2wqpwixPEyaIggyOndOnURax4HGSWwCJdlfr5lTAr7m6A1Y9se80qUw0Kblk1Za8E1b8oIsAgblBYz8AclGBtwsDzSYjXITYZniViildXnuQx6c4TnFtQZEoa4Oj/Ef+2GwqmTK0oDdVptdBi5iW4JuzQdteSR3vnDGKJeXcgVX21omA2w1Q6Who7CcViPyIdc5q7bg7xWXGahU4e8l3qtCc8eX9JLMMYNTGDl9LIWNCYp/WBtR/XhehCNvtPJYfeacoFDaYZLzf+sSAYoiYDfMgykzOYW0FhBmlVU43Hq4sL5A5hKgwKa05RcY3LbdmmLFBvCImyiHa37XORk8D1Yr1cUpFfLZT4HG/CfyN5zaMTbnEP9GkxYytiPCib2VCyTB8/EDyAmR3kFL2+lupzYVseWDH4vKQgOsDNYSeb4NYQ1v4QBIAjJwhdmrK6lcOnSZcV+H2FT1n5IixcIeN2Qjcq6Bp77KRUNyQdWcxdGuxc5Lm8A5WNSqlb2Ku4nMf67zm9yAwqRiIy43IegX2y5qcujFL4HEmWM7NQmuv+tzqYLwa+EUZ/A5qxhP69IpPKSg==';
	const plaintext = '{"shared_secret":"AdRX8xaUZZ8Xkv3JEWSMPMTJPFE=","serial_number":"3030614811433139256","revocation_code":"R91098","uri":"otpauth://totp/Steam:arantrius?secret=AHKFP4YWSRSZ6F4S7XERCZEMHTCMSPCR&issuer=Steam","server_time":1580351886,"account_name":"arantrius","token_gid":"14b5c5a9e48b4c90","identity_secret":"KmS9Rno0Xh1H1LFuPJ+ZNWMJ+hg=","secret_1":"OQvOD/RHgaCR9K09Xrmz7gUFIFg=","status":1,"device_id":"android:4b558704-b8a7-e367-a1c2-27309bea5e93","fully_enrolled":true,"Session":{"SessionID":"67146e976de13da6a05702e3","SteamLogin":"76561199023082129%7C%7CCE395DF80D7EDAC8384901F8E1C67F2906C391A2","SteamLoginSecure":"76561199023082129%7C%7CD0BAB3587E06D0CECBD2A4811A453AEBCE527941","WebCookie":"40203C4CF3E1632CF2D6BA1535C9552B1B085E33","OAuthToken":"672c912c67d9c4d14fa58084da20ddbe","SteamID":76561199023082129}}';
	const iv = "6qab3k+R3TwsgRsqUawg1Q==";
	const salt = "9yvJ27dD+g4=";

    test('Should decrypt the data with existing iv and salt', () => {
        const decryptedData = decryptData(password, salt, iv, encryptedData);

        expect(decryptedData).toEqual(plaintext);
    });

    test('Should fail to decrypt with wrong password', () => {
        const wrongPassword = 'wrongPassword';

        const decryptedData = decryptData(wrongPassword, salt, iv, encryptedData);

        expect(decryptedData).not.toEqual(plaintext);
        expect(decryptedData).toBeNull();
    });
});