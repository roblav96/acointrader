// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import restify from 'restify'
import errors from 'restify-errors'



export function restifyRoute<B = any, R = any>(route: (req: RestifyRequest<B>, res: RestifyResponse<R>, next: RestifyNext) => void) {
	return route
}

export function validate(body: any, keys: Array<string>): void {
	if (!body) throw new errors.PreconditionFailedError('Undefined request body');
	if (Object.keys(body).length == 0) throw new errors.PreconditionFailedError('Empty request body');
	keys.forEach(function(k) {
		if (body[k] == null) throw new errors.PreconditionFailedError(`Missing "${k}" field`);
	})
}


