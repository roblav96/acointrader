// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import chain from 'chain-sdk'



if (utils.isMaster()) {

	const client = new chain.Client()

	const keyPromise = client.mockHsm.keys.create()
	keyPromise().then(function(key) {
		const signer = new chain.HsmSigner()
		signer.addKey(key.xpub, client.mockHsm.signerConnection)
	}).catch(function(error) {
		utils.keys('error', error)
		console.error('error', errors.render(error))
	})

}




