// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'

import forge from 'node-forge'



export function sha256(input: string): string {
	let md = (forge.md as any).sha512.sha256.create()
	md.update(input)
	return md.digest().toHex()
}

export function randomBytes(size: number): string {
	return forge.util.bytesToHex(forge.random.getBytesSync(size))
}









