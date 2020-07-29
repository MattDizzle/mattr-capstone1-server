CREATE TYPE party_affiliation AS ENUM (
  'Democrat',
  'Republican',
  'Independent',
  'Green',
  'Libertarian',
  'None'
);

ALTER TABLE poll_data_candidate
  ADD COLUMN
    party party_affiliation;