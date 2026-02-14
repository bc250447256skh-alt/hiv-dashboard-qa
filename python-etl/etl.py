import pandas as pd
from sqlalchemy import create_engine

# Connect to PostgreSQL
engine = create_engine(
    "postgresql://postgres@localhost:5432/hiv_dashboard",
    connect_args={"password": "SuperGal@345!"}
)

# Load CSV dummy data
df = pd.read_csv("hiv_dummy.csv")
df['report_date'] = pd.to_datetime(df['report_date'])

# Calculate daily KPIs
kpi = df.groupby('report_date').agg({
    'tests': 'sum',
    'positive': 'sum'
}).reset_index()

kpi['positivity_rate'] = kpi['positive'] / kpi['tests']

# Write to PostgreSQL
kpi.to_sql('daily_kpi', engine, if_exists='replace', index=False)

print("ETL complete. Data written to daily_kpi table.")
