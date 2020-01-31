import 'whatwg-fetch';

enum HttpMethods {
    GET = 'get',
    POST = 'post',
    PUT = 'put'
}

export abstract class HttpService {
    private baseUrl!: string;
    private readonly headers: Headers;
    private readonly requestOptions: RequestInit;

    constructor () {
        this.baseUrl = (process.env.NODE_ENV === 'production') ? '//sample-quizz-mongo.herokuapp.com/questions' : '//localhost:3000/questions' ;
        this.headers = new Headers();
        this.requestOptions = {
            headers: this.headers,
        };
        this.addHeader('Content-Type', 'application/json');
    }

    addHeader (name: string, value: string): HttpService {
        this.headers.set(name, value);
        return this;
    }


    async get <R> (resource: string, options: RequestInit = {}): Promise<R> {
        const requestOptions = this.mergeOptions(options);
        const response = await this.request(`${this.baseUrl}/${resource}`, {
            method: HttpMethods.GET,
            ...requestOptions,
        });

        return response.json();
    }

    async post <R> (resource: string, options: RequestInit = {}): Promise<R> {
        const { body } = options;
        const requestOptions = this.mergeOptions(options);
        const response = await this.request(`${this.baseUrl}/${resource}`, {
            method: HttpMethods.POST,
            body: body,
            ...requestOptions,
        });
        const responseBody = this.responseHasEmptyBody(response) ? '' : await response.json();
        this.afterRequest(responseBody);
        return responseBody;
    }

    async put <R> (resource: string, options: RequestInit): Promise<R> {
        const { body } = options;
        const requestOptions = this.mergeOptions(options);
        const response = await this.request(`${this.baseUrl}/${resource}`, {
            method: HttpMethods.PUT,
            body: body,
            ...requestOptions,
        });

        return response.json();
    }

    private mergeOptions (options: RequestInit): RequestInit {
        return Object.assign({}, this.requestOptions, options);
    }

    private async request (resource: string, options: RequestInit = {}): Promise<Response> {
        const response = await fetch(resource, options);
        if (!response) {
            throw new Error(String(new Response()));
        }
        if (!response.ok) {
            throw new Error(String(response));
        }
        return response;
    }

    private responseHasEmptyBody (response: Response): boolean {
        return response.status === 204;
    }

    /** Empty implementation as it's supposed to be overwritten in child classes */
    protected async afterRequest (response: any): Promise<any> {}
}
