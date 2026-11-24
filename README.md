# 🛒 ShopSphere — 3-Tier Docker Compose Deployment

A containerized 3-tier e-commerce application deployed using **Docker Compose**. ShopSphere demonstrates containerization, service communication, reverse proxy configuration, persistent storage, and multi-container orchestration.

## 🏗️ Architecture

```text
                    Client / Web Browser
                           |
                           | Port 8080
                           v
                +----------------------+
                |     Frontend         |
                |   Nginx Container    |
                |  HTML/CSS/JavaScript |
                +----------------------+
                           |
                           | Reverse Proxy (/api)
                           v
                +----------------------+
                |      Backend        |
                |   Flask REST API     |
                |     Port 5000       |
                +----------------------+
                           |
                           v
                +----------------------+
                |     MongoDB          |
                |     Port 27017       |
                +----------------------+
                           |
                           v
                +----------------------+
                |  Persistent Volume   |
                +----------------------+
```

## 🚀 Technology Stack

| Technology | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Frontend hosting & reverse proxy |
| HTML, CSS, JavaScript | Frontend |
| Python & Flask | Backend REST API |
| MongoDB | Database |
| Docker Network | Container communication |
| Docker Volume | Persistent database storage |

## 📦 Project Structure

```text
3-TIER/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── nginx/
│       └── default.conf
└── backend/
    ├── Dockerfile
    ├── app.py
    └── requirements.txt
```

## ⚙️ Application Services

### Frontend
- Hosted using Nginx.
- Serves HTML, CSS and JavaScript files.
- Reverse proxies API requests to the backend.
- Accessible on host port `8080`.

### Backend
- Flask-based REST API.
- Connects to MongoDB using an environment variable.
- Handles product retrieval, health checks and order submission.
- Exposed on port `5000`.

### Database
- MongoDB 8.
- Stores products and orders.
- Uses a named Docker volume for persistent storage.

## 🔗 Docker Networking

A custom Docker network named `shopsphere-net` allows the application services to communicate.

| Service | Network communication |
|---|---|
| Frontend | Communicates with backend through Nginx reverse proxy |
| Backend | Connects to MongoDB using `database:27017` |
| Database | Accessible internally on the Compose network |

## 💾 Persistent Storage

MongoDB data is stored using a named Docker volume:

```yaml
volumes:
  shopsphere_vol:
```

The volume is mounted inside MongoDB at:

```text
/data/db
```

This allows database data to persist when containers are recreated.

## 🐳 Deployment Using Docker Compose

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

### 2. Navigate to the project directory

```bash
cd 3-TIER
```

### 3. Build and start the services

```bash
docker compose up -d
```

### 4. Verify running containers

```bash
docker compose ps
```

### 5. View container logs

```bash
docker compose logs
```

Follow logs continuously:

```bash
docker compose logs -f
```

### 6. Access the application

```text
http://SERVER_IP:8080
```

If deployed locally:

```text
http://localhost:8080
```

## 🧪 Useful Docker Compose Commands

| Command | Description |
|---|---|
| `docker compose up -d` | Start services in detached mode |
| `docker compose down` | Stop and remove containers and network |
| `docker compose ps` | View service status |
| `docker compose logs` | View logs |
| `docker compose logs -f` | Follow live logs |
| `docker compose restart` | Restart services |
| `docker compose build` | Rebuild service images |
| `docker compose pull` | Pull service images |
| `docker compose exec database mongosh` | Access MongoDB shell |
| `docker volume ls` | List Docker volumes |
| `docker network ls` | List Docker networks |

## 📚 DevOps Concepts Practiced

- Building Docker images using Dockerfiles.
- Deploying multi-container applications.
- Docker Compose service orchestration.
- Container networking and service discovery.
- Nginx reverse proxy configuration.
- Environment variable configuration.
- MongoDB persistent storage using named volumes.
- Container lifecycle management.
- Application troubleshooting using Docker logs.
- Service dependency configuration.

## 🎯 Project Objective

The primary objective of this project is to gain practical experience in deploying and managing a multi-tier application using Docker and Docker Compose, focusing on container infrastructure, networking, persistent storage and service orchestration.

---

**Built as a hands-on Cloud & DevOps learning project.**

