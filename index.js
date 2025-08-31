const readline = require('readline');

const terminalInterface = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const map = {
	"'USER' => ": 0,
	"'HOME' => ": 0,
	"'FCGI_ROLE' => ": 0,
	"'QUERY_STRING' => ": 0,
	"'REQUEST_METHOD' => ": 0,
	"'CONTENT_TYPE' => ": 0,
	"'CONTENT_LENGTH' => ": 0,
	"'SCRIPT_FILENAME' => ": 0,
	"'SCRIPT_NAME' => ": 0,
	"'PATH_INFO' => ": 0,
	"'REQUEST_URI' => ": 0,
	"'DOCUMENT_URI' => ": 0,
	"'DOCUMENT_ROOT' => ": 0,
	"'SERVER_PROTOCOL' => ": 0,
	"'GATEWAY_INTERFACE' => ": 0,
	"'SERVER_SOFTWARE' => ": 0,
	"'REMOTE_ADDR' => ": 0,
	"'REMOTE_PORT' => ": 0,
	"'SERVER_ADDR' => ": 0,
	"'SERVER_PORT' => ": 0,
	"'SERVER_NAME' => ": 0,
	"'HTTPS' => ": 0,
	"'REDIRECT_STATUS' => ": 0,
	"'HTTP_HOST' => ": 0,
	"'HTTP_USER_AGENT' => ": 0,
	"'HTTP_ACCEPT' => ": 0,
	"'HTTP_ACCEPT_LANGUAGE' => ": 0,
	"'HTTP_ACCEPT_ENCODING' => ": 0,
	"'HTTP_CONNECTION' => ": 0,
	"'PHP_SELF' => ": 0,
	"'REQUEST_TIME' => ": 0,
	"'HTTP_SEC_FETCH_DEST' => ": 0,
	"'HTTP_SEC_FETCH_USER' => ": 0,
	"'HTTP_SEC_FETCH_MODE' => ": 0,
	"'HTTP_SEC_FETCH_SITE' => ": 0,
	"'HTTP_UPGRADE_INSECURE_REQUESTS' => ": 0,
	"'HTTP_SEC_CH_UA_PLATFORM' => ": 0,
	"'HTTP_SEC_CH_UA_MOBILE' => ": 0,
	"'HTTP_SEC_CH_UA' => ": 0,
	"'PATH_TRANSLATED' => ": 0,
	"'REQUEST_TIME_FLOAT' => ": 0,
};

let treatInput = input => {
	console.log(`You entered: ${input}`);
	terminalInterface.close();

	// get the index of the occurence inside of the input of each of the keys from map
	// Find the position of each key from map in the input string
	for (const key in map) {
		const search = key;
		map[key] = input.indexOf(search);
	}

	let output = 'array (\n';

	const indexList = [
		...Object.values(map),
		input.lastIndexOf(')'),
	];

	const indexMax = Math.max(...indexList) + 1;

	for (const key in map) {
		const currentKeyIndex = map[key];
		const currentValueIndex = currentKeyIndex + key.length;
		const nextKeyIndex = indexList.reduce((nextMin, nextIndex) => {
			if (nextIndex <= currentKeyIndex) return nextMin;

			return Math.min(nextMin, nextIndex);
		}, indexMax);

		// console.log({ key, currentKeyIndex, currentValueIndex, nextKeyIndex });

		output += `  ${key}${input.substring(currentValueIndex, nextKeyIndex)}\n`;
	}

	output += ')';

	console.log(output);
};

if (process.argv.length > 2) {
	// Use the command-line argument as input
	const input = process.argv.slice(2).join(' ');
	treatInput(input);
} else {
	// Fallback to interactive stdin input
	terminalInterface.question('paste the output of test.php: ', treatInput);
}
