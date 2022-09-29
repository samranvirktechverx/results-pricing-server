export class Response {
    constructor(
        public status: number,
        public statusCode: number,
        public message: string,
        public data?: any,
        public totalResults?: number
    ) {}

    setMessage(message: string) {
        this.message = message;
    }

    getMessage() {
        return this.message;
    }

    setTotalResults(totalResults: number) {
        if(this.data.message.length > 0) {
            this.totalResults = totalResults;
        } else {
            this.totalResults = 0;
        }
    }

    setStatus(status: number) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    setData(data: any) {
        this.data = data;
    }

    getData() {
        return this.data;
    }

    setStatusCode(statusCode: number) {
        this.statusCode = statusCode;
    }

    getStatusCode() {
        return this.statusCode;
    }

}
