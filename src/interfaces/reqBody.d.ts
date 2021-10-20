import { Status } from '../types/status'

export interface ReqBodyPutCallback {
	status: Status,
	detail: string
}

export interface ReqBodyGetCallback {
	status: Status,
	detail: string,
	body: string
}