import { Router, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const router = Router();

interface Submission {
  name: string;
  phone: string;
  email: string;
  link: string;
  time: string;
}

const dbPath = path.join(__dirname, '../db.json');

// Endpoint to handle form submission
router.post('/submit', (req: Request, res: Response) => {
  const newSubmission: Submission = req.body;

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading database');
      return;
    }

    const db = JSON.parse(data);
    db.submissions.push(newSubmission);

    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error saving submission');
        return;
      }

      res.status(200).send('Submission saved successfully');
    });
  });
});

// Endpoint to check server status
router.get('/ping', (req: Request, res: Response) => {
  res.status(200).send(true);
});
router.get('/count', (req: Request, res: Response) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading database:', err);
        res.status(500).send('Error reading database');
        return;
      }
  
      try {
        const db = JSON.parse(data);
        const count = db.submissions.length; // Assuming submissions is your array of entries
  
        res.status(200).json({ count });
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.status(500).send('Error parsing JSON');
      }
    });
  });

// Endpoint to read a specific submission by index
router.get('/read', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);

  if (isNaN(index) || index < 0) {
    res.status(400).send('Invalid index');
    return;
  }

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading database');
      return;
    }

    const db = JSON.parse(data);

    if (index >= db.submissions.length) {
      res.status(404).send('Index out of range');
      return;
    }

    const submission = db.submissions[index];
    res.status(200).json(submission);
  });
});

// Endpoint to delete a specific submission by index
router.delete('/delete', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);

  if (isNaN(index) || index < 0) {
    res.status(400).send('Invalid index');
    return;
  }

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading database');
      return;
    }

    const db = JSON.parse(data);

    if (index >= db.submissions.length) {
      res.status(404).send('Index out of range');
      return;
    }

    db.submissions.splice(index, 1);

    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error deleting submission');
        return;
      }

      res.status(200).send('Submission deleted successfully');
    });
  });
});

// Endpoint to update a specific submission by index
router.put('/update', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  const updatedSubmission: Submission = req.body;

  if (isNaN(index) || index < 0) {
    res.status(400).send('Invalid index');
    return;
  }

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading database');
      return;
    }

    const db = JSON.parse(data);

    if (index >= db.submissions.length) {
      res.status(404).send('Index out of range');
      return;
    }

    db.submissions[index] = updatedSubmission;

    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error updating submission');
        return;
      }

      res.status(200).send('Submission updated successfully');
    });
  });
});

export default router;
