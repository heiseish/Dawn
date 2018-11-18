import dotenv from 'dotenv'
dotenv.load()
import fs from 'fs'
import Mocha from 'mocha'
import path from 'path'
import Logger from '../src/main/logger'

// Instantiate a Mocha instance.
const mocha = new Mocha()

const externalApisTest = './test/externalApis/'
const serverTest = './test/main/'
const utilTest = './test/utils/'

// Add each .ts file to the mocha instance
Logger.info('Adding external api files to testing.')
fs.readdirSync(externalApisTest).filter((file) => {
	// Only keep the .ts files
	return file.substr(-3) === '.ts'
}).forEach((file) => {
	mocha.addFile(
		path.join(externalApisTest, file),
	)
})

Logger.info('Adding main server files to testing.')
fs.readdirSync(serverTest).filter((file) => {
	// Only keep the .ts files
	return file.substr(-3) === '.ts'
}).forEach((file) => {
	mocha.addFile(
		path.join(serverTest, file),
	)
})

Logger.info('Adding utils files to testing.')
fs.readdirSync(utilTest).filter((file) => {
	// Only keep the .ts files
	return file.substr(-3) === '.ts'
}).forEach((file) => {
	mocha.addFile(
		path.join(utilTest, file),
	)
})

// Run the tests.
mocha.run((failures) => {
	process.on('exit', () =>  {
		process.exit(failures) // exit with non-zero status if there were failures
	})
})
