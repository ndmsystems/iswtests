import * as crypto from 'crypto'

let session_id: string | null = null;

async function get_request_payload(password: string, host: string): Promise<any> {
    try {
        const response = await fetch(`${host}/auth`);
        const cookie = response.headers.get('set-cookie');
        session_id = cookie?.split(';')[0] || '';

        const md5 = crypto.createHash('md5').update(`admin:${response.headers.get('x-ndm-realm')}:${password}`).digest('hex');
        const hashed_password = crypto.createHash('sha256').update(`${response.headers.get('x-ndm-challenge')}${md5}`).digest('hex');

        return { login: 'admin', password: hashed_password };
    } catch (error) {
        throw new Error(`getRequestPayload: HTTP request failed: ${error}`);
    }
}

export async function getCookie() {
    const payload = await get_request_payload('1234', process.env.HOST);

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Cookie': session_id || '',
    };

    const auth = await fetch(`${process.env.HOST}/auth`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    });

    if (auth.status !== 200) {
        throw new Error('Auth failed');
    } else {
      console.log('Successfully authenticated')

      return session_id
    }
}
