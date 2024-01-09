library(
        identifier: 'jenkins-shared@LEV-390-removing-trivy-vulnerabilities',
        retriever: modernSCM([$class       : 'GitSCMSource',
                              remote       : 'ssh://git@bitbucket.ipttools.info/lev/jenkins-shared.git',
                              credentialsId: 'git'])
)

pipelineNodeJSApp {
    dockerApplicationService = 'fro'
    dockerImage = 'lev-web-ui'
    zone = 'e'
    dev1k8sCluster = 'np-e-docker-env1'
}
