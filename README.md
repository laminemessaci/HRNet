# HRNet

![logo](frontend/public/wealthHealth.png)

## Presentation

HRnet is an application intended  for managing employees's Wealth Health.

### Prerequisite

**1 - Front-end :**

- [nodejs (**version 16.16.0**)](https://nodejs.org/en/)
- [npm (**version 8.9.0**)](https://www.npmjs.com/)
- [react (**version 18.2.0**)](https://en.reactjs.org/)
- [redux toolkit (**version 1.9.1**)](https://redux-toolkit.js.org/)
- [VSCODE](https://code.visualstudio.com/)
- [ant design (**version 5.1.7**)](https://ant.design/)
- [axios  (**version 1.3.4**)](https://axios-http.com/)
- [formik  (**version 2.2.9**)](https://formik.org/)
- [jwt-decode (**version 3.1.2**)](https://www.npmjs.com/package/jwt-decode)
- ...

**2 - backend :**

- [express (**version 4.18.1**)](https://expressjs.com/)
- [express-async-errors (**version 3.1.1**)](https://expressjs.com/)
- [express-rate-limit (**version 6.5.1**)](https://expressjs.com/)
- [jsonwebtoken (**version 8.5.1**)](https://jwt.io/)
- [mongoose (**version 6.5.0**)](https://mongoosejs.com/)
- [mongoose-sequence (**version 5.3.1**)](https://mongoosejs.com/)
- [bcrypt  (**version 5.0.1**)](https://www.npmjs.com/package/bcrypt)
- [bcryptjs  (**version 2.4.3**)](https://www.npmjs.com/package/bcryptjs)
- [cors (**version 2.8.5**)](https://www.npmjs.com/package/cors)
- [multer (**version 1.4.5-lts.1**)](https://www.npmjs.com/package/multer)
- ...

If you are working with several versions of NodeJS, we recommend you install nvm. This tool will allow you to easily manage your NodeJS versions.

## Installing the app

- Fork and clone the repository : `https://github.com/laminemessaci/HRNet`
- Open a new terminal
- Install the dependencies : `npm run install:frontend && npm install`

## Starting The App

- Install mongoose compass `https://www.mongodb.com/fr-fr/products/compass`
- Add `.env` fille in the root of this project, it contains variables:
  -- `NODE_ENV` = Your mode development
  -- `PORT`= Port
  -- `MONGO_URI`= Your URL BDD (Instruction tutorial here `https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/`)
  -- `ACCESS_TOKEN_SECRET`= Your secret
  -- `REFRESH_TOKEN_SECRET`=Your secret

- At the root of the project run `npm run dev`
  
## Users Roles

There are three types of users:
ADMIN, MANAGER and EMPLOYEE.

### Admin

- The ADMIN will have the total vision of the site (Add removal and update of the User as well as the employees).
- It can also assign roles to each and disable a user if desired.
- It can list all employees and users.

### Manager

- The MANAGER will have the management of the employees, he can see, delete and update the details of an employee.
- He can see just the employees created by him.
- He can also update his profile.

### Employee

-Employee will have access to his dashboard , and will have the possibility to update his profile (address, telephone number and email ..)
