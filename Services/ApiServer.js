class ApiServer {
    static baseServer = 'https://8eab-2402-4000-20c3-62c1-10cd-2431-80e-c3b9.ngrok-free.app';

    static call(endpoint, method = 'GET', body = null) {

        const url = `${this.baseServer}${endpoint}`;

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            ...(body && { body: JSON.stringify(body) }),
        };

        return fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error(`HTTP ${method} request failed:`, error);
                throw error;
            });
    }
}

export default ApiServer;
