CREATE TABLE poll_data_vote (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    election_id INTEGER REFERENCES poll_data_election(id) ON DELETE CASCADE NOT NULL,
    candidate_id INTEGER REFERENCES poll_data_candidate(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER REFERENCES poll_data_user(id) ON DELETE CASCADE NOT NULL
);