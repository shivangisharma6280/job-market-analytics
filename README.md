| Folder       | Purpose                           |
| ------------ | --------------------------------- |
| `pipeline/`  | Data processing/ETL pipelines     |
| `server/`    | Backend/API                       |
| `client/`    | Frontend                          |
| `notebooks/` | Jupyter notebooks for analysis/ML |
| `data/`      | Dataset files                     |
| `docs/`      | Project documentation             |


# Job Market Analytics

A live analytics platform that collects tech job postings every day
and shows which skills, roles and salaries are in demand.

## Goal
Help freshers and professionals understand the tech job market.

## Planned features
- Daily data pipeline (job APIs -> MongoDB)
- Dashboard with a job role filter
- No-Cap Detector (fake "fresher" jobs and reposts)
- Glow-Up Score (which skill to learn next)

## Tech stack
MongoDB Atlas, Express, React, Node.js, GitHub Actions

## Status
Day 1: repo and database set up.