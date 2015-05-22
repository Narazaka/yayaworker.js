fs = require 'fs'
coffee = require 'coffee-script'
SHIORI_NAME = process.argv[10]
SHIORI_WORKER_CLASS = process.argv[11]
SHIORI_CLASS = process.argv[12]
client = coffee.compile fs.readFileSync(process.argv[2], encoding: 'utf8').replace(/SHIORI_NAME/g, SHIORI_NAME).replace(/SHIORI_WORKER_CLASS/g, SHIORI_WORKER_CLASS)
server = coffee.compile fs.readFileSync(process.argv[3], encoding: 'utf8').replace(/SHIORI_CLASS/g, SHIORI_CLASS)
shiori = fs.readFileSync process.argv[4], encoding: 'utf8'
dep1 = fs.readFileSync process.argv[5], encoding: 'utf8'
dep2 = fs.readFileSync process.argv[6], encoding: 'utf8'
dep3 = fs.readFileSync process.argv[7], encoding: 'utf8'
dep4 = fs.readFileSync process.argv[8], encoding: 'utf8'
dep5 = fs.readFileSync process.argv[9], encoding: 'utf8'

worker_code = [shiori, dep1, dep2, dep3, dep4, dep5, server].join '\n'
code = 'var worker_code = "' +
	worker_code
	.replace(/\\/g, "\\\\")
	.replace(/"/g, "\\\"")
	.replace(/\r/g, "\\r")
	.replace(/\n/g, "\\n") +
	'";' + client
console.log code
