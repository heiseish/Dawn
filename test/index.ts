import dotenv from 'dotenv'
import fs from 'fs'
import Mocha from 'mocha'
import path from 'path'
import Logger from '../src/main/logger'

// Instantiate a Mocha instance.
const mocha = new Mocha()
dotenv.config()

type TestFile = {
	desc: string,
	dir: string
}
const testFiles:TestFile[] = [
	{
		desc: 'external api files',
		dir: './test/externalApis/'
	},
	{
		desc: 'main files',
		dir: './test/main/'
	},
	{
		desc: 'utility files',
		dir: './test/utils/'
	},
	{
		desc: 'model files',
		dir: './test/model/'
	}
]
for (let file of testFiles) {
	Logger.info(file.desc)
	let dir = file.dir
	fs.readdirSync(dir).filter((file) => {
		// Only keep the .ts files
		return file.substr(-3) === '.ts'
	}).forEach((file) => {
		mocha.addFile(
			path.join(dir, file),
		)
	})
}
// Run the tests.
mocha.run((failures) => {
	process.on('exit', () =>  {
		process.exit(failures) // exit with non-zero status if there were failures
	})
})
