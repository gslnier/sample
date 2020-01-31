import { HttpService } from "./http-service";

export class VoteService extends HttpService {
    async getRandomPicture () {
        const response = await this.get('random');
        return response;
    }

    async sendLike (questionId: string) {

        if (!questionId) {
            return
        }
        const response = await this.put(`like/${questionId}`, {});
        return response;
    }

    async sendDislike (questionId: string) {
        if (!questionId) {
            return
        }
        const response = await this.put(`dislike/${questionId}`, {});
        return response;
    }

    async getAllPicture (page: number = 1) {
        const response = await this.get(`list?page=${page}`);
        return response;
    }

}
