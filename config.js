/**
 * Application config file
 */

module.exports = {
	env : 'dev', // Triggers inclusion of newrelic if env is not test
	authUser: 'NodeJWTD3v3lop', // username for basic auth
	authPass: 'g7v0flh6d4', // pass for basic auth
	baseUrl: 'http://ec2-18-222-205-77.us-east-2.compute.amazonaws.com:3000',
	mongodb: {
		connectionString: 'mongodb+srv://mongouser:mongouser@node-jwt-vayve.mongodb.net/test?retryWrites=true'
	}
};