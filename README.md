# ONLINE JUDGE

Level 2, Term 2 Database Project by [Md Abrar Nafee Akhand](https://github.com/AN-Akhand) and [Mobaswirul Islam](https://github.com/ezmata-101)

- [Server Repository](https://github.com/AN-Akhand/oj-backend)
- [Client Repository](https://github.com/ezmata-101/Online-Judge)

#### Demonstration Video: https://youtu.be/B6EXOwsRX1U

#### Project Features:

- Any user can create contests, set problems.
- Users who are not the contest creator can participate in the contest.
- Users can also solve problems from previous contests.
- Blogs can be created as usual blogs or Contest Announcement or Problem tutorial.
- Users can participate and share their opinions on those blogs.

### Installation

###### Prerequisites: [Node Js](https://nodejs.org/en/download/) and [Oracle Database](https://www.oracle.com/database/technologies/oracle-database-software-downloads.html#19c)

##### Setting up Database

- Create an user c##oj with password oj

  ```shell
  create user c##oj identified by oj;
  grant dba to c##oj;
  ```

- Run sql commands from [OJ_DDL](https://github.com/AN-Akhand/oj-backend/blob/main/sqldumps/OJ_DDL.sql) to create tables, procedures and triggers.

- (Optional) To populate database run commands from [OJ_DATA](https://github.com/AN-Akhand/oj-backend/blob/main/sqldumps/OJ_DATA.sql). 

##### Setting up Server

- Clone the repository [oj-backend](https://github.com/AN-Akhand/oj-backend). Or download the [zip](https://github.com/AN-Akhand/oj-backend/archive/refs/heads/main.zip) and extract.

  ```shell
  git clone https://github.com/AN-Akhand/oj-backend
  ```

- Go to the repository directory and install *npm* packages.

  ```shell
  npm install
  ```

- Start the server.

  ```shell
  npm run devStart
  ```



##### Setting up front-end client

- Clone the repository [Online Judge](https://github.com/ezmata-101/Online-Judge). Or download the [zip](https://github.com/ezmata-101/Online-Judge/archive/refs/heads/master.zip) and extract.

  ```shell
  git clone https://github.com/ezmata-101/Online-Judge.git
  ```

- Go to the repository directory and install npm packages.

  ```shell
  npm install
  ```

- Start front-end react server

  ```shell
  npm run start
  ```



#### Contributors

- [Mohammad Abrar Nafee Akhand](https://github.com/AN-Akhand)

- [Mobaswirul Islam](https://github.com/ezmata-101)


#### Supervisor

- [Tahmid Hasan](https://cse.buet.ac.bd/faculty_list/detail/tahmid) ([Web Page](https://tahmid04.github.io/))
