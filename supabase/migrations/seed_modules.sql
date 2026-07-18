-- Seed the `study_modules` table with Wisconsin Life, Accident & Health exam blueprint topics

INSERT INTO study_modules (id, title, estimated_minutes, category, sequence_order) VALUES
  (gen_random_uuid(), 'Introduction to Insurance', 30, 'General Insurance', 1),
  (gen_random_uuid(), 'Insurance Regulation', 45, 'General Insurance', 2),
  (gen_random_uuid(), 'General Insurance Concepts', 40, 'General Insurance', 3),
  (gen_random_uuid(), 'Life Insurance Basics', 50, 'Life Insurance', 4),
  (gen_random_uuid(), 'Types of Life Insurance Policies', 60, 'Life Insurance', 5),
  (gen_random_uuid(), 'Life Insurance Policy Provisions, Options, and Riders', 70, 'Life Insurance', 6),
  (gen_random_uuid(), 'Annuities', 50, 'Life Insurance', 7),
  (gen_random_uuid(), 'Federal Tax Considerations for Life Insurance and Annuities', 40, 'Life Insurance', 8),
  (gen_random_uuid(), 'Qualified Plans', 35, 'Life Insurance', 9),
  (gen_random_uuid(), 'Health Insurance Basics', 50, 'Health Insurance', 10),
  (gen_random_uuid(), 'Individual Health Insurance Policy General Provisions', 45, 'Health Insurance', 11),
  (gen_random_uuid(), 'Disability Income and Related Insurance', 50, 'Health Insurance', 12),
  (gen_random_uuid(), 'Medical Plans', 60, 'Health Insurance', 13),
  (gen_random_uuid(), 'Group Health Insurance', 55, 'Health Insurance', 14),
  (gen_random_uuid(), 'Dental Insurance', 30, 'Health Insurance', 15),
  (gen_random_uuid(), 'Insurance for Senior Citizens and Special Needs Individuals', 50, 'Health Insurance', 16),
  (gen_random_uuid(), 'Federal Tax Considerations for Health Insurance', 40, 'Health Insurance', 17),
  (gen_random_uuid(), 'Wisconsin Laws and Regulations Pertinent to Life Insurance', 45, 'State-Specific', 18),
  (gen_random_uuid(), 'Wisconsin Laws and Regulations Pertinent to Health Insurance', 45, 'State-Specific', 19),
  (gen_random_uuid(), 'Ethics and the Insurance Producer', 30, 'General Insurance', 20);
