import { pool } from "../../index.js";

async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
      DROP TABLE IF EXISTS journal CASCADE;
    `);
    console.log("table dropped!");
    // Create journal table
    await pool.query(`
    CREATE TABLE journal (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        entry_type VARCHAR(4) CHECK (entry_type IN ('rant', 'brag')),
        post VARCHAR(560) NOT NULL,
        date DATE
        );
    `);

    // Seed the journal table
    await pool.query(`
    INSERT INTO journal (entry_type, post, date)
    VALUES
    ('rant','Today at the coding bootcamp, everything went haywire. Bugs, errors, and frustration ruled the day. My code felt like an unsolvable puzzle, and I''m drowning in imposter syndrome. Tomorrow''s gotta be better, right? 😓 #CodingBootcampBlues', '2023-10-18'),
    ('brag','Today at the coding bootcamp, I had a breakthrough! Finally fixed that stubborn bug, and my project came together beautifully. Feeling confident and inspired. 🚀 #CodingSuccess', '2023-10-19'),
    ('brag', 'As a mother in a coding bootcamp, I face daily challenges that test my resolve. I''m determined to learn, and my children inspire me to keep pushing forward. This journey is tough, but I''ll persevere. 💻👩‍💻 #CodingMomStruggles', '2023-10-20'),
    ('brag', 'Today, in my coding bootcamp, I had an unexpectedly good day! Despite my lack of experience, I tackled new concepts with ease. I solved a challenging problem, and the satisfaction was immense. It''s amazing how this journey is pushing me to grow. Excited for what''s ahead! 💻🚀 #CodingJourney', '2023-10-21'),
    ('rant', 'Today was a tough one at coding bootcamp. As a newbie, I felt lost in a sea of code. Errors seemed insurmountable, and my confidence hit rock bottom. Impostor syndrome loomed large, but I won''t give up. Tomorrow''s a new chance to learn and grow. 💻😔 #CodingStruggles', '2023-10-22'),
    ('rant', 'Dear Diary, I had a really frustrating day today and my group was a real pain in the arse. No one would listen to me. I hate it I hate it I hate it.', '2023-10-23'),
    ('rant', 'I wanted to quit the bootcamp today, it was sooo stressful. But then I ate some food and realised I was just hungry 🙂 Feeling better now', '2023-10-24'),
    ('brag', 'My group got stuck today but I was able to solve a problem we were stuck on for ages. Felt so good! Everyone was chanting my name. I feel INVINCIBLE! I CAN DO ANYTHING!', '2023-10-25'),
    ('brag', 'Dear Diary no one understands me like you. I''m so glad I have you to vent my feelings to. Ily BootRant', '2023-10-26');
    `);
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}
await resetDatabase();
