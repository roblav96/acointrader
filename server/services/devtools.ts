// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'



if (process.DEVELOPMENT) {

	if (process.MASTER) setInterval(process.stdout.write, 1000, (clc as any).erase.lineRight);
	const dtsgen = require('dts-gen')
	const clipboardy = require('clipboardy')
	process.dtsgen = function(name, value) {
		name = name.replace(/\W+/g, '').trim()
		let results = dtsgen.generateIdentifierDeclarationFile(name, value)
		clipboardy.write(results).then(function() {
			console.warn('/*████  DTS COPPIED > "' + clc.bold(name) + '"  ████*/')
		}).catch(function(error) {
			console.error('clipboardy.write > error', errors.render(error))
		})
	}
	process.clipboard = function(name, input) {
		clipboardy.write(input).then(function() {
			console.warn('/*████  "' + clc.bold(name) + '" > APPENDED TO CLIPBOARD  ████*/')
		}).catch(function(error) {
			console.error('clipboardy.write > error', errors.render(error))
		})
	}



	if (process.MASTER) {
		

		
	}



}





