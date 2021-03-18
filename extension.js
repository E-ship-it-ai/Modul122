const vscode = require('vscode');

// The closevs function get's called upon closing Visual studio
function closevs() {
	//Establishing constants to Import Shell,the current Direcotry and the File system library
	const fileSystem = require('fs');
	const { exec } = require('child_process');
	const This_Directory  = vscode.workspace.workspaceFolders[0].uri.fsPath;
	
	// Looks if the currently worked on folder was opened in Visual studio code
	if(vscode.workspace.workspaceFolders !== undefined) {

		// Searches for a gitignore file in the directory
		if(fileSystem.existsSync(This_Directory + '/.gitignore')){

			// Checks the Status of the current GIT repository
			exec('git status', {cwd: This_Directory}, function(err, stdout, stderr) {
				// Version for future count of sucessfull pushes
				let version = 0;
				var datetime = new Date().toLocaleString();
				 version = version + 1;
				//Looks if the repro is up to date
				if(!stdout.includes('up to date')) {
				
				// Commits the repository and adds the current datetime as a message 
				exec('git commit -m "'+ datetime +'"', {cwd: This_Directory});
				//Pushes the changes to GIThub
				exec('git push', {cwd: This_Directory});

				}


			});		

		} 

	} 	

}

module.exports = {
	closevs
}