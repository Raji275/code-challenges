  

# Full-Stack REST API Application on AWS

## The Challenge

  

### First Part: Serverless Backend

Build a Serverless Framework REST API with AWS API Gateway which supports CRUD functionality (Create, Read, Update, Delete) *don't use service proxy integration directly to DynamoDB from API Gateway

  

Please use GitHub Actions CI/CD pipeline, AWS CodePipeline, or Serverless Pro CI/CD to handle deployments.

  

You can take screenshots of the CI/CD setup and include them in the README.

  

The CI/CD should trigger a deployment based on a git push to the master branch which goes through and deploys the backend Serverless Framework REST API and any other resources e.g. DynamoDB Table(s).

  

### Second Part: React Frontend

Build a frontend application in React that connects to the serverless backend application. The React application must use all 4 CRUD functionality.

  

The frontend should be visually appealing and utilizes modern web design. Please use widely practiced CSS library instead of using your own custom CSS

  

Application must follow responsive web design for at least 4 different device sizes.

  

Deployment of the React application is up to your choice. Please provide your entry point url of the react application when finished.

  

### Requirements

0. All application code must be written using Javascript. Typescript is acceptable as well. Backend application is written in Node.js and frontend application written in React

  

1. Backend AWS Infrastructure needs to be automated with IAC using [Serverless Framework](https://www.serverless.com)

  

2. The API Gateway REST API should store data in DynamoDB

  

3. There should be 4-5 lambdas that include the following CRUD functionality (Create, Read, Update, Delete) *don't use service proxy integration directly to DynamoDB from API Gateway

  

4. Build the CI/CD pipeline to support multi-stage deployments e.g. dev, prod

  

5. The template should be fully working and documented

  

6. A public GitHub repository must be shared with frequent commits

  

7. A video should be recorded (www.loom.com) of you talking over the application code, IAC, and any additional areas you want to highlight in your solution to demonstrate additional skills

  

Please spend only what you consider a reasonable amount of time for this.

  

## Optionally

  

Please feel free to include any of the following to show additional experience:

  

1. Make the project fit a specific business case, instead of a skeleton CRUD request/response.

2. AWS Lambda packaging

3. Organization of YAML files

4. Bash/other scripts to support deployment

5. Unit tests, integration tests, load testing, etc

6. Setup AWS Cognito as part of the backend task and use it for app signup/login. All pages accessible only to authorized users except signup/login


## GitHub Actions CI/CD pipeline
<img width="1875" height="951" alt="Screenshot 2025-10-04 205300" src="https://github.com/user-attachments/assets/520cb624-91ef-4b88-bf6e-0c9833c49ace" />

<img width="1883" height="943" alt="Screenshot 2025-10-04 205447" src="https://github.com/user-attachments/assets/f2c7e7dd-bc93-429b-a822-4dcc862bb0ea" />

<img width="1888" height="929" alt="Screenshot 2025-10-04 205653" src="https://github.com/user-attachments/assets/cfcc9324-ac4c-4915-86dc-b94641ea49d5" />

<img width="1883" height="934" alt="Screenshot 2025-10-04 205717" src="https://github.com/user-attachments/assets/9e0b2805-c388-4869-90a0-b14ab2c70fce" />


## AWS CodePipeline
<img width="1903" height="904" alt="Screenshot 2025-10-04 205949" src="https://github.com/user-attachments/assets/0a30ddca-2897-4228-87b1-a09dee6033de" />

<img width="1910" height="892" alt="Screenshot 2025-10-04 210010" src="https://github.com/user-attachments/assets/5f31c1d4-7834-4c58-96c6-76e1140c9300" />

<img width="1889" height="905" alt="Screenshot 2025-10-04 210052" src="https://github.com/user-attachments/assets/a9ff5712-d5ac-4bc5-86c2-d5ddccdd3815" />

<img width="1895" height="900" alt="Screenshot 2025-10-04 210147" src="https://github.com/user-attachments/assets/e63f1b59-7949-4283-8760-326976adf551" />

<img width="1903" height="905" alt="Screenshot 2025-10-04 210215" src="https://github.com/user-attachments/assets/eefb65cf-ca5d-427d-a248-6cc2d5d7b6de" />


## Frontend UI
<img width="1896" height="937" alt="Screenshot 2025-10-04 210253" src="https://github.com/user-attachments/assets/3c6aa4a6-bffc-4046-af82-5ddc6d4a4712" />



