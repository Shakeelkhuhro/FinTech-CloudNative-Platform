# 💳 FinTech Cloud-Native Platform  

A **production-grade FinTech transaction platform** (digital wallet simulation) built to showcase **end-to-end DevOps engineering** across cloud, CI/CD, GitOps, Kubernetes, monitoring, security, and scalability.  

This project is designed as a **portfolio-quality system** to demonstrate how modern enterprises run **cloud-native applications with SRE & DevOps best practices**.

---

**Core Highlights:**
- **Microservices**: User, Transaction, History (Node.js/Go + React frontend)  
- **APIs & Gateway**: REST APIs with Nginx reverse proxy  
- **Databases**: MongoDB + Redis  
- **CI/CD**: GitHub Actions (build, test, containerize, deploy)  
- **GitOps**: Argo CD for Kubernetes-native delivery  
- **IaC**: Terraform (multi-cloud AWS/Azure), Ansible for config management  
- **Kubernetes**: EKS/AKS cluster with Helm charts, Canary/Blue-Green deploys  
- **Monitoring**: Prometheus, Grafana, Loki, Alertmanager  
- **Security**: HashiCorp Vault, TLS certs (cert-manager), OPA policies, Trivy scans  
- **Scalability**: HPA + Cluster Autoscaler, load testing with k6  

---

## 📂 Repository Structure
```

FinTech-CloudNative-Platform/
├── app/                  # Microservices (Node.js/Go + React)
├── infra/                # Terraform for multi-cloud infra
├── ansible/              # Ansible playbooks (config & setup)
├── k8s/                  # Helm charts + manifests
├── monitoring/           # Prometheus, Grafana, Alert rules
├── security/             # Vault, OPA policies, Trivy configs
├── .github/workflows/    # CI/CD pipelines
├── docs/                 # Architecture diagrams, runbooks
└── README.md

````

---

## ⚙️ Features
- ✅ Automated **CI/CD pipeline** with GitHub Actions  
- ✅ **GitOps** deployments with Argo CD  
- ✅ **Terraform + Ansible** for fully automated infra & config  
- ✅ **Observability stack**: Prometheus, Grafana, Loki  
- ✅ **Secrets & Security** with Vault, TLS, OPA policies, Trivy scans  
- ✅ **Scalability**: Kubernetes HPA, Cluster Autoscaler, Load tests  
- ✅ **SRE Practices**: SLIs, SLOs, Incident Runbooks  

---

## 📊 Monitoring Dashboards
- [Grafana Dashboards](docs/grafana.png)  
- [Prometheus Alerts](docs/prometheus.png)  

---

## 📜 Runbooks
- **Incident Handling** (DB failure, cluster crash, pod restarts) → see [docs/runbooks.md](docs/runbooks.md)  
- **Disaster Recovery**: Multi-region failover with Terraform + DNS routing  

---

## 🛠️ Tools & Tech
- **Cloud**: AWS (EKS), Azure (AKS), DigitalOcean (for demo)  
- **CI/CD**: GitHub Actions, Argo CD  
- **IaC**: Terraform, Ansible  
- **Containers**: Docker, Kubernetes, Helm  
- **Monitoring**: Prometheus, Grafana, Loki, Alertmanager  
- **Security**: Vault, OPA/Gatekeeper, Trivy, TLS  
- **Load Testing**: k6  

---

## 🌍 Live Demo
*Soon*
<!-- 🔗 [Deployed App Link](https://your-demo-link.com) --> 
<!-- 🔗 [Grafana Public Dashboard](https://your-grafana-link.com)   -->


---

## 📈 Roadmap
- [x] Local Dev with Docker Compose  
- [x] Infrastructure via Terraform + Ansible  
- [x] CI/CD with GitHub Actions  
- [x] GitOps with Argo CD  
- [x] Monitoring & Logging stack  
- [ ] Security enhancements (Vault + OPA)  
- [ ] Multi-cloud failover (AWS + Azure)  

---

### 🏗️ System Architecture
```mermaid
flowchart TB
    Dev[Developer] --> GitHubRepo[GitHub Repo]
    GitHubRepo --> Actions[GitHub Actions CI/CD]
    Actions --> GHCR[GitHub Container Registry]
    Actions --> ArgoCD[Argo CD GitOps]

    %% Multi-Cloud Infra
    subgraph AWS
        EKS[EKS Cluster]
        DB1[(MongoDB)]
        Cache1[(Redis)]
    end

    subgraph Azure
        AKS[AKS Cluster]
        DB2[(MongoDB)]
        Cache2[(Redis)]
    end

    %% Deployments
    ArgoCD --> EKS
    ArgoCD --> AKS

    %% Microservices inside K8s
    subgraph Services
        UserService[User Service]
        TxnService[Transaction Service]
        HistoryService[History Service]
        Frontend[React Frontend]
        Gateway[Nginx API Gateway]
    end

    EKS --> Services
    AKS --> Services
    Gateway --> UserService
    Gateway --> TxnService
    Gateway --> HistoryService
    Frontend --> Gateway

    %% Monitoring & Logging
    subgraph Observability
        Prom[Prometheus]
        Grafana[Grafana]
        Loki[Loki Logs]
        Alerts[Alertmanager]
    end
    EKS --> Prom
    AKS --> Prom
    Prom --> Grafana
    Prom --> Alerts
    Loki --> Grafana

    %% Security
    subgraph Security
        Vault[HashiCorp Vault]
        OPA[OPA/Gatekeeper]
        Trivy[Trivy Scans]
        Certs[Cert-Manager TLS]
    end
    Actions --> Trivy
    EKS --> Vault
    AKS --> Vault
    Services --> OPA
    Services --> Certs

    %% Users
    User[End User] --> Frontend
    Alerts --> Dev

````

### 🔄 CI/CD + GitOps Workflow

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant GH as GitHub Repo
    participant Actions as GitHub Actions
    participant GHCR as GitHub Container Registry
    participant Argo as Argo CD
    participant K8s as Kubernetes Cluster

    Dev->>GH: Push code
    GH->>Actions: Trigger CI/CD pipeline
    Actions->>Actions: Run tests, lint, build
    Actions->>GHCR: Push Docker image
    Actions->>GH: Update manifests (Helm/Manifests)
    GH->>Argo: GitOps sync triggered
    Argo->>K8s: Deploy updated workloads
    K8s->>Dev: Updated app live
```

---

## 👤 Author

**Shakeel Khuhro**

* DevOps Engineer | GitHub Campus Expert | Microsoft Learn Student Ambassador (Gold)
* [GitHub](https://github.com/Shakeelkhuhro) • [LinkedIn](https://linkedin.com/in/shakeelkhuhro)

---

✨ This project is a showcase of modern DevOps & SRE practices for cloud-native systems. It’s continuously evolving as part of my advanced DevOps learning journey.

````
