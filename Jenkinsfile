pipeline {
  agent {
    docker {
      image 'node'
    }

  }
  stages {
    stage('PreBuild') {
      steps {
        sh '''npm install -g typescript
npm install -g typings'''
      }
    }
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
  }
}