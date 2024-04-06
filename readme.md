# My Project

## Description
This is an app to consume information of seismological events from the USGS API.

## Installation
1. Clone the repository.
    To start back-end you need to have Ruby, Rails and SQlite3 installed.
    To start front-end you need to have Node.js >= 18.17.0 installed.
2. Go to back-end folder. 
3. Run `bundle i` to install all gems.
4. Run `rails db:create` to create the database.
5. Run `rails db:migrate` to create the tables.
6. Run `rake obtain_seismological_data:get_data` to get the data from the USGS API.
8. Go to front-end folder.
9. Run `npm i` to install all dependencies.

## Usage
To run the project, execute the following command:
```rails s``` in the back-end folder and ```npm run dev``` in the front-end folder.

