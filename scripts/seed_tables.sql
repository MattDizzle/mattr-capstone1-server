-- TRUNCATE all tables to ensure that there are no
-- data in them so we start with a fresh set of data
TRUNCATE states, user, user_election, election RESTART IDENTITY CASCADE;

-- insert 4 elections
INSERT INTO election
  (election_name, start_date, end_date)
  VALUES
    ('Presidential Election 2020', '11/7/2019', '11/7/2020'),
    ('Ref.#1962 Oxygen Ban', '11/7/2019', '11/7/2020'),
    ('Ref.#778 Cereal Ban', '11/7/2019', '11/7/2020'),
    

-- insert 4 statess
INSERT INTO states
  (state_name)
  VALUES
    ('Alabama'),
    ('Arkansas'),
    ('California'),
    ('Colorodo');

-- insert some users
INSERT INTO user
  (user_name, phone, dob, email, county)
  VALUES
    ('Michael Scott', '5551454', '11/7/1959', 'something@email.com', 'kern'),
    ('Jaba Scott', '5552454', '11/7/1979', 'something@email.com', 'kern'),
     ('Luke Scott', '5551454', '11/7/1986', 'something@email.com', 'kern'),
    

-- Add countys to the statess
UPDATE states SET county = 7 WHERE id = 1;
UPDATE states SET county = 3 WHERE id = 2;
UPDATE states SET county = 6 WHERE id = 3;
UPDATE states SET county = 5 WHERE id = 4;

-- put users on elections
INSERT INTO user_election
  (emp_id, election_id, start_date, end_date)
  VALUES
    (7, 1, '3/4/2019', '6/1/2019'),
    (6, 2, '11/20/2019', '12/25/2019'),
    (5, 3, '4/6/2019', '4/12/2019'),
    (4, 4, '2/11/2019', '2/15/2019'),
    (3, 4, '2/25/2019', '3/15/2019'),
    (2, 4, '2/11/2019', '2/25/2019'),
    (1, 4, '2/15/2019', '4/12/2019');