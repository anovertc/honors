// CSV Export Setup
import { Parser } from 'json2csv';

// 🔁 Export students
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

// 🔁 Export mandatory_classes
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

// 🔁 Export electives
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


