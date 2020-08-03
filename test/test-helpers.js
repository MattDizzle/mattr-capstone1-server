
INSERT INTO poll_data_candidate (candidate_name)
VALUES
  ('Joe Biden'),
  ('Donald Trump'),
  ('Kim Kardashian'),
  ('Kanye West');


INSERT INTO poll_data_election
(election_name, candidate1, candidate2, date_end)
VALUES
  ('Presidential Election 2020', 1, 2, '11/3/2020'),
  ('Presidential Election 2024', 3, 4, '11/3/2024');

const seedusers = () => { 
    INSERT INTO poll_data_user
(user_email, user_password)
VALUES
  ('something111@email.com', 'password123'),
  ('somethingelse222@email.com', 'passwordabc'),
  ('somethingcool333@email.com', 'password456'),
  ('something444@email.com', 'password123'),
  ('somethingelse555@email.com', 'passwordabc'),
  ('somethingcool666@email.com', 'password456');}

  INSERT INTO poll_data_vote
( election_id, candidate_id, user_id )
VALUES
  (1, 1, 1),
  (1, 2, 2),
  (1, 1, 3),
  (1, 2, 4),
  (1, 1, 5),
  (1, 1, 6);

  COMMIT;
 
export 