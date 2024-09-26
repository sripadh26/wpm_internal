const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/', async (req, res) => {
    try {
      const jobs = await Job.find();
      res.render('jobs', { jobs });
    } catch (error) {
      console.error('Error retrieving jobs:', error);
      res.status(500).send('Error retrieving jobs');
    }
  });
// Get the form to add a new job
router.get('/add', (req, res) => {
    res.render('addJob'); // Render the form to add a job
});

// Post a new job
router.post('/', async (req, res) => {
    const { title, company, location, description, image } = req.body;

    try {
        const job = new Job({
            title,
            company,
            location,
            description,
            image: image || '/images/default.png' // Use placeholder if no image is provided
        });
        await job.save();
        res.redirect('/jobs'); // Redirect to the job listing page after adding a job
    } catch (error) {
        res.status(500).send('Error adding job');
    }
});

// Delete a job
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Job.findByIdAndDelete(id);
        res.redirect('/jobs'); // Redirect to the job listing page after deletion
    } catch (error) {
        res.status(500).send('Error deleting job');
    }
});

module.exports = router;