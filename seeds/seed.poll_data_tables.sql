-- TRUNCATE all tables to ensure that there are no
-- data in them so we start with a fresh set of data
TRUNCATE user, election, vote, candidate RESTART IDENTITY CASCADE;

-- insert 4 elections
INSERT INTO election
  (election_name, candidate_id, start_date, end_date)
  VALUES
    ('Presidential Election 2020', 1, 2, '11/3/2019', '11/3/2020'),
    ('Ref.#1962 Oxygen Ban', '11/7/2019', '11/29/2020'),
    ('Ref.#778 Cereal Ban', '11/7/2019', '11/30/2020'),
    

-- insert some users
INSERT INTO user
  (user_first_name, user_last_name, user_phone, user_dob, user_email, user_password)
  VALUES
    ('Michael', 'Scott', 'something@email.com', '11/7/1959',  'password123'),
    ('John', 'Fargo', 'somethingelse@email.com', '01/7/1977',  'passwordabc'),
    ('Michelle', 'Long', 'somethingcool@email.com', '10/23/1987',  'passwordabc'),
    
    


