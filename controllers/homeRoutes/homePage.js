const { User, Project } = require('../../models');
const router = require('express').Router();
const withAuth = require('../../utils/auth')

router.get('/', withAuth, async (req,res) => {
    try {
        const projectData = await Project.findAll({
          include: [{
              model: User,
              attributes: ['name']
          }]  
        });
        const projects = projectData.map((project) => project.get({ plain: true }));
        res.render('homepage', {
            projects, 
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;