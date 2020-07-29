BEGIN;

TRUNCATE 
poll_data_candidate,
poll_data_election, 
poll_data_election_candidate, 
poll_data_user,  
poll_data_vote 
RESTART IDENTITY CASCADE;

INSERT INTO poll_data_candidate ( candidate_name, party)
  VALUES
    ( 'Joe Biden', 'Democrat' ),
    ( 'Donald Trump', 'Republican' );


INSERT INTO poll_data_election
  ( election_name, date_end )
  VALUES
    ( 'Presidential Election 2020','11/3/2020' );
   
    INSERT INTO poll_data_election_candidate
  (  election_id, candidate_id )
  VALUES
    ( 1, 1),
    ( 1, 2);
    

INSERT INTO poll_data_user
  ( user_first_name, user_last_name, user_email, user_dob, user_password)
  VALUES
    ( 'Michael', 'Scott', 'something@email.com', '11/7/1959',  'password123'),
    ( 'John', 'Fargo', 'somethingelse@email.com', '01/7/1977',  'passwordabc'),
    ( 'Michelle', 'Long', 'somethingcool@email.com', '10/23/1987',  'password456'),
    ( 'Alice', 'Palo', 'something@email.com', '12/7/1968',  'password123'),
    ( 'Lucas', 'Lotus', 'somethingelse@email.com', '01/7/1948',  'passwordabc'),
    ( 'Nimo', 'James', 'somethingcool@email.com', '10/23/1992',  'password456');

    INSERT INTO poll_data_vote
  ( election_id, candidate_id, user_id )
  VALUES
    (  1, 1, 1 ),
    (  1, 2, 2 ),
    (  1, 1, 3 ),
    (  1, 2, 4 ),
    (  1, 1, 5 ),
    (  1, 1, 6 );

    COMMIT;
   
