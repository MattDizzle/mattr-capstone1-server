  
CREATE TABLE poll_data_election (
  election_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  election_name TEXT NOT NULL,
  candidate1 INTEGER REFERENCES poll_data_candidate(candidate_id) ON DELETE CASCADE NOT NULL,
  candidate2 INTEGER REFERENCES poll_data_candidate(candidate_id) ON DELETE CASCADE NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  date_end DATE
);
