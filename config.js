/**
 * Application config file
 */

module.exports = {
	env : 'dev', // Triggers inclusion of newrelic if env is not test
	authUser: process.env.authUser, // username for basic auth
	authPass: process.env.authPass, // pass for basic auth
	jwt: {
		secret: process.env.secret
	}
	// baseUrl: 'http://ec2-18-222-205-77.us-east-2.compute.amazonaws.com:3000',
};