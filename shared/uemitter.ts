// 

import * as eyes from 'eyes'
import * as clc from 'cli-color'
import * as _ from 'lodash'

import * as ee3 from 'eventemitter3'



export class UEmitter<T> extends (ee3 as any) {
	static prefixed: string | boolean
	eventNames?(): Array<T>
	listeners?(event: T): Array<(...args: Array<any>) => void>
	listenerCount?(event: T): number
	emit?(event: T, ...args: Array<any>): boolean
	on?(event: T, fn: (...args: Array<any>) => void, context?: any): this
	addListener?(event: T, fn: (...args: Array<any>) => void, context?: any): this
	once?(event: T, fn: (...args: Array<any>) => void, context?: any): this
	removeListener?(event: T, fn?: (...args: Array<any>) => void, context?: any, once?: boolean): this
	off?(event: T, fn?: (...args: Array<any>) => void, context?: any, once?: boolean): this
	removeAllListeners?(event?: T): this
}




