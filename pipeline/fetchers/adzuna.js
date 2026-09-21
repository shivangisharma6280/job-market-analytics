const BASE = 'https://api.adzuna.com/v1/api/jobs/in/search';

async function fetchPage(what, page) {
  const params = new URLSearchParams({
    app_id: process.env.ADZUNA_APP_ID,
    app_key: process.env.ADZUNA_APP_KEY,
    results_per_page: '20',
    what,
    'content-type': 'application/json',
  });
  const res = await fetch(`${BASE}/${page}?${params}`);
  if (!res.ok) throw new Error(`Adzuna returned ${res.status}`);
  const data = await res.json();
  return data.results;
}

function mapJob(job) {
  return {
    source: 'adzuna',
    sourceId: String(job.id),
    url: job.redirect_url,
    title: job.title,
    company: job.company?.display_name,
    location: { display: job.location?.display_name, country: 'IN', area: job.location?.area },
    employmentType: job.contract_type,
    salary: {
      min: job.salary_min,
      max: job.salary_max,
      currency: 'INR',
      period: 'year',
      isEstimate: job.salary_min ? String(job.salary_is_predicted) === '1' : undefined,
    },
    description: job.description,
    descriptionIsSnippet: true,
    postedAt: new Date(job.created),
    raw: job,
  };
}

module.exports = { fetchPage, mapJob };