pipeline {
    /* insert Declarative Pipeline here */
    agent any
    options {
        ansiColor('xterm')
    }
    //in case of linux
    tools {nodejs "Node19"}
    
    stages{
        stage('Deploying'){
            steps {
                echo "Deploying the app"
            }
        }
        stage('Testing'){
            steps {
                //in case of Win OS use "bat" instead "sh"
                sh "npm install"
                sh "npx mocha **/*.spec.js --reporter mochawesome"
            }
        }
        stage('Building'){
            steps {
                echo "Building the app"
            }
        }
    }

    post{
        always{
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'mochawesome-report', reportFiles: 'mochawesome.html', reportName: 'HTML Report', reportTitles: 'Report'])
        }
    }

}