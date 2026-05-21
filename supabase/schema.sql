create table products (
id uuid primary key default gen_random_uuid(),
name text,
price numeric,
video_url text,
image_url text
);

create table orders (
id uuid primary key default gen_random_uuid(),
email text,
total numeric,
created_at timestamp default now()
);
