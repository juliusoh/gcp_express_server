# GCP Node Express Server
Node.JS Express Server that is scheduled by a Cron Job to hit multiple API endpoints and push data to either Cloud SQL or BigQuery.

## Technologies Used
*Node.JS
*Node-Cron
*Sequelize
*MySQL 
*Google-Cloud 

## Getting Started

#### 1. Clone the repository and navigate to the directory
```shell
git clone https://github.com/juliusoh/gcp_express_server.git
cd gcp_express_server
```

#### 2. Install all dependencies 
```shell
npm install
```

#### 3. Make a .env file and customize its settings 
```shell
PORT=3001
SQL_DATABASE=
API_KEY=from COVID ACT NOW API (CREATE YOUR OWN)
SQL_PASSWORD=
SQL_USE = 
```

#### 4. Compile project
```shell
npm run watch
```

## Lessons Learned
* Building a full-stack data-science project
* Creating complex SQL queries create data studio visual dashboards
* Working with CloudSQL databases and migrating/seeding data into tables.
* Working with the Google Cloud Platform
