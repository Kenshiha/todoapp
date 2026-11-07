# TaskFlow – To-Do Application

A simple full-stack task management application built using Java and Spring Boot. TaskFlow allows users to create, manage, complete, and delete tasks through a web interface.

## Features

- Create and view tasks
- Mark tasks as completed or incomplete
- Delete tasks
- Track remaining tasks
- Persist tasks using PostgreSQL

## Tech Stack

- **Backend:** Java 21, Spring Boot, Spring Data JPA, Hibernate
- **Frontend:** HTML, CSS, JavaScript
- **Database:** PostgreSQL, Neon
- **Build Tool:** Maven
- **Deployment:** Render

## Live Demo

[Open TaskFlow](https://todoapp-e1d2.onrender.com/)

## Run Locally

**Prerequisites:** Java 21+, PostgreSQL, and Git.

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Configure your PostgreSQL database and set the `DB_PASSWORD` environment variable.

3. Run the application:

   ```bash
   .\mvnw.cmd spring-boot:run
   ```

4. Open `http://localhost:8080` in your browser.

## REST API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/{id}` | Get a task by ID |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |

## Future Improvements

- User authentication and registration
- Task deadlines and priorities
- Search and filtering
- Automated tests

---

**Built as a personal project to practise Java backend development and full-stack application development.**
