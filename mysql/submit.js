import express from 'express';
import db from './db.js';
import { Parser } from 'json2csv';

const router = express.Router();

// 🔁 Survey submission route
router.post('/submit', async (req, res) => {
  const {
    year,
    priorExperience,
    careerInterests,
    mandatoryClasses,
    topClasses
  } = req.body;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [studentResult] = await connection.query(
      `INSERT INTO students (year, prior_experience, career_interest)
       VALUES (?, ?, ?)`,
      [parseInt(year), priorExperience, careerInterests.join(', ')]
    );
    const studentId = studentResult.insertId;

    for (const cls of mandatoryClasses) {
      await connection.query(
        `INSERT INTO mandatory_classes
         (student_id, class_code, rating, expectation, gpa, lecture_quality, support, career_relevance, coding_experience)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          studentId,
          cls.className.split(" ")[0],
          cls.rating,
          cls.expectation ?? null,
          cls.gpa ?? null,
          cls.lectureQuality ?? null,
          cls.support ?? null,
          cls.careerRelevance ?? null,
          cls.priorExperience ?? null
        ]
      );
    }

    for (let i = 0; i < topClasses.length; i++) {
      const cls = topClasses[i];
      await connection.query(
        `INSERT INTO electives (student_id, class_name, rank_order, rating, career_interest)
         VALUES (?, ?, ?, ?, ?)`,
        [
          studentId,
          cls.className,
          i + 1,
          cls.rating,
          careerInterests.join(', ')
        ]
      );
    }

    await connection.commit();
    res.status(200).json({ message: 'Survey submitted successfully.' });

  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'Database error.' });
  } finally {
    connection.release();
  }
});

// 🔁 Export students as CSV
router.get('/export/students', async (req, res) => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM students");
    const parser = new Parser();
    const csv = parser.parse(rows);
    res.header('Content-Type', 'text/csv');
    res.attachment('students.csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to export students');
  } finally {
    connection.release();
  }
});

// 🔁 Export mandatory_classes as CSV
router.get('/export/mandatory', async (req, res) => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM mandatory_classes");
    const parser = new Parser();
    const csv = parser.parse(rows);
    res.header('Content-Type', 'text/csv');
    res.attachment('mandatory_classes.csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to export mandatory classes');
  } finally {
    connection.release();
  }
});

// 🔁 Export electives as CSV
router.get('/export/electives', async (req, res) => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM electives");
    const parser = new Parser();
    const csv = parser.parse(rows);
    res.header('Content-Type', 'text/csv');
    res.attachment('electives.csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to export electives');
  } finally {
    connection.release();
  }
});

router.get('/test', (req, res) => res.send('✅ It works!'));


export default router;



