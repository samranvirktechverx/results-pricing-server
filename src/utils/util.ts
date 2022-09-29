import { StatusCodes } from 'http-status-codes';
import { Response } from '@root/utils/response';

export class Util {
    static getOkayResponse(data: any, msg: string) {
        const response = new Response( StatusCodes.OK, data, msg );
        response.setData(data);
        response.setMessage(msg);
        //response.setStatus(Constant.SUCCESS);
        response.setStatusCode(StatusCodes.OK);
        return response;
    }
}
