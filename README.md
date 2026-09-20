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

# Data sources

## Adzuna
- Access: free key (app_id, app_key)
- Limits (from terms): 25/min, 250/day, 1000/week, 2500/month
- Permitted use: (copy the wording from the terms)
- Attribution: "Jobs by Adzuna" label with logo on displayed listings
- Gaps: description is a snippet; salary may be predicted
- Status: emailed Adzuna on <date> about portfolio use

## Himalayas
- Access: free, no key
- Coverage: remote jobs only
- Attribution: link back to job URL and credit Himalayas
- Rate limits: (from docs)

## Field mapping (fill in from your samples)
| Our field   | Adzuna              | Himalayas |
|-------------|---------------------|-----------|
| sourceId    | id                  |           |
| title       | title               |           |
| company     | company.display_name|           |
| location    | location.display_name|          |
| salaryMin   | salary_min          |           |
| salaryMax   | salary_max          |           |
| salaryIsEstimate | salary_is_predicted |     |
| description | description (snippet)|          |
| postedAt    | created             |           |
| url         | redirect_url        |           |