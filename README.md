# Back

Backend documenation of ReserveNow! project.
This backend works on port 3000. To edit this configuration go into `back/bin/www` and modify the 'port' variable.

## DB configuration

The Sequelize ORM works with any of this databases dialects:
-PostgreSQL
-MySQL
-SQLite
-MSSQL

Start configuring the setting file for the ORM connections. Go into `back/bin/db_info.js` and write down your DB info
- 'host': 'host of the DB',
- 'username': 'user for the DB',
- 'password': 'pass for the DB',
- 'database': 'database name',
- 'dialect': 'postgresql, mysql, sqlite, mssql' -> depending on your DB dialect

## Testing connection

To test the DB connection, import the sequelize object from `back/bin/db_connection.js` and execute it.

## Modeling tables

The admin model is used to sign in into the dashboard
For this model is necessary to have a table called "admin" with this properties:
| Field          | Type               | Null   | Key       | Default | Extra                         |
| :----------- | :------             | :------| :-------  | :------    | :----------                |
| id               | int(11)            | No     | PRI       | NULL     | auto_increment        |
| user           | varchar(255)   | No     |             | NULL     |                                  |
| pass           | varchar(255)   | No     |             | NULL     |                                  |

To edit this model and the necessary properties, edit the file in `back/model/admin.js`, where is defined this model.



The reservation model is used to save all the reservations
For this model is necessary to have a table called "reservations" with this properties:
| Field                        | Type               | Null   | Key       | Default | Extra                          |
| :-----------               | :------             | :------| :-------  | :------    | :----------                  |
| ID                             | int(11)            | No     | PRI       | NULL     | auto_increment        |
| name                       | varchar(255)   | No     |             | NULL     |                                  |
| secondName           | varchar(255)   | No     |             | NULL     |                                  |
| numberPersons       | int(11)             | No     |             | NULL     |                                  |
| email                       | varchar(255)   | No     |             | NULL     |                                  |
| phone                      | varchar(255)   | No     |             | NULL     |                                  |
| date                         | varchar(300)   | No     |             | NULL     |                                  |
| time                         | varchar(300)   | No     |             | NULL     |                                  |
| specialRequest        | varchar(500)   | No     |             | NULL     |                                  |

To edit this model and the necessary properties, edit the file in `back/model/reservation.js`, where is defined this model.


## Routes

There are 2 routes for this API `/login ` and  `reservations`
The controllers for these routes can be found in `back/routes/..`

The login route receives two parameters by POST method, 'user' and 'pass'. 
It verifies if it is the same than the first register in the 'admin' table to give a JSON web token as an answer.

The reservation route work with 3 POST endpoints:
- 1.- '/' -> Save a reservation
- 2.- '/getReservations' -> Get all the reservations
- 3.- '/delete' -> Delete an specific reservation

# Front

This frontend works on port 4200.

## Components

ReserveNow! has 3 specific Angular components:
- login -> Login page to dashboard
- dashboard -> Backoffice tool to check all the reservations
- reservation -> Front page to make the reservation

Any of these components are able to be modified and used in an Angular project

## URL's API Petitions

All the url's petitions made in the componets has to be changed, to be pointed to your URL's backend. 

- login:
    -POST request. Line 33

- dashboard:
    -POST request. Line 32
    -POST request. Line 107

- reservation:
    -POST request. Line 170


## Further help

Any issue, bug or comment can be submitted in this repo