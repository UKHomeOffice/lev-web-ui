library(
        identifier: 'jenkins-shared@lev-177-removing-trivy-vulnerabilities',
        retriever: modernSCM([$class       : 'GitSCMSource',
                              remote       : 'ssh://git@bitbucket.ipttools.info/lev/jenkins-shared.git',
                              credentialsId: 'git'])
)

pipelineNodeJSApp {
    dockerApplicationService = 'fro'
    dockerImage = 'lev-web-ui'
    zone = 'i'
    dev1k8sCluster = 'np-i-docker-env1'
}
