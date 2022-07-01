# BLOCKUSTOM
### Under development PoC of an application to optimise data balancing for a blockchain-based data sharing platform

<h2>INTRODUCTION</h2>
This repository contains the initial work we made for the aforementioned project.
The goal of this project is to develop a blockchain-based application allowing for data sharing between members of a network.
The architecture would consist of two parts : one on-chain running on Hyperledger Fabric, and one off-chain using the IPFS protocol.
The balance of data between those two elements would be the key to optimise metrics such as transactions per second (TPS), average transaction latency, etc.

<h3>1. Current state of the project</h3>
The current project contains a blockchain implementation of a file sharing. 
By starting with such an implementation, it allows us to have a better vision of how to structure the blockchain and its components (E.g. the blocks structure).
We took inspiration from <a href="https://github.com/ruchi26/Blockchain-based-Decentralized-File-Sharing-System-using-IPFS">a project</a> created by user ruchi26 to start from a working architecture.

<h3>2. Upcoming work</h3>
Based on the current implementation, we want to incrementially improve it by changing the core logic and adding our desired fonctionalities. 
This project being part of a research, the possibility of adding the said functionalities will depend on criteria such as time, the capacity of the team, etc.
They are listed as follows : 

<h4>2.1 Tweaking of the current implementation</h4>
Based on the research that will be done in the WP2 of our proposal, we will adapt the current implementation to support the selected technologies.
That also implies we will have to redo some of the configuration from the ground up.
This also includes the work on the consensus, the node communication model, etc.

<h4>2.3 Customisation of the blockchain</h4>
After the end of the previous point, we will have a testable blockchain model. We will then proceed to the creation of a data-balance model to optimise the metrics mentioned in introduction.
The final goal of the project, and that will go beyond the scope of our initial idea, is to use AI to automate this step.
Thus, the final tool would be able to predict the best balance to optimise the balancing of the data, which is one of the major innovations we want to implement.

<h4>2.4 Finalisation of the platform</h4>
At this point, we want to basically create the final platform with all its core components.
This ranges from a scaled network to simulate the production conditions, to the implementation of the data-balance model previously mentioned and the implementation of the IPFS part of the architecture.
The final standard communication, inspired by <a href="https://www.kavayahsolutions.com/kavayah-blog/enterprise-blockchain-using-ipfs-for-storage-with-hyperledger-fabric">this source</a>, would look like <a href="https://user-images.githubusercontent.com/101249719/176847813-ff4a426e-42f0-4012-bb1b-83519e3174ff.png">this one .</a>

<h4>2.5 Creation of the frontend</h4>
This is self-explanatory. As the product we want to create with our project is an application, we need to provide some sort of user interface for it.
We might do it either in React or in Python, and <a href="https://user-images.githubusercontent.com/101249719/176847585-d5cefaf6-d008-4b69-adf2-0b871b3248d7.png"> we made a mockup </a>to illustrate what we want in terms of final UI. 

<h3>3. Possible future work</h3>
As previously mentioned, our final goal would be for the application to be able to predict the best data balance between on and off-chain for our data sharing platform.
Therefore, implementing artificial intelligence would not only be solving this, but it would also add another massive contribution to our project.
This will highly depend on the state of the project when we are done with our initial research, but is something to keep in mind and that we want to do.
