//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import restify from 'restify'
import errors from 'restify-errors'



export function render(error: IdkError, where = '') { // HttpError
	if (_.isString(error)) return clc.bold.redBright(error);
	if (!_.isError(error)) return JSON.stringify(error);

	let message = error.message
	let stack = error.stack
	if (stack && stack.indexOf(message) >= 0) stack = stack.replace(message, '');

	let desc = ''
	if (error.config) {
		desc = desc + '\nurl > ' + decodeURIComponent(error.config.url)
	}
	if (error.response && error.response.statusText) {
		desc = desc + '\nstatus > ' + error.response.statusText
	}
	if (desc) {
		desc = desc + '\n'
		message = 'message > ' + message
	}

	if (where) where = clc.underline.bold.redBright(where) + ' > ';
	return where + clc.bold.redBright(desc + message + '\n') + stack
}



export function generate(error: IdkError, where?: string): errors.HttpError {
	console.error('restify route error >', render(error, where))
	if (error instanceof errors.HttpError != true) {
		let status = 500
		if (Number.isFinite(error.statusCode)) status = error.statusCode;
		if (error.response && Number.isFinite(error.response.status)) status = error.response.status;
		if (error.response && error.response.data && Number.isFinite(error.response.data.statusCode)) status = error.response.data.statusCode;
		error = errors.makeErrFromCode(status, error)
	}
	return error
}

export function getStack(i = 2) {
	let stack = new Error().stack.toString()
	stack = stack.replace(/^([^\n]*?\n){2}((.|\n)*)$/gmi, '$2')
	stack = stack.split('\n')[i].trim()
	stack = stack.split('/').pop()
	return stack.substring(0, stack.length - 1)
}



export function isTimeoutError(error: Error) {
	if (error == null || !_.isString(error.message)) return false;
	let message = error.message.toLowerCase()
	return message.indexOf('timeout') >= 0 && message.indexOf('exceeded') >= 0
}



export * from 'restify-errors'



